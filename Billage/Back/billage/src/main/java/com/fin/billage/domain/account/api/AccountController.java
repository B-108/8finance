package com.fin.billage.domain.account.api;

import com.fin.billage.domain.account.dto.AccountRequestDto;
import com.fin.billage.domain.account.dto.AccountResponseDto;
import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.account.service.AccountService;
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

    // 내 계좌 등록
    @PostMapping
    public ResponseEntity<Account> addMyAccount(
            @RequestBody AccountRequestDto dto,
            HttpServletRequest request
    ) {
        Account account = accountService.addMyAccount(dto, request);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    // 내 계좌 조회
    @GetMapping
    public ResponseEntity<List<AccountResponseDto>> searchMyAccount(HttpServletRequest request) {
        List<AccountResponseDto> accounts = accountService.searchMyAccount(request);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    // 주 계좌 등록
    @PatchMapping("/{account_id}")
    public ResponseEntity<Account> addMyMainAccount(
            @PathVariable Long account_id,
            HttpServletRequest request
    ) {
        Account account = accountService.addMyMainAccount(account_id, request);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    // 계좌 삭제
    @PatchMapping("delete/{account_id}")
    public ResponseEntity<Account> deleteMyAccount(
            @PathVariable Long account_id,
            HttpServletRequest request
    ) {
        Account account = accountService.deleteMyAccount(account_id, request);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
}
