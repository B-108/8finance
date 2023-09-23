package com.fin.bank.kb.domain.account.repository;

import com.fin.bank.kb.domain.account.entity.Account;
import com.fin.bank.kb.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUserAndAccountMainYnIsTrue(User user);

//    Account findByUserId(User user);

    Optional<List<Account>> findAllByUser(User user);

    Optional<Account> findByUserAndAccountId(User user, Long account_id);


    Optional<Account> findByUser(User user);
}
