package com.fin.bank.kb.domain.account.service;

<<<<<<< KB/Back/kb/src/main/java/com/fin/bank/kb/domain/account/service/AccountService.java
import com.fin.bank.kb.domain.transfer.dto.TransferRequestDto;
=======
import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountRequestDtos;
import com.fin.bank.kb.domain.account.dto.AccountResponseDtos;
>>>>>>> KB/Back/kb/src/main/java/com/fin/bank/kb/domain/account/service/AccountService.java
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.transfer.entity.Transaction;
import com.fin.bank.kb.domain.transfer.enums.TransactionType;
import com.fin.bank.kb.domain.account.repository.AccountRepository;
import com.fin.bank.kb.domain.transfer.repository.TransactionRepository;
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

    // 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
<<<<<<< KB/Back/kb/src/main/java/com/fin/bank/kb/domain/account/service/AccountService.java
    public List<Account> getAccountList(String customerName, String phoneNumber) {
        return accountRepository.findByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
=======
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
>>>>>>> KB/Back/kb/src/main/java/com/fin/bank/kb/domain/account/service/AccountService.java
    }
}
