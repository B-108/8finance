package com.fin.bank.accountservice.account.service;


import com.fin.bank.accountservice.account.dto.*;
import com.fin.bank.accountservice.account.entity.Account;
import com.fin.bank.accountservice.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;

    // (수정) 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
    public List<AccountResponseDto>getAccountList(List<AccountRequestDto> list) {
        List<AccountResponseDto> accountResponseDtoList = new ArrayList<>();

        for (AccountRequestDto dto : list) {
            String customerName = dto.getUserName();
            String phoneNumber = dto.getUserCellNo();
            List<Account> newList = accountRepository.findAllByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
            for (Account a : newList) {
                AccountResponseDto accountResponseDtos = AccountResponseDto.builder()
                        .accountNum(a.getAccountNumber())
                        .bankName("기업은행")
                        .build();

                accountResponseDtoList.add(accountResponseDtos);
            }
        }

        return accountResponseDtoList;
    }

    public Account getAccount(AccountGetRequestDto accountGetRequestDto) {
        return accountRepository.findByAccountNumber(accountGetRequestDto.getTranDpAcNum()).orElseThrow(() -> new RuntimeException("이런.."));
    }

    public AccountDepositResponseDto depositAccount(AccountDepositRequestDto accountDepositRequestDto, HttpServletRequest request) {

        System.out.println("여기는 온건다 씨발아");

        // 토큰과 요청이 일치하는지 검증하는 코드 추가 필요

        Account depositAccount = accountRepository.findByAccountNumber(accountDepositRequestDto.getTranDpAcNum()).orElseThrow(() -> new RuntimeException("이런.."));

        if (depositAccount.getAccountStatus() == 2) {
            return null; // 입금 실패: 계좌가 잠겨 있음
        }

        System.out.println("계좌도 다 있고 이제 저장만 하면 된다");
        // 입금 가능하면 계좌 잔액을 증가시키고 저장
        depositAccount.setAccountAddBalanceAmt(depositAccount.getAccountBalanceAmt().add(accountDepositRequestDto.getTranAmt()));
        accountRepository.save(depositAccount);

        System.out.println("씨발 나도 cns 가고 싶다고 씨발아");

        return AccountDepositResponseDto.builder()
                .accountId(depositAccount.getAccountId())
                .build();
    }
}