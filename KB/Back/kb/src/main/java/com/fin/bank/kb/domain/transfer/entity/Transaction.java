package com.fin.bank.kb.domain.transfer.entity;

import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.transfer.enums.TransactionType;
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
@Table(name = "bank_transaction")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    // 거래번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tran_id")
    private Long tranId;

    // 거래 일자 및 시간
    @Column(name = "tran_date", nullable = false)
    private LocalDateTime tranDate;

    // 거래 유형 (예: 입금, 출금)
    @Enumerated(EnumType.STRING)
    @Column(name = "tran_type")
    private TransactionType tranType;

    // 거래 금액
    @Column(name = "tran_amt", nullable = false)
    private BigDecimal tranAmt;

    // 지급인 이름
    @Column(name = "tran_wd_name", nullable = false, length = 20)
    private String tranWdName;

    // 지급인 핸드폰 번호
    @Column(name = "tran_wd_cell_no", nullable = false, length = 20)
    private String tranWdCellNo;

    // 지급인 은행 코드
    @Column(name = "tran_wd_bank_code", nullable = false, length = 20)
    private String tranWdBankCode;

    // 지급인 계좌 번호
    @Column(name = "tran_wd_ac_num", nullable = false, length = 20)
    private String tranWdAcNum;

    // 수취인 이름
    @Column(name = "tran_dp_name", nullable = false, length = 20)
    private String tranDpName;

    // 수취인 핸드폰 번호
    @Column(name = "tran_dp_cell_no", nullable = false, length = 20)
    private String tranDpCellNo;

    // 수취인 은행 코드
    @Column(name = "tran_dp_bank_code", nullable = false, length = 20)
    private String tranDpBankCode;

    // 수취인 계좌 번호
    @Column(name = "tran_dp_ac_num", nullable = false, length = 20)
    private String tranDpAcNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ac_id")
    private Account account;
}
