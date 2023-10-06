package com.fin.billage.domain.contract.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
public class ContractLoanDetailResponseDto {
    // 돈 갚을 날짜
    private LocalDate contractMaturityDate;

    // 돈 빌린 날짜 (거래상태가 진행중으로 바뀔 때 업데이트)
    private LocalDate contractStartDate;

    // 거래 금액
    private BigDecimal contractAmt;

    // 이자율
    private Float contractInterestRate;

    // 현재까지 갚은 금액
    private BigDecimal repaymentCash;

    // 주계좌
    private String mainAccount;

    // 은행 코드
    private String bankCode;
}
