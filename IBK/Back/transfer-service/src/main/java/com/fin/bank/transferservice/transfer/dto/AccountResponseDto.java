package com.fin.bank.transferservice.transfer.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountResponseDto {

    private Long accountId;

    @Builder
    public AccountResponseDto(Long accountId) {
        this.accountId = accountId;
    }
}
