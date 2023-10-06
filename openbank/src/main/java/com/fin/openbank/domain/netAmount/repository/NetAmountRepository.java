package com.fin.openbank.domain.netAmount.repository;

import com.fin.openbank.domain.netAmount.entity.NetAmount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NetAmountRepository extends JpaRepository<NetAmount, Long> {
}
