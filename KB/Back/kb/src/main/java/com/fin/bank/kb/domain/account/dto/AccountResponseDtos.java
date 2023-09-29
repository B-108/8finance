package com.fin.bank.kb.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountResponseDtos {
    private String bankName;
    private String accountNum;
}
