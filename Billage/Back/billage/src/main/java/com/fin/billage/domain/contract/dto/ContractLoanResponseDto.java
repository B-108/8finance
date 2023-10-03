package com.fin.billage.domain.contract.dto;

import com.fin.billage.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Builder
public class ContractLoanResponseDto {

    private Long contractId;

    // 채권자
    private User creditorUser;

    // 채무자
    private User debtorUser;

    // 빌릴금액
    private BigDecimal contractAmt;

    // 거래상태
    private int contractState;

    // 현재까지 갚은 금액
    private BigDecimal repaymentCash;

    // 상환일까지 남은 기간
    private Long remainingLoanTerm;

    // 채권자 계좌
    private String creditorAcNum;

    // 채권자 은행 코드
    private String creditorBankCode;

    // 채권자 은행명
    private String creditorBankName;

    // 채무자 계좌
    private String debtorAcNum;

    // 채무자 은행 코드
    private String debtorBankCode;

    // 채무자 은행명
    private String debtorBankName;
}
