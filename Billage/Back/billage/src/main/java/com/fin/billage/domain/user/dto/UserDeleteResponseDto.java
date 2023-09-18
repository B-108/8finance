package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserDeleteResponseDto {
    private String message;

    @Builder
    public UserDeleteResponseDto(String message) {
        this.message = message;
    }
}
