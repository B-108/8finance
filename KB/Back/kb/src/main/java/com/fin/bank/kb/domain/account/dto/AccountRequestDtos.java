package com.fin.bank.kb.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountRequestDtos {
    private String userName;
    private String userCellNo;
    private String bankCode;
}
