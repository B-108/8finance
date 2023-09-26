package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.entity.Transaction;
import com.fin.bank.kb.domain.account.enums.TransactionType;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.account.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    // 계좌 번호를 통해 계좌 정보 조회
    public Account getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    // 입금 서비스 메서드
    public boolean deposit(String customerName, String phoneNumber, String accountNumber, BigDecimal amount) {
        // 사용자 정보를 사용하여 계좌를 조회
        Optional<Account> optionalAccount = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                customerName, phoneNumber, accountNumber);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (isAccountBlocked(account)) {
                System.out.println("입금 실패: 계좌가 잠겨 있음");
                return false; // 입금 실패: 계좌가 잠겨 있음
            }

            // 입금 가능하면 계좌 잔액을 증가시키고 저장
            account.setAccountAddBalanceAmt(account.getAccountBalanceAmt().add(amount));
            accountRepository.save(account);

            // 입금 이력을 생성 및 저장
            saveTransaction(account, amount, TransactionType.DEPOSIT);
            return true; // 입금 성공
        }
        return false; // 입금 실패: 계좌를 찾을 수 없음
    }

    // 출금 서비스 메서드
    public boolean withdraw(String customerName, String phoneNumber, String accountNumber, BigDecimal amount) {
        // 사용자 정보를 사용하여 계좌를 조회
        Optional<Account> optionalAccount = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                customerName, phoneNumber, accountNumber);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (isAccountBlocked(account)) {
                return false; // 출금 실패: 계좌가 잠겨 있음
            }
            BigDecimal currentBalance = account.getAccountBalanceAmt();
            if (currentBalance != null && amount != null && currentBalance.compareTo(amount) >= 0) {
                // 출금 가능하면 계좌 잔액을 감소시키고 저장
                account.setAccountSubtractBalanceAmt(account.getAccountBalanceAmt().subtract(amount));
                accountRepository.save(account);

                // 출금 이력을 생성 및 저장
                saveTransaction(account, amount, TransactionType.WITHDRAWAL);
                return true; // 출금 성공
            }
        }
        return false; // 출금 실패: 출금할 금액보다 잔액이 적음
    }

    // 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
    public List<Account> getAccountList(String customerName, String phoneNumber) {
        System.out.println("여기까진 옴!");
        return accountRepository.findByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
    }

    // 계좌가 잠겨 있는지 확인하는 내부 메서드
    // 계좌 상태
    // 1: 활성, 2: 비활성, ...
    private boolean isAccountBlocked(Account account) {
        return account.getAccountStatus() == 2; // 계좌 상태 2가 비활성화
    }

    // 거래 내역을 저장하는 내부 메서드
    private void saveTransaction(Account account, BigDecimal amount, TransactionType transactionType) {
        Transaction transaction = Transaction.builder()
                .tranAmt(amount)
                .tranDate(LocalDateTime.now())
                .tranContent(transactionType.getValue())
                .tranType(transactionType)
                .counterparty("Bank")
                .counterpartyAccount("Bank Account")
                .account(account)
                .build();
        transactionRepository.save(transaction);
    }
}
