package com.fin.openbank.domain.netAmount.repository;

import com.fin.openbank.domain.netAmount.entity.BankList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankListRepository extends JpaRepository<BankList, Long> {
}

