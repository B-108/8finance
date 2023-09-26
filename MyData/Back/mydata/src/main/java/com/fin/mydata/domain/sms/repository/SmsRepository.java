package com.fin.mydata.domain.sms.repository;

import com.fin.mydata.domain.sms.entity.Sms;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SmsRepository extends JpaRepository<Sms, Long> {

    Optional<Sms> findByPhoneNumber(String phoneNumber);


    void deleteByCode(String code);
}
