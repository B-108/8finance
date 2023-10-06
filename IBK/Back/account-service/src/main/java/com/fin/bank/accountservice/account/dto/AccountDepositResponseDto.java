package com.fin.bank.accountservice.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountDepositResponseDto {
    private Long accountId;

    @Builder
    public AccountDepositResponseDto(Long accountId) {
        this.accountId = accountId;
    }
}
