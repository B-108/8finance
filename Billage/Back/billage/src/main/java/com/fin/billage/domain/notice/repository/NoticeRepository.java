package com.fin.billage.domain.notice.repository;

import com.fin.billage.domain.notice.entity.Notice;
import com.fin.billage.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findAllByUser(User user);

    Notice findByNoticeId(Long noticeId);

    Notice findByUser(User creditorUser);
}
