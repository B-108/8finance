package com.fin.bank.kb.domain.transfer.service;

import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.transfer.dto.TransferRequestDto;
import com.fin.bank.kb.domain.transfer.entity.Transaction;
import com.fin.bank.kb.domain.transfer.enums.TransactionType;
import com.fin.bank.kb.domain.transfer.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TransferService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    // 입금 서비스 메서드
    public boolean deposit(TransferRequestDto requestDto) {
        System.out.println("수취(입금)인 정보> " +
                "[수취인명] " + requestDto.getTranDpName() +
                ", [수취인 휴대폰 번호] " + requestDto.getTranDpCellNo() +
                ", [수취인 입금 계좌번호] " + requestDto.getTranDpAcNum());

        // 사용자 정보를 사용하여 계좌 조회(유효성 검증)
        Account account = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                requestDto.getTranDpName(),
                requestDto.getTranDpCellNo(),
                requestDto.getTranDpAcNum()).orElseThrow(()-> new RuntimeException("입금 계좌없음"));
        System.out.println("입금 계좌 있음");
        if (isAccountBlocked(account)) {
            System.out.println("입금 실패: 계좌가 잠겨 있음");
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
        System.out.println("입금 성공");
        return true; // 입금 성공
    }

    // 출금 서비스 메서드
    public boolean withdraw(TransferRequestDto requestDto) {
        System.out.println("지급(출금)인 정보> " +
                "[지급인명] " + requestDto.getTranWdName() +
                ", [지급인 휴대폰 번호] " + requestDto.getTranWdCellNo() +
                ", [지급인 출금 계좌번호] " + requestDto.getTranWdAcNum());

        // 사용자 정보를 사용하여 계좌 조회(유효성 검증)
        Account account = accountRepository.findByUser_UserNameAndUser_UserCellNoAndAccountNumber(
                requestDto.getTranWdName(),
                requestDto.getTranWdCellNo(),
                requestDto.getTranWdAcNum()).orElseThrow(()-> new RuntimeException("출금 계좌없음"));
        System.out.println("출금 계좌 있음");
        if (isAccountBlocked(account)) {
            System.out.println("입금 실패: 계좌가 잠겨 있음");
            return false; // 입금 실패: 계좌가 잠겨 있음
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
            System.out.println("출금 성공");
            return true; // 출금 성공
        }
        System.out.println("출금 실패: 출금할 금액보다 잔액이 적음");
        return false; // 출금 실패: 출금할 금액보다 잔액이 적음
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
