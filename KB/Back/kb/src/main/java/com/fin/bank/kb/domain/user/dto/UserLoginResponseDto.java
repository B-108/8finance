package com.fin.bank.kb.domain.user.dto;

import com.fin.bank.kb.util.JwtToken;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserLoginResponseDto {
    private JwtToken jwtToken;
    private String userName;

    @Builder
    public UserLoginResponseDto(JwtToken jwtToken, String userName) {
        this.jwtToken = jwtToken;
        this.userName = userName;
    }
}
