package com.fin.billage.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserGetListResponseDto {
    private Long userPk;
    private String userCellNo;
    private String userName;
}
