package com.fin.billage.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET user_delete_date = now() WHERE user_pk = ?;")
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

    @Builder
    public User(Long userPk, String userSeqNo, String userCellNo, String userName, String userInfo, String userSimplePass, LocalDateTime userJoinDate, LocalDateTime userModifyDate, LocalDateTime userDeleteDate, Integer userCarrotTemp, Character userAgreeYn, LocalDateTime userAgreeDate) {
        this.userPk = userPk;
        this.userSeqNo = userSeqNo;
        this.userCellNo = userCellNo;
        this.userName = userName;
        this.userInfo = userInfo;
        this.userSimplePass = userSimplePass;
        this.userJoinDate = userJoinDate;
        this.userModifyDate = userModifyDate;
        this.userDeleteDate = userDeleteDate;
        this.userCarrotTemp = userCarrotTemp;
        this.userAgreeYn = userAgreeYn;
        this.userAgreeDate = userAgreeDate;
    }

    public void setPassword(String newPassword) {
        this.userSimplePass = newPassword;
    }
    public void modifyAgreeYn(char yn) {
            this.userAgreeYn = yn;
            this.userAgreeDate = LocalDateTime.now();
    }
}
