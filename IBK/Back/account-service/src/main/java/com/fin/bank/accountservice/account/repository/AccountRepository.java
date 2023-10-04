package com.fin.bank.accountservice.account.repository;

import com.fin.bank.accountservice.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);

//    Optional<Account> findByUser_UserNameAndUser_UserCellNoAndAccountNumber(String tranDpName, String tranDpCellNo, String tranDpAcNum);

    List<Account> findAllByUser_UserNameAndUser_UserCellNo(String customerName, String phoneNumber);
}
