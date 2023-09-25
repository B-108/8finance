package com.fin.mydata.domain.log.repository;

import com.fin.mydata.domain.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Long> {
}
