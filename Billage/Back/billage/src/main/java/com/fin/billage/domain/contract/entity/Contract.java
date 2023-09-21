//package com.fin.billage.domain.contract.entity;
//
//import com.fin.billage.domain.user.entity.User;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Builder
//@Table(name = "contract")
//@NoArgsConstructor // 기본생성자
//@AllArgsConstructor
//public class Contract {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "contract_id")
//    private Long contractId;
//
//    @ManyToOne
//    @JoinColumn(name = "debtor_user_pk")
//    private User debtorUser;
//
//    @Column(name = "contract_debtor_ac_num")
//    private String contractDebtorAcNum;
//
//    @Column(name = "contract_debtor_bank", nullable = false, length = 20)
//    private String contractDebtorBank;
//
//    @Column(name = "contract_creditor_bank", nullable = false, length = 20)
//    private String contractCreditorBank;
//
//    @ManyToOne
//    @JoinColumn(name = "creditor_user_pk")
//    private User creditorUser;
//
//    @Column(name = "contract_creditor_ac_num")
//    private String contractCreditorAcNum;
//
//    @Column(name = "contract_amt")
//    private BigDecimal contractAmt;
//
//    @Column(name = "contract_interest_rate")
//    private Float contractInterestRate;
//
//    @Column(name = "contract_auto_tran_yn", columnDefinition = "Def")
//    private Boolean contractAutoTranYn;
//
//    @Column(name = "contract_auto_tran_date", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
//    private LocalDateTime contractAutoTranDate;
//
//    @Column(name = "contract_modify_count")
//    private Byte contractModifyCount;
//
//    @Column(name = "contract_alias")
//    private String contractAlias;
//
//    @Column(name = "contact_state", nullable = false)
//    private int contractState;
//
//    @Column(name = "contract_due_amt", nullable = false)
//    private BigDecimal contractDueAmt;
//
//    @Column(name = "contract_current_amt")
//    private BigDecimal contractCurrentAmt;
//
//    @Column(name = "contract_start_date")
//    private LocalDate contractStartDate;
//
//    @Column(name = "contract_create_date", nullable = false)
//    private LocalDateTime contractCreateDate;
//
//    @Column(name = "contract_modify_date", columnDefinition = "DATETIME")
//    private LocalDateTime contractModifyDate;
//
//    @Column(name = "contract_maturity_date")
//    private LocalDate contractMaturityDate;
//
//    @Column(name = "contract_expire_date", columnDefinition = "DATETIME")
//    private LocalDateTime contractExpireDate;
//
//    public void updateContractState(Boolean YN) {
//        if(YN==true) {
//            this.contractState = 1;
//            this.contractStartDate = LocalDate.now();
//        }
//        if(YN==false) this.contractState = 4;
//    }
//}
