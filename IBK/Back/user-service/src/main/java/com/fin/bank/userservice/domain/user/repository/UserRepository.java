package com.fin.bank.userservice.domain.user.repository;

import com.fin.bank.userservice.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserCellNo(String name);

    Optional<User> findByUserCellNoAndUserName(String userCellNo, String userName);
}
