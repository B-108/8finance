package com.fin.bank.transferservice.transfer.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class TransferWithdrawRequestDto {
    private String tranWdName; // 지급인 이름
    private String tranWdCellNo; // 지급인 핸드폰 번호
    private String tranWdAcNum; // 지급인 계좌 번호
    private BigDecimal tranAmt; // 거래 금액

    @Builder

    public TransferWithdrawRequestDto(String tranWdName, String tranWdCellNo, String tranWdAcNum, BigDecimal tranAmt) {
        this.tranWdName = tranWdName;
        this.tranWdCellNo = tranWdCellNo;
        this.tranWdAcNum = tranWdAcNum;
        this.tranAmt = tranAmt;
    }
}
