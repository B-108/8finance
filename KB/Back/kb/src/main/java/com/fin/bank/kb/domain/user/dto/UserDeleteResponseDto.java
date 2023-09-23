package com.fin.bank.kb.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserDeleteResponseDto {
    private String message;

    @Builder
    public UserDeleteResponseDto(String message) {
        this.message = message;
    }
}
