package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserLogoutResponseDto {
    private String message;

    @Builder
    public UserLogoutResponseDto(String message) {
        this.message = message;
    }
}
