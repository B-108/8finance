package com.fin.bank.kb.domain.user.dto;

import com.fin.bank.kb.util.JwtToken;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRefreshTokenResponseDto {
    private JwtToken accessToken;

    @Builder
    public UserRefreshTokenResponseDto(JwtToken accessToken) {
        this.accessToken = accessToken;
    }
}
