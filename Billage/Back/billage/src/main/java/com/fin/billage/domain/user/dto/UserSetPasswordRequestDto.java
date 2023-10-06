package com.fin.billage.domain.user.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSetPasswordRequestDto {
    private String userSimplePass;
}
