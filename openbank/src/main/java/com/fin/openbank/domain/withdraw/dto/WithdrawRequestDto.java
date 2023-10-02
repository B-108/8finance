package com.fin.openbank.domain.withdraw.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class WithdrawRequestDto {
    private BigDecimal tranAmt;             // 거래 금액
    private String tranWdName;              // 지급인 이름
    private String tranWdCellNo;            // 지급인 핸드폰 번호
    private String tranWdBankCode;          // 지급인 은행 코드
    private String tranWdAcNum;            // 지급인 계좌 번호
}
