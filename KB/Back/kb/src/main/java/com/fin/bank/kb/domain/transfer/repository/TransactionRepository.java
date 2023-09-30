package com.fin.bank.kb.domain.transfer.repository;

import com.fin.bank.kb.domain.transfer.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
