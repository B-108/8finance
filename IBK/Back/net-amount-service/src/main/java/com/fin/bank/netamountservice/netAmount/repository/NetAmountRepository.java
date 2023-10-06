package com.fin.bank.netamountservice.netAmount.repository;

import com.fin.bank.netamountservice.netAmount.entity.NetAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetAmountRepository extends JpaRepository<NetAmount, Long> {
}

