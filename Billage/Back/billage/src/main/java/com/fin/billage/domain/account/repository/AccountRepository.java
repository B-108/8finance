package com.fin.billage.domain.account.repository;

import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Account findByUserAndAccountMainYnIsTrue(User user);

//    Account findByUserId(User user);

    List<Account> findAllByUserId(User user);

    Account findByUserAndAccountId(User user, Long account_id);


    Optional<Account> findByUser(User user);
}
