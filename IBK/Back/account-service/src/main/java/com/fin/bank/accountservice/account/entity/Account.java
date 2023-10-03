package com.fin.bank.accountservice.account.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "bank_account")
@NoArgsConstructor
public class Account {

    // 계좌
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ac_id")
    private Long accountId;

    // 계좌번호
    @Column(name = "ac_num", nullable = false, length = 20)
    private String accountNumber;

    // 잔액
    @Column(name = "ac_balance_amt")
    private BigDecimal accountBalanceAmt;

    // 계좌가 속해있는 은행
    @Column(name = "account_bank_code", nullable = false, length = 20)
    private String accountBankCode;

    // 계좌 타입
    // 1: 수시 입출금, 2: 예적금, 6: 수익증권, T: 종합계좌
    @Column(name = "ac_type", nullable = false, length = 1)
    private Character accountType;

    // 계좌 이름 (별칭)
    @Column(name = "ac_name", nullable = false, length = 20)
    private String accountAlias;

    // 계좌 상태
    // 1: 활성, 2: 비활성, ...
    @Column(name = "ac_status", nullable = false, length = 1)
    private Integer accountStatus;

    // 계좌 생성 일자
    @Column(name = "ac_create_date", nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime accountCreateDate;

    // 계좌 해지 일자
    @Column(name = "ac_delete_date", columnDefinition = "DATETIME")
    private LocalDateTime accountDeleteDate;

    // 계좌 휴면 일자
    @Column(name = "ac_dormant_date", columnDefinition = "DATETIME")
    private LocalDateTime accountDormantDate;

    // 계좌 수정 일자
    @Column(name = "ac_modify_date", columnDefinition = "DATETIME")
    private LocalDateTime accountModifyDate;

    // 계좌 비밃전호
    @Column(name = "ac_password", nullable = false, length = 20)
    private Integer accountPassword;

    // User 엔티티와 다대일 관계
    // 하나의 고객에 여러 계좌가 올 수 있음
    @Column(name = "user_pk", nullable = false)
    private Long user;

    @Builder
    public Account(Long accountId, String accountNumber, BigDecimal accountBalanceAmt, String accountBankCode, Character accountType, String accountAlias, Integer accountStatus, LocalDateTime accountCreateDate, LocalDateTime accountDeleteDate, LocalDateTime accountDormantDate, LocalDateTime accountModifyDate, Integer accountPassword, Long user) {
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

    // 잔액 감소 메서드
    public void setAccountSubtractBalanceAmt(BigDecimal subtract) {
        this.accountBalanceAmt = this.accountBalanceAmt.subtract(subtract);
    }

    // 잔액 증가 메서드
    public void setAccountAddBalanceAmt(BigDecimal accountBalanceAmt) {
        this.accountBalanceAmt = this.accountBalanceAmt.add(accountBalanceAmt);
    }
}