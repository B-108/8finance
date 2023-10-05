package com.fin.mydata.domain.log.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountIBKRequestDto {
    private String userName;
    private String userCellNo;
}
