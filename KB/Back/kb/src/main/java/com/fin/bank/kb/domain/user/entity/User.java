package com.fin.bank.kb.domain.user.entity;

import com.fin.bank.kb.domain.account.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@Builder
@Table(name = "bank_user")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_pk", nullable = false)
    private Long userPk;

    @Column(name = "user_seq_no")
    private String userSeqNo;

    @Column(name = "user_cell_no", nullable = false)
    private String userCellNo;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_info")
    private String userInfo;

    @Column(name = "user_simple_pass", nullable = false)
    private String userSimplePass;

    @CreationTimestamp
    @Column(name = "user_join_date")
    private LocalDateTime userJoinDate;

    @LastModifiedDate
    @Column(name = "user_modify_date")
    private LocalDateTime userModifyDate;

    @Column(name = "user_delete_date")
    private LocalDateTime userDeleteDate;

    @Column(name = "user_carrot_temp")
    private Integer userCarrotTemp;

    @Column(name = "user_agree_yn")
    private Character userAgreeYn;

    @Column(name = "user_agree_date")
    private LocalDateTime userAgreeDate;

    @OneToMany(mappedBy = "user") // 다대일 관계 설정
    private List<Account> accounts; // Account 엔티티와의 연관 관계 필드 추가

}
