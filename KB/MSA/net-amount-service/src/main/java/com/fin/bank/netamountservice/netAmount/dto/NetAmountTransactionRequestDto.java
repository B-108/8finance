package com.fin.bank.netamountservice.netAmount.dto;

import com.fin.bank.netamountservice.netAmount.enums.TransactionType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NetAmountTransactionRequestDto {
    private TransactionType transactionType;
    private String bankCode;
    private LocalDateTime startOfDay;
    private LocalDateTime endOfDay;

    @Builder
    public NetAmountTransactionRequestDto(TransactionType transactionType, String bankCode, LocalDateTime startOfDay, LocalDateTime endOfDay) {
        this.transactionType = transactionType;
        this.bankCode = bankCode;
        this.startOfDay = startOfDay;
        this.endOfDay = endOfDay;
    }
}
