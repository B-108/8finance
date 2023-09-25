package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;

    public boolean deposit(String customerName, String phoneNumber, String accountNumber, double amount) {
        // 사용자 정보를 사용하여 계좌를 조회
        Optional<Account> optionalAccount = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNum(
                customerName, phoneNumber, accountNumber);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            int accountStatus = Integer.parseInt(String.valueOf(account.getAccountStatus())); // 문자열 '1'을 정수로 변환
            if (accountStatus != 1) {
                return false; // 입금 실패
            }
            // 입금 가능하면 계좌 잔액을 증가시키고 저장
            account.setAccountBalanceAmt(account.getAccountBalanceAmt().add(BigDecimal.valueOf(amount)));
            accountRepository.save(account);
            // 입금 이력을 생성 및 저장 (이 부분은 별도의 입금 이력 테이블과 연동하여 구현)
            return true; // 입금 성공
        }
        return false; // 입금 실패
    }

    public boolean withdraw(String customerName, String phoneNumber, String accountNumber, double amount) {
        // 사용자 정보를 사용하여 계좌를 조회
        Optional<Account> optionalAccount = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNum(
                customerName, phoneNumber, accountNumber);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            int accountStatus = Integer.parseInt(String.valueOf(account.getAccountStatus())); // 문자열 '1'을 정수로 변환
            if (accountStatus != 1) {
                return false; // 출금 실패
            }
            double currentBalance = account.getAccountBalanceAmt().doubleValue();
            if (currentBalance >= amount) {
                // 출금 가능하면 계좌 잔액을 감소시키고 저장
                account.setAccountBalanceAmt(account.getAccountBalanceAmt().subtract(BigDecimal.valueOf(amount)));
                accountRepository.save(account);
                // 출금 이력을 생성 및 저장 (이 부분은 별도의 출금 이력 테이블과 연동하여 구현)
                return true; // 출금 성공
            }
        }
        return false; // 출금 실패
    }

    public List<Account> getAccountList(String customerName, String phoneNumber) {
        // 사용자 정보를 사용하여 해당 고객의 모든 계좌 목록을 조회
        return accountRepository.findByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
    }
}
