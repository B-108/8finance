package com.fin.bank.transferservice.transfer.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TransferResponseDto {
    private String message;

    @Builder
    public TransferResponseDto(String message) {
        this.message = message;
    }
}
