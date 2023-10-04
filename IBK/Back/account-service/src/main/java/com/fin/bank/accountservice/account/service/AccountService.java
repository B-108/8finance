package com.fin.bank.accountservice.account.service;


import com.fin.bank.accountservice.account.dto.*;
import com.fin.bank.accountservice.account.entity.Account;
import com.fin.bank.accountservice.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    private final WebClient.Builder webClientBuilder;

    // (수정) 사용자의 고객명과 전화번호를 통해 해당 고객의 모든 계좌 목록을 조회
    public List<AccountResponseDto>getAccountList(AccountRequestDto accountRequestDto, HttpServletRequest request) {

//        for (AccountRequestDto dto : list) {
//            String customerName = dto.getUserName();
//            String phoneNumber = dto.getUserCellNo();
//            List<Account> newList = accountRepository.findAllByUser_UserNameAndUser_UserCellNo(customerName, phoneNumber);
//            for (Account a : newList) {
//                AccountResponseDto accountResponseDtos = AccountResponseDto.builder()
//                        .accountNum(a.getAccountNumber())
//                        .bankName("기업은행")
//                        .build();
//
//                accountResponseDtoList.add(accountResponseDtos);
//            }
//        }
        AccountUserRequestDto accountUserRequestDto = AccountUserRequestDto.builder()
                .userCellNo(accountRequestDto.getUserCellNo())
                .userName(accountRequestDto.getUserName())
                .build();

        try {
            AccountUserResponseDto responseBody = webClientBuilder
                    .defaultHeader("Authorization", request.getHeader("Authorization"))
                    .build().post()
                    .uri("http://user-service/user/no")
                    .body(BodyInserters.fromValue(accountUserRequestDto))
                    .retrieve()
                    .bodyToMono(AccountUserResponseDto.class)
                    .switchIfEmpty(Mono.error(new RuntimeException("해당 계좌는 없는 계좌입니다.")))
                    // block() method makes the call synchronous
                    // You can add timeout value as per your requirement.
                    // If no response is received within the specified timeout duration, an exception is thrown.
                    // Here I have set it to 10 seconds.
                    .block(Duration.ofSeconds(10));

            return accountRepository.findByUserPk(responseBody.getUserPk()).orElse(null);

        } catch (Exception e) {
            return null;  // 출금 실패: 출금할 금액보다 잔액이 적음 또는 다른 오류 발생
        }
    }

    public Account getAccount(AccountGetRequestDto accountGetRequestDto) {
        return accountRepository.findByAccountNumber(accountGetRequestDto.getTranDpAcNum()).orElseThrow(() -> new RuntimeException("이런.."));
    }

    public AccountDepositResponseDto depositAccount(AccountDepositRequestDto accountDepositRequestDto, HttpServletRequest request) {

        // 토큰과 요청이 일치하는지 검증하는 코드 추가 필요
        Account depositAccount = accountRepository.findByAccountNumber(accountDepositRequestDto.getTranDpAcNum()).orElseThrow(() -> new RuntimeException("이런.."));

        if (depositAccount.getAccountStatus() == 2) {
            return null; // 입금 실패: 계좌가 잠겨 있음
        }

        // 입금 가능하면 계좌 잔액을 증가시키고 저장
        depositAccount.setAccountAddBalanceAmt(depositAccount.getAccountBalanceAmt().add(accountDepositRequestDto.getTranAmt()));
        accountRepository.save(depositAccount);

        return AccountDepositResponseDto.builder()
                .accountId(depositAccount.getAccountId())
                .build();
    }

    public AccountWithdrawResponseDto withdrawAccount(AccountWithdrawRequestDto accountWithdrawRequestDto, HttpServletRequest request) {

        Account withdrawAccount = accountRepository.findByAccountNumber(accountWithdrawRequestDto.getTranWdAcNum()).orElseThrow(() -> new RuntimeException("이런.."));

        if (withdrawAccount.getAccountStatus() == 2) {
            return null; // 입금 실패: 계좌가 잠겨 있음
        }

        BigDecimal currentBalance = withdrawAccount.getAccountBalanceAmt();
        if (currentBalance != null && accountWithdrawRequestDto.getTranAmt() != null && currentBalance.compareTo(accountWithdrawRequestDto.getTranAmt()) >= 0) {
            // 출금 가능하면 계좌 잔액을 감소시키고 저장
            withdrawAccount.setAccountSubtractBalanceAmt(withdrawAccount.getAccountBalanceAmt().subtract(accountWithdrawRequestDto.getTranAmt()));
            accountRepository.save(withdrawAccount);

            return AccountWithdrawResponseDto.builder()
                    .accountId(withdrawAccount.getAccountId())
                    .build();
        }

        return null;
    }
}