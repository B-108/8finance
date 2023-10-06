package com.fin.mydata.domain.log.repository;

import com.fin.mydata.domain.log.entity.Log;
import com.fin.mydata.domain.sms.entity.Sms;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogRepository extends JpaRepository<Log, Long> {
    Optional<Sms> findByLogCellNo(String phoneNumber);
}
