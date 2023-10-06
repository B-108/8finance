package com.fin.bank.transferservice.transfer.repository;


import com.fin.bank.transferservice.transfer.entity.Transfer;
import com.fin.bank.transferservice.transfer.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {

    List<Transfer> findByTranTypeAndTranWdBankCodeAndTranDateBetween(TransactionType deposit, String bankCode, LocalDateTime startOfDay, LocalDateTime endOfDay);
}