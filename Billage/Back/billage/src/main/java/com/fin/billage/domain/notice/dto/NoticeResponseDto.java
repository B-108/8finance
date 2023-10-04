package com.fin.billage.domain.notice.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class NoticeResponseDto {
    private LocalDateTime noticeSendDate;
    private Integer noticeState;
    private String noticeUserName;
    private String noticeKeyword;
    private Integer noticeType;
    private BigDecimal noticeAmount;
    private Long contractId;
    private Long noticeId;
}
