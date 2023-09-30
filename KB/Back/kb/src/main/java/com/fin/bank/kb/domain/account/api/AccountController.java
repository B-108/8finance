package com.fin.bank.kb.domain.account.api;

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

    // kb_계좌목록조회요청_API
    @GetMapping("/accountList")
    public ResponseEntity<List<Account>> getAccountList(
            @RequestParam String customerName,
            @RequestParam String phoneNumber
    ) {
        List<Account> accountList = accountService.getAccountList(customerName, phoneNumber);
        return new ResponseEntity<>(accountList, HttpStatus.OK);
    }

}
