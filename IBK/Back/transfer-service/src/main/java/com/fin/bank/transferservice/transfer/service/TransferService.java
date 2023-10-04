package com.fin.bank.transferservice.transfer.service;

import com.fin.bank.transferservice.transfer.dto.*;
import com.fin.bank.transferservice.transfer.entity.Transfer;
import com.fin.bank.transferservice.transfer.enums.TransactionType;
import com.fin.bank.transferservice.transfer.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final TransferRepository transferRepository;
    private final WebClient.Builder webClientBuilder;

    @Value ("${web-client.account-service}")
    private String accountUrl;

    // 입금 서비스 메서드
    public boolean deposit(TransferRequestDto transferRequestDto, HttpServletRequest request) {

        TransferDepositRequestDto transferDepositRequestDto = TransferDepositRequestDto.builder()
                .tranDpAcNum(transferRequestDto.getTranDpAcNum())
                .tranDpCellNo(transferRequestDto.getTranDpCellNo())
                .tranDpName(transferRequestDto.getTranDpName())
                .tranAmt(transferRequestDto.getTranAmt())
                .build();

        webClientBuilder
                .defaultHeader("Authorization", request.getHeader("Authorization"))
                .baseUrl(accountUrl)
                .build().post()
                .uri("/deposit")
                .body(BodyInserters.fromValue(transferDepositRequestDto))
                .retrieve()
                .bodyToMono(TransferDepositResponseDto.class)
                .switchIfEmpty(Mono.error(new RuntimeException("해당 계좌는 없는 계좌입니다.")))
                .subscribe(
                        reponseBody -> {
                            saveTransaction(
                                    reponseBody.getAccountId(),
                                    transferRequestDto.getTranAmt(),
                                    TransactionType.DEPOSIT,
                                    transferRequestDto.getTranDate(),
                                    transferRequestDto.getTranWdName(),
                                    transferRequestDto.getTranWdCellNo(),
                                    transferRequestDto.getTranWdBankCode(),
                                    transferRequestDto.getTranWdAcNum(),
                                    transferRequestDto.getTranDpName(),
                                    transferRequestDto.getTranDpCellNo(),
                                    transferRequestDto.getTranDpBankCode(),
                                    transferRequestDto.getTranDpAcNum()
                            );
                        },
                        error -> {
                            System.out.println("이체 실패" + error.getMessage());
                        }
                );

        return true; // 입금 성공
    }

    // 출금 서비스 메서드
    public boolean withdraw(TransferRequestDto transferRequestDto, HttpServletRequest request) {

        TransferWithdrawRequestDto transferWithdrawRequestDto = TransferWithdrawRequestDto.builder()
                .tranAmt(transferRequestDto.getTranAmt())
                .tranWdName(transferRequestDto.getTranWdName())
                .tranWdAcNum(transferRequestDto.getTranWdAcNum())
                .tranWdCellNo(transferRequestDto.getTranWdCellNo())
                .build();

        try {
            TransferDepositResponseDto responseBody = webClientBuilder
                    .defaultHeader("Authorization", request.getHeader("Authorization"))
                    .baseUrl(accountUrl)
                    .build().post()
                    .uri("/withdraw")
                    .body(BodyInserters.fromValue(transferWithdrawRequestDto))
                    .retrieve()
                    .bodyToMono(TransferDepositResponseDto.class)
                    .switchIfEmpty(Mono.error(new RuntimeException("해당 계좌는 없는 계좌입니다.")))
                    // block() method makes the call synchronous
                    // You can add timeout value as per your requirement.
                    // If no response is received within the specified timeout duration, an exception is thrown.
                    // Here I have set it to 10 seconds.
                    .block(Duration.ofSeconds(10));

            saveTransaction(
                    responseBody.getAccountId(),
                    transferRequestDto.getTranAmt(),
                    TransactionType.WITHDRAWAL,
                    transferRequestDto.getTranDate(),
                    transferRequestDto.getTranWdName(),
                    transferRequestDto.getTranWdCellNo(),
                    transferRequestDto.getTranWdBankCode(),
                    transferRequestDto.getTranWdAcNum(),
                    transferRequestDto.getTranDpName(),
                    transferRequestDto.getTranDpCellNo(),
                    transferRequestDto.getTranDpBankCode(),
                    transferRequestDto.getTranDpAcNum()
            );

            return true;  // 출금 성공

        } catch (Exception e) {
            System.out.println("이체 실패" + e.getMessage());
            return false;  // 출금 실패: 출금할 금액보다 잔액이 적음 또는 다른 오류 발생
        }
    }

    @Transactional
    public void saveTransaction(
            Long account,
            BigDecimal amount,
            TransactionType transactionType,
            LocalDateTime tranDate,
            String tranWdName,
            String tranWdCellNo,
            String tranWdBankCode,
            String tranWdAcNum,
            String tranDpName,
            String tranDpCellNo,
            String tranDpBankCode,
            String tranDpAcNum) {
        // Transaction 객체 생성 및 저장
        Transfer transaction = Transfer.builder()
                .tranDate(tranDate)
                .tranType(transactionType)
                .tranAmt(amount)
                .tranWdName(tranWdName)
                .tranWdCellNo(tranWdCellNo)
                .tranWdBankCode(tranWdBankCode)
                .tranWdAcNum(tranWdAcNum)
                .tranDpName(tranDpName)
                .tranDpCellNo(tranDpCellNo)
                .tranDpBankCode(tranDpBankCode)
                .tranDpAcNum(tranDpAcNum)
                .account(account)
                .build();
        transferRepository.save(transaction);
    }

    @Transactional
    public List<Transfer> getTransferList(TransferGetListRequestDto transferGetListRequestDto) {
        return transferRepository.findByTranTypeAndTranWdBankCodeAndTranDateBetween(
                transferGetListRequestDto.getTransactionType(),
                transferGetListRequestDto.getBankCode(),
                transferGetListRequestDto.getStartOfDay(),
                transferGetListRequestDto.getEndOfDay()
        );
    }
}

