package com.fin.mydata.domain.log.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountRequestDto {
    private String userName;
    private String userCellNo;
    private String bankCode;
}
