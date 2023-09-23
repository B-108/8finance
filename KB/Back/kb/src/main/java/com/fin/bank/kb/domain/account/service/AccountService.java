package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.user.entity.User;
import com.fin.bank.kb.domain.user.repository.UserRepository;
import com.fin.bank.kb.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    // 고객의 입금 처리
    public boolean deposit(String customerName, String phoneNumber, String accountNumber, double amount) {
        // 고객 정보와 계좌 번호를 사용하여 고객 및 계좌를 조회
        Account account = accountRepository.findByAccountHolderAndPhoneNumberAndAccountNumber(customerName, phoneNumber, accountNumber)
                .orElse(null);

        if (account != null) {
            // 계좌의 잔액을 조회하여 입금 가능 여부를 확인
            double currentBalance = account.searchBalance();
            if (currentBalance >= amount) {
                // 입금 가능하면 계좌 잔액을 증가시키고 저장
                account.modifyBalance(currentBalance + amount);
                accountRepository.save(account);
                // 입금 이력을 생성 및 저장 (이 부분은 별도의 입금 이력 테이블과 연동하여 구현)
                return true; // 입금 성공
            }
        }
        return false; // 입금 실패
    }

    // 고객의 출금 처리
    public boolean withdraw(String customerName, String phoneNumber, String accountNumber, double amount) {
        // 고객 정보와 계좌 번호를 사용하여 고객 및 계좌를 조회
        Account account = accountRepository.findByAccountHolderAndPhoneNumberAndAccountNumber(customerName, phoneNumber, accountNumber)
                .orElse(null);

        if (account != null) {
            // 계좌의 잔액을 조회하여 출금 가능 여부를 확인
            double currentBalance = account.searchBalance();
            if (currentBalance >= amount) {
                // 출금 가능하면 계좌 잔액을 감소시키고 저장
                account.modifyBalance(currentBalance - amount);
                accountRepository.save(account);
                // 출금 이력을 생성 및 저장 (이 부분은 별도의 출금 이력 테이블과 연동하여 구현)
                return true; // 출금 성공
            }
        }
        return false; // 출금 실패
    }

    // 고객의 계좌 목록 조회
    public List<Account> getAccountList(String customerName, String phoneNumber) {
        // 고객 정보를 사용하여 해당 고객의 모든 계좌 목록을 조회
        return accountRepository.findByAccountHolderAndPhoneNumber(customerName, phoneNumber);
    }
}
