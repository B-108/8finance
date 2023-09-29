package com.fin.bank.kb.domain.account.api;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountRequestDtos;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDtos;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.enums.TransactionType;
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
    public ResponseEntity<AccountResponseDto> deposit(@RequestBody AccountRequestDto requestDto) {
        boolean success = accountService.deposit(requestDto);
        if (success) {
            return new ResponseEntity<>(createSuccessResponse(TransactionType.DEPOSIT), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }


    // 고객의 출금 요청 API
    @PostMapping("/withdraw")
    public ResponseEntity<AccountResponseDto> withdraw(@RequestBody AccountRequestDto requestDto) {
        boolean success = accountService.withdraw(requestDto);
        if (success) {
            return new ResponseEntity<>(createSuccessResponse(TransactionType.WITHDRAWAL), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }


    // 성공 응답 생성 메서드
    private AccountResponseDto createSuccessResponse(TransactionType transactionType) {
        return AccountResponseDto.builder()
                .message(transactionType.getValue() + " successful")
                .build();
    }

    // 에러 응답 생성 메서드
    private AccountResponseDto createErrorResponse() {
        return AccountResponseDto.builder()
                .message("Transaction failed. Check customer information, account number, and balance.")
                .build();
    }

    // 고객의 계좌 목록 조회 요청 API
//    @GetMapping("/accountList")
//    public ResponseEntity<List<Account>> getAccountList(
//            @RequestParam String customerName,
//            @RequestParam String phoneNumber
//    ) {
//        List<Account> accountList = accountService.getAccountList(customerName, phoneNumber);
//        return new ResponseEntity<>(accountList, HttpStatus.OK);
//    }

    // (수정) 고객의 계좌 목록 조회 요청 API
    @PostMapping("/accountList") // 고객의 계좌 목록을 조회하는 엔드포인트 설정
    public ResponseEntity<List<AccountResponseDtos>> getAccountList(@RequestBody List<AccountRequestDtos> list ) {
        List<AccountResponseDtos> accountList = accountService.getAccountList(list);

        for (AccountResponseDtos a : accountList) {
            System.out.println(a.getAccountNum() + " " + a.getBankName());
        }
        return new ResponseEntity<>(accountList, HttpStatus.OK);
    }

}
