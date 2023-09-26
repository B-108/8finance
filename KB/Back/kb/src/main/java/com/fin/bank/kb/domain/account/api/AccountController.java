package com.fin.bank.kb.domain.account.api;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.enums.TransactionType;
import com.fin.bank.kb.domain.account.repository.TransactionRepository;
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
    private TransactionRepository transactionRepository;

    /**
     * 빌리지가 오픈뱅킹센터로 요청하면 오픈뱅킹센터가 각 은행에게 입금 또는 출금을 요청한다.
     * 이때 요청하기 위해 각 은행의 API를 오픈뱅킹센터가 호출해서 사용한다.
     * 따라서 이곳에 있는 입금 요청 API, 출금 요청 API는 단순히 해당 은행 내의 고객의 계좌 잔액을 올리고 내리는 것이다.
     */

    // 고객의 입금 요청 API
    @PostMapping("/deposit") // 고객의 입금을 처리하는 엔드포인트 설정
    public ResponseEntity<AccountResponseDto> deposit(
        @RequestBody AccountRequestDto requestDto // 요청 본문에서 고객 정보 및 입금 정보를 받
    ) {
        // 계좌 서비스(AccountService)를 통해 입금 처리를 시도
        boolean success = accountService.deposit(
                requestDto.getCustomerName(),
                requestDto.getPhoneNumber(),
                requestDto.getAccountNumber(),
                requestDto.getAmount()
        );
        if (success) {
            // 입금 성공 시, 거래 내역을 생성하고 저장하고 응답을 반환
            return new ResponseEntity<>(createSuccessResponse(TransactionType.DEPOSIT), HttpStatus.OK);
        } else {
            // 입금 실패 시, 에러 응답 반환
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }


    // 고객의 출금 요청 API
    @PostMapping("/withdraw") // 고객의 출금을 처리하는 엔드포인트 설정
    public ResponseEntity<AccountResponseDto> withdraw( // 출금: withdraw
            @RequestBody AccountRequestDto requestDto
    ) {
        // 계좌 서비스(AccountService)를 통해 출금 처리를 시도
        boolean success = accountService.withdraw(
                requestDto.getCustomerName(),
                requestDto.getPhoneNumber(),
                requestDto.getAccountNumber(),
                requestDto.getAmount()
        );
        if (success) {
            // 출금 성공 시 응답 반환
            return new ResponseEntity<>(createSuccessResponse(TransactionType.WITHDRAWAL), HttpStatus.OK);
        } else {
            // 출금 실패 시 에러 응답 반환
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
    @GetMapping("/accountList") // 고객의 계좌 목록을 조회하는 엔드포인트 설정
    public ResponseEntity<List<Account>> getAccountList(
            @RequestParam String customerName,
            @RequestParam String phoneNumber
    ) {
        // 계좌 서비스(AccountService)를 통해 고객의 계좌 목록을 조회
        List<Account> accountList = accountService.getAccountList(customerName, phoneNumber);
        return new ResponseEntity<>(accountList, HttpStatus.OK);
    }
}
