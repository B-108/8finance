package com.fin.mydata.domain.log.dto;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Builder
public class LogRequestDto {
    private Long logId;
    private String logServiceName;
    private String logRequest;
    private LocalDateTime logDate;
    private String logUserName;
    private String logCellNo;
}
