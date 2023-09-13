package com.fin.billage.domain.contract.dto;

import com.fin.billage.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class ContractRequestDto {
    // 채권자
    private Long creditorUser;

    // 채무자
    private Long debtorUser;

    // 돈을 빌리는 사람이 돈을 받을 계좌(은행)
    private String contractDebtorAcNum;

    // 돈 갚을 날짜
    private LocalDateTime contractMaturityDate;

    // 자동이체 여부
    private Boolean contractAutoTranYn;

    // 자동이체 날짜
    private LocalDateTime contractAutoDate;

    // 빌릴금액
    private BigDecimal contractAmt;

    // 이자율
    private Float contractInterestRate;

    // 상환 예정 금액
    private BigDecimal contractDueAmt;
}
