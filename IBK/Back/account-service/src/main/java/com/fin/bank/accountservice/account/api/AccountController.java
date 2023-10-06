package com.fin.bank.accountservice.account.api;


import com.fin.bank.accountservice.account.dto.*;
import com.fin.bank.accountservice.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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

    // (수정) 고객의 계좌 목록 조회 요청 API
    @PostMapping("/accountList") // 고객의 계좌 목록을 조회하는 엔드포인트 설정
    public ResponseEntity<?> getAccountList(@RequestBody AccountRequestDto accountRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(accountService.getAccountList(accountRequestDto, request), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> getAccount(@RequestBody AccountGetRequestDto accountGetRequestDto) {
        return new ResponseEntity<>(accountService.getAccount(accountGetRequestDto), HttpStatus.OK);
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> depositAccount(@RequestBody AccountDepositRequestDto accountDepositRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(accountService.depositAccount(accountDepositRequestDto, request), HttpStatus.OK);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdrawAccount(@RequestBody AccountWithdrawRequestDto accountWithdrawRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(accountService.withdrawAccount(accountWithdrawRequestDto, request), HttpStatus.OK);
    }
}