package com.fin.bank.transferservice.transfer.dto;

import com.fin.bank.transferservice.transfer.enums.TransactionType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TransferGetListRequestDto {
    private TransactionType transactionType;
    private String bankCode;
    private LocalDateTime startOfDay;
    private LocalDateTime endOfDay;

    @Builder
    public TransferGetListRequestDto(TransactionType transactionType, String bankCode, LocalDateTime startOfDay, LocalDateTime endOfDay) {
        this.transactionType = transactionType;
        this.bankCode = bankCode;
        this.startOfDay = startOfDay;
        this.endOfDay = endOfDay;
    }
}
