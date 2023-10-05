package com.fin.bank.accountservice.account.repository;

import com.fin.bank.accountservice.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);

    Optional<List<Account>> findByUserPk(Long userPk);
}
