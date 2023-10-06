package com.fin.mydata.domain.log.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor // 기본생성자
@AllArgsConstructor
@Entity
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @Column(name = "log_service_name", length = 20, nullable = false)
    private String logServiceName;

    @Column(name = "log_request", length = 20, nullable = false)
    private String logRequest;

    @Column(name = "log_date", nullable = false)
    private LocalDateTime logDate;

    @Column(name = "log_user_name", length = 20, nullable = false)
    private String logUserName;

    @Column(name = "log_cell_no", length = 20, nullable = false)
    private String logCellNo;
}

