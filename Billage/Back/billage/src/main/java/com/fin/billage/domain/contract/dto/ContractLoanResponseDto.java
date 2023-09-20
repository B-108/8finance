package com.fin.billage.domain.contract.dto;

import com.fin.billage.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
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
}
