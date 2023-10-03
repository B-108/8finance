package com.fin.bank.transferservice.transfer.service;

import com.fin.bank.transferservice.transfer.dto.AccountRequestDto;
import com.fin.bank.transferservice.transfer.dto.AccountResponseDto;
import com.fin.bank.transferservice.transfer.dto.TransferGetListRequestDto;
import com.fin.bank.transferservice.transfer.dto.TransferRequestDto;
import com.fin.bank.transferservice.transfer.entity.Transfer;
import com.fin.bank.transferservice.transfer.enums.TransactionType;
import com.fin.bank.transferservice.transfer.repository.TransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TransferService {

    private final AccountRepository accountRepository;
    private final TransferRepository transferRepository;

    // 입금 서비스 메서드
    public boolean deposit(TransferRequestDto transferRequestDto, HttpServletRequest request) {
        System.out.println(transferRequestDto.getTranDpName() + " " + transferRequestDto.getTranDpCellNo() + " " + requestDto.getTranDpAcNum());

        ////////////////////////////////////////
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .defaultHeader("Authorization", request.getHeader("Authorization"))
                .build();

        AccountRequestDto accountRequestDto = AccountRequestDto.builder()
                .tranDpAcNum(transferRequestDto.getTranDpAcNum())
                .tranDpCellNo(transferRequestDto.getTranDpCellNo())
                .tranDpName(transferRequestDto.getTranDpName())
                .build();

        // HTTP POST 요청 보내기
        // 비동기 방식
//        Mono<AccountResponseDto> account = webClient.post()
//                .uri("https://j9b108.b.ssafy.io/ibk/account/")
//                .body(BodyInserters.fromValue(accountRequestDto))
//                .retrieve()
//                .bodyToMono(AccountResponseDto.class)
//                .switchIfEmpty(Mono.error(new RuntimeException("해당 계좌는 없는 계좌입니다.")));

        // 동기 방식
        AccountResponseDto account = webClient.post()
                .uri("https://j9b108.b.ssafy.io/ibk/account/")
                .body(BodyInserters.fromValue(accountRequestDto))
                .retrieve()
                .bodyToMono(AccountResponseDto.class)
                .switchIfEmpty(Mono.error(new RuntimeException("해당 계좌는 없는 계좌입니다.")))
                .block();



//                .subscribe(
//                        responseBody -> {
//                            Transaction t = Transaction.builder()
//                                    .tranAmt(dto.getTranAmt())
//                                    .contract(contract)
//                                    .tranDp(dto.getTranDp())
//                                    .tranDpAcNum(dto.getTranDpAcNum())
//                                    .tranDpBankCode(dto.getTranDpBankCode())
//                                    .tranWd(dto.getTranWd())
//                                    .tranWdAcNum(dto.getTranWdAcNum())
//                                    .tranWdBankCode(dto.getTranWdBankCode())
//                                    .tranDate(LocalDateTime.now())
//                                    .build();
//
//                            transactionRepository.save(t);
//                        },
//                        error -> {
//                            System.out.println("이체 실패" + error.getMessage());
//                        }
//                );
        //////////////////////////////////////////////


        if (isAccountBlocked(account)) {
            return false; // 입금 실패: 계좌가 잠겨 있음
        }
        // 입금 가능하면 계좌 잔액을 증가시키고 저장
        account.setAccountAddBalanceAmt(account.getAccountBalanceAmt().add(requestDto.getAmount()));
        accountRepository.save(account);

        // 입금 이력을 생성 및 저장
        saveTransaction(
                account.getAccountId(),
                transferRequestDto.getAmount(),
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
        return true; // 입금 성공
    }

    // 출금 서비스 메서드
    public boolean withdraw(TransferRequestDto requestDto) {
        // 사용자 정보를 사용하여 계좌 조회(유효성 검증)
        Optional<Account> optionalAccount = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                requestDto.getTranDpName(),
                requestDto.getTranDpCellNo(),
                requestDto.getTranDpAcNum());

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (isAccountBlocked(account)) {
                return false; // 출금 실패: 계좌가 잠겨 있음
            }
            BigDecimal currentBalance = account.getAccountBalanceAmt();
            if (currentBalance != null && requestDto.getAmount() != null && currentBalance.compareTo(requestDto.getAmount()) >= 0) {
                // 출금 가능하면 계좌 잔액을 감소시키고 저장
                account.setAccountSubtractBalanceAmt(account.getAccountBalanceAmt().subtract(requestDto.getAmount()));
                accountRepository.save(account);

                // 출금 이력을 생성 및 저장
                saveTransaction(
                        account,
                        requestDto.getAmount(),
                        TransactionType.WITHDRAWAL,
                        requestDto.getTranDate(),
                        requestDto.getTranWdName(),
                        requestDto.getTranWdCellNo(),
                        requestDto.getTranWdBankCode(),
                        requestDto.getTranWdAcNum(),
                        requestDto.getTranDpName(),
                        requestDto.getTranDpCellNo(),
                        requestDto.getTranDpBankCode(),
                        requestDto.getTranDpAcNum()
                );
                return true; // 출금 성공
            }
        }
        return false; // 출금 실패: 출금할 금액보다 잔액이 적음
    }

    // 계좌가 잠겨 있는지 확인하는 내부 메서드
    // 계좌 상태
    // 1: 활성, 2: 비활성, ...
    private boolean isAccountBlocked(AccountResponseDto account) {
        return account.getAccountStatus() == 2; // 계좌 상태 2가 비활성화
    }

    // 계좌 번호를 통해 계좌 정보 조회
    public Account getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    private void saveTransaction(
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

    public List<Transfer> getTransferList(TransferGetListRequestDto transferGetListRequestDto) {
        return transferRepository.findByTranTypeAndTranWdBankCodeAndTranDateBetween(
                transferGetListRequestDto.getTransactionType(),
                transferGetListRequestDto.getBankCode(),
                transferGetListRequestDto.getStartOfDay(),
                transferGetListRequestDto.getEndOfDay()
        );
    }
}

