package com.fin.bank.transferservice.transfer.dto;

import com.fin.bank.transferservice.transfer.enums.TransactionType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TransferGetListRequestDto {
    private TransactionType transactionType;
    private String bankCode;
    private LocalDateTime startOfDay;
    private LocalDateTime endOfDay;

}
