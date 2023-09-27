package com.fin.bank.kb.domain.account.dto;

import com.fin.bank.kb.domain.account.enums.TransactionType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class AccountRequestDto {
    private LocalDateTime tranDate; // 거래 일자 및 시간
    private TransactionType tranType; // 거래 유형 (입금 또는 출금)
    private BigDecimal tranAmt; // 거래 금액
    private String tranWdName; // 지급인 이름
    private String tranWdCellNo; // 지급인 핸드폰 번호
    private String tranWdBankCode; // 지급인 은행 코드
    private String tranWdAcNum; // 지급인 계좌 번호
    private String tranDpName; // 수취인 이름
    private String tranDpCellNo; // 수취인 핸드폰 번호
    private String tranDpBankCode; // 수취인 은행 코드
    private String tranDpAcNum; // 수취인 계좌 번호
    private String tranContent; // 거래 내용

    public BigDecimal getAmount() {
        return this.tranAmt;
    }
}
