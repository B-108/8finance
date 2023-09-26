package com.fin.bank.kb.domain.account.entity;

import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.account.enums.TransactionType;
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

    @Enumerated(EnumType.STRING) // 문자열로 매핑
    @Column(name = "tran_type")
    private TransactionType tranType;

    @Column(name = "tran_tg", length = 20)
    private String tranTg;

    @Column(name = "tran_tg_ac", length = 20)
    private String tranTgAc;

    @Column(name = "counterparty", length = 50) // 상대방(대상) 정보 추가
    private String counterparty;

    @Column(name = "counterparty_account", length = 50) // 상대방(대상) 계좌 정보 추가
    private String counterpartyAccount;

    // Account 엔티티와 다대일 관계q
    // 하나의 계좌에 여러개의 거래 내역이 있을 수 있음.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ac_id")
    private Account account;
}
