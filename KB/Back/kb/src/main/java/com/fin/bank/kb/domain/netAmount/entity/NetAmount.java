package com.fin.bank.kb.domain.netAmount.entity;

import com.fin.bank.kb.domain.netAmount.enums.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Builder
@Table(name = "bank_netamount") // "bank_netamount" 테이블과 매핑
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 가지는 생성자
public class NetAmount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "net_bank_code", nullable = false) // 은행 코드
    private String bankCode;

    @Column(name = "net_dp_amt", nullable = false) // 입금 금액
    private BigDecimal depositAmount;

    @Column(name = "net_wd_amt", nullable = false) // 출금 금액
    private BigDecimal withdrawalAmount;

    @Column(name = "net_diff_amt", nullable = false) // 차액 (입금 - 출금)
    private BigDecimal netAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false) // 상태 코드
    private TransactionStatus status; // 상태 (돈을 보내야하는지, 받아야하는지)
}
