package com.fin.billage.domain.user.dto;

import lombok.Builder;

public class UserLogoutResponseDto {
    private String message;

    @Builder
    public UserLogoutResponseDto(String message) {
        this.message = message;
    }
}
