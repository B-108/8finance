package com.fin.billage.domain.user.dto;

import com.fin.billage.util.JwtToken;
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
