package com.fin.billage.domain.user.dto;

import com.fin.billage.util.JwtToken;
import lombok.Builder;

public class UserLoginResponseDto {
    private JwtToken jwtToken;
    private String userName;

    @Builder
    public UserLoginResponseDto(JwtToken jwtToken, String userName) {
        this.jwtToken = jwtToken;
        this.userName = userName;
    }
}
