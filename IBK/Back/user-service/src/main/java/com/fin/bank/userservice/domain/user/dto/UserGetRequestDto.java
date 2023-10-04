package com.fin.bank.userservice.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserGetRequestDto {
    private String userName;
    private String userCellNo;
}
