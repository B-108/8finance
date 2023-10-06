package com.fin.openbank.domain.transfer.repository;

import com.fin.openbank.domain.transfer.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByTranWdBankCodeAndTranDateBetween(String bankCode, LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<Transaction> findBytranDpBankCodeAndTranDateBetween(String bankCode, LocalDateTime startOfDay, LocalDateTime endOfDay);
}