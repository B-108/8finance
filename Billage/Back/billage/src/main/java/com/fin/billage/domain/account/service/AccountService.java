package com.fin.billage.domain.account.service;

import com.fin.billage.domain.account.dto.AccountRequestDto;
import com.fin.billage.domain.account.dto.AccountResponseDto;
import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.account.repository.AccountRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    // 내 계좌 등록
    public Account addMyAccount(AccountRequestDto dto) {
        Long user_pk = 1111L;
        User user = userRepository.findById(user_pk);

        boolean mainYn = false;
//         가지고 있는 계좌가 null(0개) 일 때 첫 번째 등록 계좌를 주계좌로
        Optional<Account> userAccounts = accountRepository.findByUser(user);
        if (!userAccounts.isPresent()) {
            mainYn = true;
        }

        Account account = Account.builder()
                .user(user)
                .accountBankCode(dto.getAccountBankCode())
                .accountNum(dto.getAccountNum())
                .accountRegistDate(LocalDateTime.now())
                .accountMainYn(mainYn)
                .build();


        accountRepository.save(account);
        return account;
    }

    // 내 계좌 리스트 조회
    public List<AccountResponseDto> searchMyAccount() {
        Long user_pk = 1111L;
        User user = userRepository.findById(user_pk);
        List<Account> accounts = accountRepository.findAllByUserId(user);
        List<AccountResponseDto> dtos = new ArrayList<>();

        for (Account account : accounts) {
            AccountResponseDto dto = AccountResponseDto.builder()
                    .accountBankCode(account.getAccountBankCode())
                    .accountNum(account.getAccountNum())
                    .accountRegistDate(account.getAccountRegistDate())
                    .accountMainYn(account.getAccountMainYn())
                    .build();

            dtos.add(dto);
        }

        return dtos;
    }

    // 주 계좌 등록
    public Account addMyMainAccount(Long account_id) {
        Long user_pk = 1111L;
        User user = userRepository.findById(user_pk).orElse(null);

        // 기존 주계좌 찾아서 false로 바꿔주기
        Account mainAccount = accountRepository.findByUserAndAccountMainYnIsTrue(user);

        if (mainAccount != null) {
            mainAccount.updateAccountMainYn(false);
            accountRepository.save(mainAccount);
        }

        // 주계좌로 설정
        Account account = accountRepository.findByUserAndAccountId(user, account_id);
        if (account != null) {
            account.updateAccountMainYn(true);
            accountRepository.save(account);
        }

        return account;
    }

    // 등록된 계좌 삭제처리
    public Account deleteMyAccount(Long account_id) {
        Long user_pk = 1111L;
        User user = userRepository.findById(user_pk).orElse(null);
        Account account = accountRepository.findByUserAndAccountId(user, account_id);

        account.deleteAccount();
        accountRepository.save(account);

        return account;
    }

    //

}
