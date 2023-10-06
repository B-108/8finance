package com.fin.bank.accountservice.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountResponseDto {
    private String bankName;
    private String accountNum;

    @Builder
    public AccountResponseDto(String bankName, String accountNum) {
        this.bankName = bankName;
        this.accountNum = accountNum;
    }
}
