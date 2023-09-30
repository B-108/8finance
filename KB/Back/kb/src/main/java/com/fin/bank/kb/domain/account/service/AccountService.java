package com.fin.bank.kb.domain.account.service;

import com.fin.bank.kb.domain.transfer.dto.TransferRequestDto;
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
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;

    // 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
    public List<Account> getAccountList(String customerName, String phoneNumber) {
        return accountRepository.findByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
    }
}
