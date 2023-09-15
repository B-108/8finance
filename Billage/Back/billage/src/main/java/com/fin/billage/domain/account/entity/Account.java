package com.fin.billage.domain.account.entity;

import com.fin.billage.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@Table(name = "account")
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

    // 잔액
//    @Column(name = "account_balance_amt")
//    private BigDecimal accountBalanceAmt;

    @Column(name = "account_bank_code", nullable = false, length = 20)
    private String accountBankCode;

    @Column(name = "account_num", nullable = false, length = 20)
    private String accountNum;

    @Column(name = "account_alias", length = 50)
    private String accountAlias;

    @Column(name = "account_main_yn", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean accountMainYn;

    @Column(name = "account_regist_date", nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime accountRegistDate;

    @Column(name = "account_delete_date", columnDefinition = "DATETIME")
    private LocalDateTime accountDeleteDate;

    @Column(name = "account_modify_date", columnDefinition = "DATETIME")
    private LocalDateTime accountModifyDate;

    public void updateAccountMainYn(Boolean yn) {
        this.accountMainYn = yn;
    }

    public void deleteAccount() {
        this.accountDeleteDate = LocalDateTime.now();
    }
}
