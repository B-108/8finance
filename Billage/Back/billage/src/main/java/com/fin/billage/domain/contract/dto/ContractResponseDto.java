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
public class ContractResponseDto {
    // 채권자
    private User creditorUser;

    // 채무자
    private User debtorUser;

    // 돈을 빌리는 사람이 돈을 받을 계좌(은행)
    private String contractDebtorAcNum;

    // 돈 갚을 날짜 (거래상태가 진행중으로 바뀔 때 업데이트)
    private Date contractStartDate;

    // 돈 갚을 날짜
    private LocalDate contractMaturityDate;

    // 빌릴금액
    private BigDecimal contractAmt;

    // 이자율
    private Float contractInterestRate;
}
