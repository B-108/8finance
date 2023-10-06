package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserGetInfoResponseDto {
    private String firebaseToken;
    private boolean isUserInfo;
    private String userName;

    @Builder
    public UserGetInfoResponseDto(String firebaseToken, boolean isUserInfo, String userName) {
        this.firebaseToken = firebaseToken;
        this.isUserInfo = isUserInfo;
        this.userName = userName;
    }
}
