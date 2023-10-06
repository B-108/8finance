package com.fin.bank.netamountservice.netAmount.service;


import com.fin.bank.netamountservice.netAmount.dto.NetAmountTransactionReponseDto;
import com.fin.bank.netamountservice.netAmount.dto.NetAmountTransactionRequestDto;
import com.fin.bank.netamountservice.netAmount.entity.BankList;
import com.fin.bank.netamountservice.netAmount.entity.NetAmount;
import com.fin.bank.netamountservice.netAmount.enums.TransactionStatus;
import com.fin.bank.netamountservice.netAmount.enums.TransactionType;
import com.fin.bank.netamountservice.netAmount.repository.BankListRepository;
import com.fin.bank.netamountservice.netAmount.repository.NetAmountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NetAmountService {

    private final BankListRepository bankListRepository;
    private final NetAmountRepository netAmountRepository;
    private final WebClient.Builder webClientBuilder;

    //    @Scheduled(fixedDelay = 10000) // 10초마다 실행
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void calculateNetAmountForAllBanks() {

        LocalDate currentDate = LocalDate.now();
        LocalDateTime startOfDay = LocalDateTime.of(currentDate, LocalTime.MIDNIGHT);
        LocalDateTime endOfDay = LocalDateTime.of(currentDate, LocalTime.MAX);

        // 각 은행들의 은행 코드를 가져온다.
        List<String> bankCodes = bankListRepository.findAll().stream()
                .map(BankList::getBankCode)
                .collect(Collectors.toList());

        WebClient webClient = webClientBuilder
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .baseUrl("https://transfer-service/transfer")
                .build();

        // 모든 은행 코드에 대한 처리를 반복한다.
        for (String bankCode : bankCodes) {

            NetAmountTransactionRequestDto depositTransactionRequestDto = NetAmountTransactionRequestDto.builder()
                    .transactionType(TransactionType.DEPOSIT)
                    .bankCode(bankCode)
                    .endOfDay(endOfDay)
                    .startOfDay(startOfDay)
                    .build();

            // 동기 방식
            // 해당 은행의 deposit(입금) 거래 기록을 가져온다.
            List<NetAmountTransactionReponseDto> depositTransactions = webClient.post()
                    .uri("list")
                    .body(BodyInserters.fromValue(depositTransactionRequestDto))
                    .retrieve()
                    .bodyToFlux(NetAmountTransactionReponseDto.class)
                    .collectList() // Flux to Mono<List>
                    .block();

            NetAmountTransactionRequestDto withdrawalTransactionRequestDto = NetAmountTransactionRequestDto.builder()
                    .transactionType(TransactionType.WITHDRAWAL)
                    .bankCode(bankCode)
                    .endOfDay(endOfDay)
                    .startOfDay(startOfDay)
                    .build();

            // 동기 방식
            // 해당 은행의 withdraw(출금) 거래 기록을 가져온다.
            List<NetAmountTransactionReponseDto> withdrawalTransactions = webClient.post()
                    .uri("list")
                    .body(BodyInserters.fromValue(withdrawalTransactionRequestDto))
                    .retrieve()
                    .bodyToFlux(NetAmountTransactionReponseDto.class)
                    .collectList() // Flux to Mono<List>
                    .block();

            // 해당 은행의 입금 금액 합계를 계산한다.
            BigDecimal totalDeposit = calculateTotalDeposit(depositTransactions);

            // 해당 은행의 출금 금액 합계를 계산한다.
            BigDecimal totalWithdrawal = calculateTotalWithdrawal(withdrawalTransactions);

            // 최종 차액을 계산하고 상태를 업데이트한다.
            NetAmount netAmount = new NetAmount(totalDeposit, totalWithdrawal);

            TransactionResult result= calculateNetAmountValue(totalDeposit, totalWithdrawal);
            netAmount.updateNetAmoundAndStatus(result.getNetAmount(), result.getStatus());

            // Save the updated object to the database.
            netAmountRepository.save(netAmount);
        }
    }


    public class TransactionResult {
        private TransactionStatus status;
        private BigDecimal netAmount;

        public TransactionResult(TransactionStatus status, BigDecimal netAmount) {
            this.status = status;
            this.netAmount = netAmount;
        }

        // getters
        public TransactionStatus getStatus() {
            return status;
        }

        public BigDecimal getNetAmount() {
            return netAmount;
        }
    }



    // 거래 상태에 따라 상태를 저장하고 차액을 결정하는 메서드
    private TransactionResult calculateNetAmountValue(BigDecimal totalDeposit, BigDecimal totalWithdrawal){
        // 거래 상태를 결정한다.
        TransactionStatus status;
        BigDecimal netAmount;


        // 입금이 출금보다 클 경우, 돈을 받아야하는 상태이다.
        if (totalDeposit.compareTo(totalWithdrawal) > 0) {
            status = TransactionStatus.RECEIVE;
            netAmount = totalDeposit.subtract(totalWithdrawal);
        }
        // 출금이 입금보다 클 경우, 돈을 보내야하는 상태이다.
        else if (totalDeposit.compareTo(totalWithdrawal) < 0) {
            status = TransactionStatus.SEND;
            netAmount = totalWithdrawal.subtract(totalDeposit);
        }
        // 출금과 입금이 동일한 경우, 돈이 이동할 필요가 없는 상태이다.
        else {
            status = TransactionStatus.NONE;
            netAmount = BigDecimal.ZERO;
        }
        return new TransactionResult(status, netAmount);
    }

    // 해당 은행의 deposit 거래 기록을 합산하는 메서드
    private BigDecimal calculateTotalDeposit(List<NetAmountTransactionReponseDto> depositTransactions) {
        // 합산된 입금 금액을 저장하기 위한 BigDecimal 변수를 초기화합니다.
        BigDecimal totalDeposit = BigDecimal.ZERO;

        // depositTransactions 리스트에 있는 모든 거래 기록을 반복합니다.
        for (NetAmountTransactionReponseDto transaction : depositTransactions) {
            // 각 거래 기록의 입금 금액 (tranAmt)을 totalDeposit에 더합니다.
            totalDeposit = totalDeposit.add(transaction.getTranAmt());
        }

        // 모든 입금 금액을 합산한 결과를 반환합니다.
        return totalDeposit;
    }

    // 해당 은행의 withdrawal 거래 기록을 합산하는 메서드
    private BigDecimal calculateTotalWithdrawal(List<NetAmountTransactionReponseDto> withdrawalTransactions) {
        BigDecimal totalDeposit = BigDecimal.ZERO;
        for (NetAmountTransactionReponseDto transaction : withdrawalTransactions) {
            totalDeposit = totalDeposit.add(transaction.getTranAmt());
        }
        return totalDeposit;
    }
}