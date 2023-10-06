package com.fin.billage.domain.transfer.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TransferRequestBodyDto {
    String userName;
    String userCellNo;
    String bankCode;
}
