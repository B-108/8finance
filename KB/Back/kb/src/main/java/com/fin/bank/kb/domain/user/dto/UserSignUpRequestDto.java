package com.fin.bank.kb.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSignUpRequestDto {
    private String userCellNo;
    private String userName;
    private String userSimplePass;
}
