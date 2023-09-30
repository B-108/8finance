package com.fin.bank.kb.domain.transfer.repository;

import com.fin.bank.kb.domain.transfer.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByTranTypeAndTranWdBankCode(String deposit, String bankCode);
}
