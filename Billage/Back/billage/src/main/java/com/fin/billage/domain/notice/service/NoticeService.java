package com.fin.billage.domain.notice.service;

import com.fin.billage.domain.notice.dto.NoticeResponseDto;
import com.fin.billage.domain.notice.entity.Notice;
import com.fin.billage.domain.notice.repository.NoticeRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final JwtUtil jwtUtil;

    // 푸쉬 알림 조회
    public List<NoticeResponseDto> searchMyNotice(HttpServletRequest request) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);

        List<Notice> noticeList = noticeRepository.findAllByUser(user);

        List<NoticeResponseDto> list = new ArrayList<>();

        for (Notice n : noticeList) {
            NoticeResponseDto noticeResponseDto = NoticeResponseDto.builder()
                    .noticeAmount(n.getNoticeAmount())
                    .noticeKeyword(n.getNoticeKeyword())
                    .noticeState(n.getNoticeState())
                    .noticeUserName(n.getNoticeUserName())
                    .noticeType(n.getNoticeType())
                    .noticeSendDate(n.getNoticeSendDate())
                    .contractId(n.getContractId())
                    .noticeId(n.getNoticeId())
                    .build();
            list.add(noticeResponseDto);
        }
        return list;
    }

    // 푸쉬 알림 읽음 처리
    public Notice modifyMyNoticeState(Long noticeId) {
        Notice notice = noticeRepository.findByNoticeId(noticeId);
        notice.modifyState();
        noticeRepository.save(notice);
        return notice;
    }
}
