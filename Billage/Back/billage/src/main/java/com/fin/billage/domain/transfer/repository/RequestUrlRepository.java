package com.fin.billage.domain.transfer.repository;

import com.fin.billage.domain.transfer.entity.RequestUrl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestUrlRepository extends JpaRepository <RequestUrl, Long> {

    List<String> findRequestUrlsByRequestActCode(int actCode);
}
