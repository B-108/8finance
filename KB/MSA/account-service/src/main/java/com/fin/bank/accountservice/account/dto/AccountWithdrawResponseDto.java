package com.fin.bank.accountservice.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountWithdrawResponseDto {
    private Long accountId;

    @Builder
    public AccountWithdrawResponseDto(Long accountId) {
        this.accountId = accountId;
    }
}
