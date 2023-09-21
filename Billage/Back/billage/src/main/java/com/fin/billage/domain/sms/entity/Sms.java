package com.fin.billage.domain.sms.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name = "sms")
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
public class Sms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sms_id")
    private Long smsId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "code")
    private String code;
}
