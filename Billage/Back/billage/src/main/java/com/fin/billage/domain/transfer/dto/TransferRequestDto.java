package com.fin.billage.domain.transfer.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TransferRequestDto {
    private String userName;
    private String userCellNo;
    private Boolean agreeYn;

}
