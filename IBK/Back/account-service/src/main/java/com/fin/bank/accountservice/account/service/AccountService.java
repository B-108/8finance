package com.fin.bank.accountservice.account.service;


import com.fin.bank.accountservice.account.dto.AccountGetResponseDto;
import com.fin.bank.accountservice.account.dto.AccountRequestDto;
import com.fin.bank.accountservice.account.dto.AccountResponseDto;
import com.fin.bank.accountservice.account.dto.AccountGetRequestDto;
import com.fin.bank.accountservice.account.entity.Account;
import com.fin.bank.accountservice.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}