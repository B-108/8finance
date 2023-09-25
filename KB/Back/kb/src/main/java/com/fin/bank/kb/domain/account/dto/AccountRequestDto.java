package com.fin.bank.kb.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountRequestDto {
    private String customerName;
    private String phoneNumber;
    private String accountNumber;
    private double amount;
}
