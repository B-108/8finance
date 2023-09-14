package com.fin.billage.domain.contract.dto;

import com.fin.billage.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Builder
public class ContractRespondDto {
    private Long contractId;

    // 수락 혹은 거절
    private Boolean contractYN;
}
