package com.fin.billage.domain.contract.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@Table(name = "transaction")
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tran_id")
    private Long tranId;

    @ManyToOne
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @Column(name = "tran_wd", nullable = false, length = 20)
    private String tranWd;

    @Column(name = "tran_wd_ac_num", nullable = false, length = 20)
    private String tranWdAcNum;

    @Column(name = "tran_wd_bank_code", nullable = false, length = 20)
    private String tranWdBankCode;

    @Column(name = "tran_dp", nullable = false, length = 20)
    private String tranDp;

    @Column(name = "tran_dp_ac_num", nullable = false, length = 20)
    private String tranDpAcNum;

    @Column(name = "tran_dp_bank_code", nullable = false, length = 20)
    private String tranDpBankCode;

    @Column(name = "tran_amt", nullable = false)
    private BigDecimal tranAmt;

    @Column(name = "tran_content", length = 20)
    private String tranContent;

    @Column(name = "tran_date", nullable = false)
    private LocalDateTime tranDate;
}
