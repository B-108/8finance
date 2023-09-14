package com.fin.billage.domain.user.dto;

import lombok.Builder;

public class UserSignUpResponseDto {
    private String userName;

    @Builder
    public UserSignUpResponseDto(String userName) {
        this.userName = userName;
    }
}
