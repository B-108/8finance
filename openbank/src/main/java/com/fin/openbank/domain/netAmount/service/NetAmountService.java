package com.fin.openbank.domain.netAmount.service;

import com.fin.openbank.domain.netAmount.entity.BankList;
import com.fin.openbank.domain.netAmount.entity.NetAmount;
import com.fin.openbank.domain.netAmount.enums.TransactionStatus;
import com.fin.openbank.domain.netAmount.repository.BankListRepository;
import com.fin.openbank.domain.netAmount.repository.NetAmountRepository;
import com.fin.openbank.domain.transfer.entity.Transaction;
import com.fin.openbank.domain.transfer.enums.TransactionType;
import com.fin.openbank.domain.transfer.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NetAmountService {

    private final TransactionRepository transactionRepository;
    private final BankListRepository bankListRepository;
    private final NetAmountRepository netAmountRepository;

    // 매일 자정에 실행되는 스케줄러
    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
    public void calculateNetAmountForAllBanks() {

        LocalDate currentDate = LocalDate.now();
        LocalDateTime startOfDay = LocalDateTime.of(currentDate, LocalTime.MIDNIGHT);
        LocalDateTime endOfDay = LocalDateTime.of(currentDate, LocalTime.MAX);

        // 각 은행들의 은행 코드를 가져온다.
        List<String> bankCodes = bankListRepository.findAll().stream()
                .map(BankList::getBankCode)
                .collect(Collectors.toList());

        // 모든 은행 코드에 대한 처리를 반복한다.
        for (String bankCode : bankCodes) {

            // 해당 은행의 withdraw(출금) 거래 기록을 가져온다.
            List<Transaction> withdrawalTransactions = transactionRepository.findByTranWdBankCodeAndTranDateBetween(
                    bankCode, startOfDay, endOfDay);

            // 해당 은행의 deposit(입금) 거래 기록을 가져온다.
            List<Transaction> depositTransactions = transactionRepository.findBytranDpBankCodeAndTranDateBetween(
                    bankCode, startOfDay, endOfDay);

            // 해당 은행의 입금 금액 합계를 계산한다.
            BigDecimal totalDeposit = calculateTotalDeposit(depositTransactions);

            // 해당 은행의 출금 금액 합계를 계산한다.
            BigDecimal totalWithdrawal = calculateTotalWithdrawal(withdrawalTransactions);

            // 최종 차액을 계산하고 상태를 업데이트한다.
            NetAmount netAmount = new NetAmount(totalDeposit, totalWithdrawal);

            // 차액 계산을 수행하고 결과를 얻습니다.
            TransactionResult result= calculateNetAmountValue(totalDeposit, totalWithdrawal);

            // 상태와 차액을 업데이트합니다.
            netAmount.updateNetAmoundAndStatus(result.getNetAmount(), result.getStatus());

            // 업데이트된 객체를 데이터베이스에 저장합니다.
            netAmountRepository.save(netAmount);
        }
    }

    // 거래 상태와 차액을 저장하기 위한 클래스
    public class TransactionResult {
        private TransactionStatus status;
        private BigDecimal netAmount;

        public TransactionResult(TransactionStatus status, BigDecimal netAmount) {
            this.status = status;
            this.netAmount = netAmount;
        }

        // 거래 상태를 반환합니다.
        public TransactionStatus getStatus() {
            return status;
        }

        // 차액을 반환합니다.
        public BigDecimal getNetAmount() {
            return netAmount;
        }
    }

    // 거래 상태에 따라 상태를 저장하고 차액을 결정하는 메서드
    private TransactionResult calculateNetAmountValue(BigDecimal totalDeposit, BigDecimal totalWithdrawal) {
        // 거래 상태를 저장할 변수입니다.
        TransactionStatus status;
        // 차액을 저장할 변수입니다.
        BigDecimal netAmount;

        // 입금이 출금보다 클 경우, 돈을 받아야하는 상태
        if (totalDeposit.compareTo(totalWithdrawal) > 0) {
            status = TransactionStatus.RECEIVE;
            netAmount = totalDeposit.subtract(totalWithdrawal);
        }
        // 출금이 입금보다 클 경우, 돈을 보내야하는 상태
        else if (totalDeposit.compareTo(totalWithdrawal) < 0) {
            status = TransactionStatus.SEND;
            netAmount = totalWithdrawal.subtract(totalDeposit);
        }
        // 입금과 출금이 동일한 경우, 돈 이동이 필요 없는 상태
        else {
            status = TransactionStatus.NONE;
            netAmount = BigDecimal.ZERO;
        }

        // 거래 상태와 차액을 반환합니다.
        return new TransactionResult(status, netAmount);
    }

    // 해당 은행의 deposit 거래 기록을 합산하는 메서드
    private BigDecimal calculateTotalDeposit(List<Transaction> depositTransactions) {
        return depositTransactions.stream()
                .map(Transaction::getTranAmt)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // 해당 은행의 withdrawal 거래 기록을 합산하는 메서드
    private BigDecimal calculateTotalWithdrawal(List<Transaction> withdrawalTransactions) {
        return withdrawalTransactions.stream()
                .map(Transaction::getTranAmt)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
