package com.fin.bank.netamountservice.netAmount.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fin.bank.netamountservice.netAmount.enums.TransactionType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class NetAmountTransactionReponseDto {

    private Long tranId;

    // 거래 일자 및 시간
    private LocalDateTime tranDate;

    // 거래 유형 (예: 입금, 출금)
    private TransactionType tranType;

    // 거래 금액
    private BigDecimal tranAmt;

    // 지급인 이름
    private String tranWdName;

    // 지급인 핸드폰 번호
    private String tranWdCellNo;

    // 지급인 은행 코드
    private String tranWdBankCode;

    // 지급인 계좌 번호
    private String tranWdAcNum;

    // 수취인 이름
    private String tranDpName;

    // 수취인 핸드폰 번호
    private String tranDpCellNo;

    // 수취인 은행 코드
    private String tranDpBankCode;

    // 수취인 계좌 번호
    private String tranDpAcNum;

    private Long account;

    @Builder
    public NetAmountTransactionReponseDto(Long tranId, LocalDateTime tranDate, TransactionType tranType, BigDecimal tranAmt, String tranWdName, String tranWdCellNo, String tranWdBankCode, String tranWdAcNum, String tranDpName, String tranDpCellNo, String tranDpBankCode, String tranDpAcNum, Long account) {
        this.tranId = tranId;
        this.tranDate = tranDate;
        this.tranType = tranType;
        this.tranAmt = tranAmt;
        this.tranWdName = tranWdName;
        this.tranWdCellNo = tranWdCellNo;
        this.tranWdBankCode = tranWdBankCode;
        this.tranWdAcNum = tranWdAcNum;
        this.tranDpName = tranDpName;
        this.tranDpCellNo = tranDpCellNo;
        this.tranDpBankCode = tranDpBankCode;
        this.tranDpAcNum = tranDpAcNum;
        this.account = account;
    }
}
