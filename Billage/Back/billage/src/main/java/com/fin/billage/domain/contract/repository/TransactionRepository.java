package com.fin.billage.domain.contract.repository;

import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByContract(Contract contract);

    Transaction findByContract(Contract contract);

    List<BigDecimal> findTranAmtByContractAndTranWd(Contract contract, String tranWd);
}
