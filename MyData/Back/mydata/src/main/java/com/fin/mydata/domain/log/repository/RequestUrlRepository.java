package com.fin.mydata.domain.log.repository;

import com.fin.mydata.domain.log.entity.RequestUrl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestUrlRepository extends JpaRepository <RequestUrl, Long> {

//    List<String> findRequestUrlsByRequestActCode(int actCode);
//
//    String findRequestUrlByRequestActCodeAndRequestBankCode(String actCode, String bankCode);

    RequestUrl findByRequestBankCodeAndRequestActCode(String bankCode, String s);
}
