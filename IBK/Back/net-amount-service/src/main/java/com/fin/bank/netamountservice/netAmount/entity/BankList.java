package com.fin.bank.netamountservice.netAmount.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "bank_banklist") // "bank_banklist" 테이블과 매핑
@NoArgsConstructor // 기본 생성자
public class BankList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false, unique = true)
    private String bankCode;

    @Builder
    public BankList(Long id, String bankName, String bankCode) {
        this.id = id;
        this.bankName = bankName;
        this.bankCode = bankCode;
    }
}