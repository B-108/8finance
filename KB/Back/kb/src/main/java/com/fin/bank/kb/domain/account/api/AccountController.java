package com.fin.bank.kb.domain.account.api;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    /**
     * 빌리지가 오픈뱅킹센터로 요청하면 오픈뱅킹센터가 각 은행에게 입금 또는 출금을 요청한다.
     * 이때 요청하기 위해 각 은행의 API를 오픈뱅킹센터가 호출해서 사용한다.
     * 따라서 이곳에 있는 입금 요청 API, 출금 요청 API는 단순히 해당 은행 내의 고객의 계좌 잔액을 올리고 내리는 것이다.
     */

    // 고객의 입금 요청 API
    @PostMapping("/deposit")
    public ResponseEntity<AccountResponseDto> deposit( // 입금: deposit
        @RequestBody AccountRequestDto requestDto
    ) {
        boolean success = accountService.deposit(
                requestDto.getCustomerName(),
                requestDto.getPhoneNumber(),
                requestDto.getAccountNumber(),
                requestDto.getAmount()
        );

        if (success) {
            AccountResponseDto responseDto = AccountResponseDto.builder()
                    .message("Deposit successful")
                    .build();
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            AccountResponseDto responseDto = AccountResponseDto.builder()
                    .message("Deposit failed. Check customer information, account number, and balance.")
                    .build();
            return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
        }
    }

    // 고객의 출금 요청 API
    @PostMapping("/withdraw")
    public ResponseEntity<AccountResponseDto> withdraw( // 출금: withdraw
            @RequestBody AccountRequestDto requestDto
    ) {
        boolean success = accountService.withdraw(
                requestDto.getCustomerName(),
                requestDto.getPhoneNumber(),
                requestDto.getAccountNumber(),
                requestDto.getAmount()
        );
        if (success) { // 성공할 경우
            AccountResponseDto responseDto = AccountResponseDto.builder()
                    .message("Withdrawal successful")
                    .build();
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else { // 실패할 경우
            AccountResponseDto responseDto = AccountResponseDto.builder()
                    .message("Withdrawal failed. Check customer information, account number, and balance.")
                    .build();
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }
    }

    // 고객의 계좌 목록 조회 요청 API
    @GetMapping("/accountList")
    public ResponseEntity<List<Account>> getAccountList(
            @RequestParam String customerName, // 고객 이름
            @RequestParam String phoneNumber // 핸드폰 번호
    ) {
        List<Account> accountList = accountService.getAccountList(customerName, phoneNumber);
        return new ResponseEntity<>(accountList, HttpStatus.OK);
    }
}
