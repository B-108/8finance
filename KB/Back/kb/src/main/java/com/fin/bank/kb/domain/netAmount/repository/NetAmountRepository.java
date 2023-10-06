package com.fin.bank.kb.domain.netAmount.repository;

import com.fin.bank.kb.domain.netAmount.entity.NetAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetAmountRepository extends JpaRepository<NetAmount, Long> {
}
