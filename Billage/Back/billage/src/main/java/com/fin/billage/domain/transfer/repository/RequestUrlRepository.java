package com.fin.billage.domain.transfer.repository;

import com.fin.billage.domain.transfer.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestUrlRepository extends JpaRepository <Url, Long> {
    Url findRequestUrlByRequestBankCodeAndRequestActCode(String requestBankCode, String requestActCode);
//    List<String> findRequestUrlsByRequestActCode(int actCode);

    Url findByRequestBankCodeAndRequestActCode(String bankCode, String s);
}
