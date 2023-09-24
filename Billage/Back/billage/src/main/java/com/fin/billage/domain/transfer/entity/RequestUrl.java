package com.fin.billage.domain.transfer.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name = "request_url")
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
public class RequestUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long id;

    @Column(name = "request_bank_code")
    private String requestBankCode;

    @Column(name = "request_act_code")
    private String requestActCode;

    @Column(name = "request_url")
    private String requestUrl;
}
