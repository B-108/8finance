package com.fin.bank.transferservice.transfer.dto;


import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class AccountResponseDto {

    private Long accountId;

    // 계좌번호
    private String accountNumber;

    // 잔액
    private BigDecimal accountBalanceAmt;

    // 계좌가 속해있는 은행
    private String accountBankCode;

    // 계좌 타입
    // 1: 수시 입출금, 2: 예적금, 6: 수익증권, T: 종합계좌
    private Character accountType;

    // 계좌 이름 (별칭)
    private String accountAlias;

    // 계좌 상태
    // 1: 활성, 2: 비활성, ...
    private Integer accountStatus;

    // 계좌 생성 일자
    private LocalDateTime accountCreateDate;

    // 계좌 해지 일자
    private LocalDateTime accountDeleteDate;

    // 계좌 휴면 일자
    private LocalDateTime accountDormantDate;

    // 계좌 수정 일자
    private LocalDateTime accountModifyDate;

    // 계좌 비밃전호
    private Integer accountPassword;

    // User 엔티티와 다대일 관계
    // 하나의 고객에 여러 계좌가 올 수 있음
    private Long user;

    @Builder
    public AccountResponseDto(Long accountId, String accountNumber, BigDecimal accountBalanceAmt, String accountBankCode, Character accountType, String accountAlias, Integer accountStatus, LocalDateTime accountCreateDate, LocalDateTime accountDeleteDate, LocalDateTime accountDormantDate, LocalDateTime accountModifyDate, Integer accountPassword, Long user) {
        this.accountId = accountId;
        this.accountNumber = accountNumber;
        this.accountBalanceAmt = accountBalanceAmt;
        this.accountBankCode = accountBankCode;
        this.accountType = accountType;
        this.accountAlias = accountAlias;
        this.accountStatus = accountStatus;
        this.accountCreateDate = accountCreateDate;
        this.accountDeleteDate = accountDeleteDate;
        this.accountDormantDate = accountDormantDate;
        this.accountModifyDate = accountModifyDate;
        this.accountPassword = accountPassword;
        this.user = user;
    }
}
