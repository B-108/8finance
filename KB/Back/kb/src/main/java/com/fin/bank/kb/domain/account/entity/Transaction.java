package com.fin.bank.kb.domain.account.entity;

import com.fin.bank.kb.domain.account.entity.Account;
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
@Table(name = "bank_transaction_list")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "bank_transaction_list_id", nullable = false, length = 20)
    private Integer banktranId;

    @Column(name = "tran_id")
    private Long tranId;

    @Column(name = "tran_amount")
    private BigDecimal tranAmt;

    @Column(name = "tran_date")
    private LocalDateTime tranDate;

    @Column(name = "tran_content")
    private String tranContent;

    @Column(name = "tran_type")
    private Integer tranType;

    @Column(name = "tran_tg", length = 20)
    private String tranTg;

    @Column(name = "tran_tg_ac", length = 20)
    private String tranTgAc;

    // Account 엔티티와 다대일 관계
    // 하나의 계좌에 여러개의 거래 내역이 있을 수 있음.
    @ManyToOne
    @JoinColumn(name = "ac_id")
    private Account account;
}
