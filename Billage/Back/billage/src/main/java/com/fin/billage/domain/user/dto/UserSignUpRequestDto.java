package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSignUpRequestDto {
    private String userCellNo;
    private String userName;
    private String userSimplePass;

    @Builder
    public UserSignUpRequestDto(String userCellNo, String userName, String userSimplePass) {
        this.userCellNo = userCellNo;
        this.userName = userName;
        this.userSimplePass = userSimplePass;
    }
}
