package com.fin.bank.netamountservice.netAmount.entity;

import com.fin.bank.netamountservice.netAmount.enums.TransactionStatus;
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

    @Column(name = "net_dp_amt", nullable = false) // 입금 금액
    private BigDecimal depositAmount;

    @Column(name = "net_wd_amt", nullable = false) // 출금 금액
    private BigDecimal withdrawalAmount;

    @Column(name = "net_diff_amt", nullable = false) // 차액 (입금 - 출금)
    private BigDecimal netAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false) // 상태 코드
    private TransactionStatus status; // 상태 (돈을 보내야하는지, 받아야하는지)

    // bankCode 필드 대신 BankList 객체를 참조하도록 변경
    // 외래 키 이름은 'bank_code'로 설정
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="bank_code")
    private BankList bank;

    // 생성자 수정: bank 객체 추가
    public NetAmount(BigDecimal depositAmount, BigDecimal withdrawalAmount) {
        this.depositAmount= depositAmount;
        this.withdrawalAmount= withdrawalAmount;
    }

    public void updateNetAmoundAndStatus(BigDecimal netAmountValue, TransactionStatus status){
        this.netAmount = netAmountValue;
        this.status= status;
    }
}