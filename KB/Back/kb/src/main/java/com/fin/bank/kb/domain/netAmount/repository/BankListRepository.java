package com.fin.bank.kb.domain.netAmount.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fin.bank.kb.domain.netAmount.entity.BankList;

@Repository
public interface BankListRepository extends JpaRepository<BankList, Long> {
}

