package com.fin.bank.kb.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AccountRequestDto {
    private String accountBankCode;
    private String accountNum;
    private Boolean accountMainYn;
    private LocalDateTime accountRegistDate;
}
