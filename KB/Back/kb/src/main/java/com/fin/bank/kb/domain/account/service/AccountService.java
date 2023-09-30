package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountRequestDtos;
import com.fin.bank.kb.domain.account.dto.AccountResponseDtos;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    // 입금 서비스 메서드
    public boolean deposit(AccountRequestDto requestDto) {
        System.out.println(requestDto.getTranDpName() + " " + requestDto.getTranDpCellNo() + " " + requestDto.getTranDpAcNum());

        // 사용자 정보를 사용하여 계좌 조회(유효성 검증)
        Account account = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                requestDto.getTranDpName(),
                requestDto.getTranDpCellNo(),
                requestDto.getTranDpAcNum()).orElseThrow(()-> new RuntimeException("계좌없음"));

            if (isAccountBlocked(account)) {
                return false; // 입금 실패: 계좌가 잠겨 있음
            }
            // 입금 가능하면 계좌 잔액을 증가시키고 저장
            account.setAccountAddBalanceAmt(account.getAccountBalanceAmt().add(requestDto.getAmount()));
            accountRepository.save(account);

            // 입금 이력을 생성 및 저장
            saveTransaction(
                    account,
                    requestDto.getAmount(),
                    TransactionType.DEPOSIT,
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
            return true; // 입금 성공
    }

    // 출금 서비스 메서드
    public boolean withdraw(AccountRequestDto requestDto) {
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

    // 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
//    public List<Account> getAccountList(String customerName, String phoneNumber) {
//        System.out.println("여기까진 옴!");
//        return accountRepository.findByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
//    }

    // (수정) 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
    public List<AccountResponseDtos>getAccountList(List<AccountRequestDtos> list) {
        List<AccountResponseDtos> accountResponseDtoList = new ArrayList<>();

        for (AccountRequestDtos dto : list) {
            String customerName = dto.getUserName();
            String phoneNumber = dto.getUserCellNo();
            List<Account> newList = accountRepository.findAllByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
            for (Account a : newList) {
                AccountResponseDtos accountResponseDtos = AccountResponseDtos.builder()
                        .accountNum(a.getAccountNumber())
                        .bankName("국민은행")
                        .build();

                accountResponseDtoList.add(accountResponseDtos);
            }
        }

        return accountResponseDtoList;
    }

    // 계좌가 잠겨 있는지 확인하는 내부 메서드
    // 계좌 상태
    // 1: 활성, 2: 비활성, ...
    private boolean isAccountBlocked(Account account) {
        return account.getAccountStatus() == 2; // 계좌 상태 2가 비활성화
    }

    // 계좌 번호를 통해 계좌 정보 조회
    public Account getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    private void saveTransaction(
            Account account,
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
        Transaction transaction = Transaction.builder()
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
        transactionRepository.save(transaction);
    }
}
