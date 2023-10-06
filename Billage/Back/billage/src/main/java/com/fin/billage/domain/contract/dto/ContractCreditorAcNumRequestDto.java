package com.fin.billage.domain.contract.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ContractCreditorAcNumRequestDto {
    // 차용증 ID
    private Long contractId;

    // 돈을 빌리는 사람이 돈을 받을 계좌(은행 + 계좌)
    private String contractCreditorAcNum;
}
