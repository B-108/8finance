package com.fin.bank.netamountservice.netAmount.repository;

import com.fin.bank.netamountservice.netAmount.entity.BankList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BankListRepository extends JpaRepository<BankList, Long> {
}
