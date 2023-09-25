//package com.fin.bank.kb.domain.user.repository;
//
//import com.fin.bank.kb.domain.user.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Long> {
//
//    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM User u WHERE u.userCellNo = ?1 AND u.userName = ?2 AND u.userDeleteDate IS NULL")
//    boolean existsByUserCellNoAndUserName(String userCellNo, String userName);
//
//    Optional<User> findByUserCellNo(String userCellNo);
//}
