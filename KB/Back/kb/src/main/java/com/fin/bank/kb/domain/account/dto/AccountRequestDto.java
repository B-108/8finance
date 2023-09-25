package com.fin.bank.kb.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class AccountRequestDto {
    private String customerName;
    private String phoneNumber;
    private String accountNumber;
    private BigDecimal amount;
}
