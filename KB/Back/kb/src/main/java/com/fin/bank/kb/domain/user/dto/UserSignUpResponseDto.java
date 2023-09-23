package com.fin.bank.kb.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserSignUpResponseDto {
    private String userName;

    @Builder
    public UserSignUpResponseDto(String userName) {
        this.userName = userName;
    }
}
