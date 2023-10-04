package com.fin.billage.domain.notice.entity;

import com.fin.billage.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Builder
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
@Entity
@DynamicInsert //default를 위헤
@Table(name = "notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long noticeId;

    @ManyToOne
    @JoinColumn(name = "user_pk")
    private User user;

    @Column(name = "notice_send_date", nullable = false)
    private LocalDateTime noticeSendDate;

    @Column(name = "notice_state")
    private Integer noticeState;

    @Column(name = "notice_userName", nullable = false, length = 20)
    private String noticeUserName;

    @Column(name = "notice_keyword", length = 20)
    private String noticeKeyword;

    @Column(name = "notice_type")
    private Integer noticeType;

    @Column(name = "notice_amount", precision = 10, scale = 2)
    private BigDecimal noticeAmount;

    @Column(name = "contract_id", nullable = false)
    private Long contractId;

    public void modifyState(){
        this.noticeState = 1;
    }

    @PrePersist
    private void prePersist(){
        if (noticeState == null){
            noticeState = 0;
        }
    }
}
