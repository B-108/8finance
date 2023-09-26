package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserGetInfoResponseDto {
    private String firebaseToken;
    private boolean isUserInfo;

    @Builder
    public UserGetInfoResponseDto(String firebaseToken, boolean isUserInfo) {
        this.firebaseToken = firebaseToken;
        this.isUserInfo = isUserInfo;
    }
}
