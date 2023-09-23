package com.fin.bank.kb.domain.account.api;

import com.fin.bank.kb.domain.account.dto.AccountRequestDto;
import com.fin.bank.kb.domain.account.dto.AccountResponseDto;
import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    // 고객의 입금 요청 API
    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(
            @RequestParam String customerName,
            @RequestParam String phoneNumber,
            @RequestParam String accountNumber,
            @RequestParam double amount
    ) {
        boolean success = accountService.deposit(customerName, phoneNumber, accountNumber, amount);
        if (success) {
            return new ResponseEntity<>("Deposit successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Deposit failed. Check customer information and account number.", HttpStatus.BAD_REQUEST);
        }
    }

    // 고객의 출금 요청 API
    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(
            @RequestParam String customerName,
            @RequestParam String phoneNumber,
            @RequestParam String accountNumber,
            @RequestParam double amount
    ) {
        boolean success = accountService.withdraw(customerName, phoneNumber, accountNumber, amount);
        if (success) {
            return new ResponseEntity<>("Withdrawal successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Withdrawal failed. Check customer information, account number, and balance.", HttpStatus.BAD_REQUEST);
        }
    }

    // 고객의 계좌 목록 조회 API
    @GetMapping("/accountList")
    public ResponseEntity<List<Account>> getAccountList(
            @RequestParam String customerName,
            @RequestParam String phoneNumber
    ) {
        List<Account> accountList = accountService.getAccountList(customerName, phoneNumber);
        return new ResponseEntity<>(accountList, HttpStatus.OK);
    }
}
