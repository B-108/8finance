package com.fin.billage.domain.transfer.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TransferSearchRequestDto {
    private String actCode;
    private String bankCode;
    private String userName;
    private String userCellNo;
}
