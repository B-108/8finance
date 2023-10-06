package com.fin.openbank.domain.transfer.entity;

import com.fin.openbank.domain.transfer.enums.TransactionType;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name = "url")
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long id;

    @Column(name = "request_bank_code")
    private String requestBankCode;

    @Enumerated(EnumType.STRING) // TransactionType을 문자열로 저장
    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(name = "request_url")
    private String requestUrl;
}
