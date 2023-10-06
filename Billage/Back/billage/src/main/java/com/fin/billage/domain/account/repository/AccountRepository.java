package com.fin.billage.domain.account.repository;

import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUserAndAccountMainYnIsTrue(User user);

//    Account findByUserId(User user);

    Optional<List<Account>> findAllByUser(User user);

    Optional<Account> findByUserAndAccountId(User user, Long account_id);


//    Optional<Account> findByUser(User user);

    List<Account> findByUserAndAccountMainYn(User user, boolean b);

//    Account findByUserAndAccountNum(User user, String accountNum);

    Account findByUserAndAccountNumAndAccountBankCode(User user, String accountNum, String accountBankCode);
}
