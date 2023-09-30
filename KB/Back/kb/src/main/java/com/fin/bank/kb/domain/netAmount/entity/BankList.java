package com.fin.bank.kb.domain.netAmount.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name = "bank_banklist") // "bank_banklist" 테이블과 매핑
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 가지는 생성자
public class BankList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false, unique = true)
    private String bankCode;
}
