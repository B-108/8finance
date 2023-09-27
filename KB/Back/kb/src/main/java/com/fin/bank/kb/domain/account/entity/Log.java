package com.fin.bank.kb.domain.account.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @Column(name = "log_wd_bank_code", nullable = false, length = 20)
    private String withdrawBankCode;

    @Column(name = "log_dp_bank_code", nullable = false, length = 20)
    private String depositBankCode;

    @Column(name = "log_amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "log_transaction_time", nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime transactionTime;
}
