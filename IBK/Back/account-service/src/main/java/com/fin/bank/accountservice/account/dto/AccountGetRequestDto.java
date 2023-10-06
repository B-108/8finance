package com.fin.bank.accountservice.account.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountGetRequestDto {

    private String tranDpName; // 수취인 이름
    private String tranDpCellNo; // 수취인 핸드폰 번호
    private String tranDpAcNum; // 수취인 계좌 번호

}