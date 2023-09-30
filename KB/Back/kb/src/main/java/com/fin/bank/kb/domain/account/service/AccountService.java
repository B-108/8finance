package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.transfer.repository.TransactionRepository;
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
    private final TransactionRepository transactionRepository;

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
                        .bankName("국민은행")
                        .build();

                accountResponseDtoList.add(accountResponseDtos);
            }
        }

        return accountResponseDtoList;
    }
}
