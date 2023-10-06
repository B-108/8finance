package com.fin.bank.userservice.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserGetResponseDto {
    private Long userPk;

    @Builder
    public UserGetResponseDto(Long userPk) {
        this.userPk = userPk;
    }
}
