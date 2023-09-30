package com.fin.bank.kb.domain.netAmount.service;

import com.fin.bank.kb.domain.netAmount.enums.TransactionStatus;
import com.fin.bank.kb.domain.netAmount.repository.BankListRepository;
import com.fin.bank.kb.domain.transfer.entity.Transaction;
import com.fin.bank.kb.domain.transfer.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NetAmountService {

    private final TransactionRepository transactionRepository;
    private final BankListRepository bankListRepository;

    public void calculateNetAmountForAllBanks() {

        // 1. 은행 코드를 가져옵니다.
        List<String> bankCodes = bankListRepository.findDistinctBankCodes();

        // 2. 모든 은행 코드에 대한 처리를 반복합니다.
        for (String bankCode : bankCodes) {
            // 3. 해당 은행의 deposit 거래 기록을 가져옵니다.
            List<Transaction> depositTransactions = transactionRepository.findByTranTypeAndTranWdBankCode("DEPOSIT", bankCode);

            List<Transaction> withdrawalTransactions = transactionRepository.findByTranTypeAndTranWdBankCode("WITHDRAWAL", bankCode);

            // 4. 해당 은행의 입금 금액 합계를 계산합니다.
            BigDecimal totalDeposit = calculateTotalDeposit(depositTransactions);

            // 5. 해당 은행의 출금 금액 합계를 계산합니다.
            BigDecimal totalWithdrawal = transactionRepository.calculateTotalWithdrawal(bankCode);

            // 6. 입금 금액과 출금 금액의 차액을 계산합니다.
            BigDecimal netAmount = totalDeposit.subtract(totalWithdrawal);

            // 7. 거래 상태를 결정합니다.
            TransactionStatus status;
            if (netAmount.compareTo(BigDecimal.ZERO) > 0) {
                // 8. 차액이 양수인 경우, 돈을 받아야하는 상태입니다.
                status = TransactionStatus.RECEIVE;
            } else if (netAmount.compareTo(BigDecimal.ZERO) < 0) {
                // 9. 차액이 음수인 경우, 돈을 보내야하는 상태입니다.
                status = TransactionStatus.SEND;
            } else {
                // 10. 차액이 0인 경우, 아무 동작이 필요하지 않는 상태입니다.
                status = TransactionStatus.NONE;
            }

            // 11. 상태와 금액을 저장하거나 처리하는 로직을 추가해야 합니다.
            //     예를 들어, 데이터베이스에 상태를 저장하거나 필요한 처리를 수행합니다.
            //     이 부분은 실제로 필요한 비즈니스 로직에 따라 구현되어야 합니다.
        }
    }

    // 12. 해당 은행의 deposit 거래 기록을 합산하는 메서드
    private BigDecimal calculateTotalDeposit(List<Transaction> depositTransactions) {
        BigDecimal totalDeposit = BigDecimal.ZERO;
        for (Transaction transaction : depositTransactions) {
            totalDeposit = totalDeposit.add(transaction.getTranAmt());
        }
        return totalDeposit;
    }
}
