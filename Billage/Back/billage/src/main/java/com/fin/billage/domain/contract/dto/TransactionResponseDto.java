package com.fin.billage.domain.contract.dto;

import com.fin.billage.domain.contract.entity.Contract;
import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Builder
public class TransactionResponseDto {


    // 보내는 사람
    private String tranWd;

    // 보내는 사람 계좌
    private String tranWdAcNum;

    // 보내는 사람 은행 코드
    private String tranWdBankCode;

    // 받는 사람
    private String tranDp;

    // 받는 사람 계좌
    private String tranDpAcNum;

    // 받는 사람 은행 코드
    private String tranDpBankCode;

    // 금액
    private BigDecimal tranAmt;

    // 입금 내용
    private String tranContent;

    // 거래 시간
    private LocalDateTime tranDate;
}
