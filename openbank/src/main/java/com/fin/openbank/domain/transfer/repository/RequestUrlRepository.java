package com.fin.openbank.domain.transfer.repository;

import com.fin.openbank.domain.transfer.entity.Url;
import com.fin.openbank.domain.transfer.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestUrlRepository extends JpaRepository<Url, Long> {
    Url findByRequestBankCodeAndTransactionType(String requestBankCode, TransactionType transactionType);

}
