package com.fin.bank.accountservice.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountUserRequestDto {
    private String userName;
    private String userCellNo;

    @Builder
    public AccountUserRequestDto(String userName, String userCellNo) {
        this.userName = userName;
        this.userCellNo = userCellNo;
    }
}
