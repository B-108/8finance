package com.fin.bank.transferservice.transfer.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class AccountRequestDto {
    private String tranDpName; // 수취인 이름
    private String tranDpCellNo; // 수취인 핸드폰 번호
    private String tranDpAcNum; // 수취인 계좌 번호
    private BigDecimal tranAmt; // 거래 금액

    @Builder

    public AccountRequestDto(String tranDpName, String tranDpCellNo, String tranDpAcNum, BigDecimal tranAmt) {
        this.tranDpName = tranDpName;
        this.tranDpCellNo = tranDpCellNo;
        this.tranDpAcNum = tranDpAcNum;
        this.tranAmt = tranAmt;
    }
}
