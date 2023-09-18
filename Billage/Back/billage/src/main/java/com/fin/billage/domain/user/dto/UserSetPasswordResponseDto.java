package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserSetPasswordResponseDto {
    private String message;

    @Builder
    public UserSetPasswordResponseDto(String message) {
        this.message = message;
    }
}
