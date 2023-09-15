package com.fin.billage.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
 
@Getter
@Builder
public class AccountResponseDto {

    private String accountBankCode;
    private String accountNum;
    private Boolean accountMainYn;
    private LocalDateTime accountRegistDate;
}
