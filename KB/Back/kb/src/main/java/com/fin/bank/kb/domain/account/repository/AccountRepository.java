package com.fin.bank.kb.domain.account.repository;

import com.fin.bank.kb.domain.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUser_UserNameAndUser_UserCellNoAndAccountNum(String customerName, String phoneNumber, String accountNumber);

    List<Account> findByUser_UserNameAndUser_UserCellNo(String customerName, String phoneNumber);
}