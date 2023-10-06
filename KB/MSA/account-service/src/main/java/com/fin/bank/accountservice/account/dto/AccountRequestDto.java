package com.fin.bank.accountservice.account.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountRequestDto {
    private String userName;
    private String userCellNo;
}