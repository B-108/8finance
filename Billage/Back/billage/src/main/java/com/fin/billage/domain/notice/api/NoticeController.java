package com.fin.billage.domain.notice.api;

import com.fin.billage.domain.contract.dto.ContractResponseDto;
import com.fin.billage.domain.notice.dto.NoticeResponseDto;
import com.fin.billage.domain.notice.entity.Notice;
import com.fin.billage.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {
    private final NoticeService noticeService;

    // 푸쉬 알림 가져오기
    @GetMapping
    public ResponseEntity<List<NoticeResponseDto>> searchMyNotice(HttpServletRequest request) {
        List<NoticeResponseDto> noticeList = noticeService.searchMyNotice(request);
        return new ResponseEntity<>(noticeList, HttpStatus.OK);
    }

    // 푸쉬 알림 읽음처리(상태 변경)
    @PatchMapping({"/{noticeId}"})
    public ResponseEntity<Notice> modifyMyNoticeState(@PathVariable Long noticeId) {
        Notice n = noticeService.modifyMyNoticeState(noticeId);
        return new ResponseEntity<>(n, HttpStatus.OK);
    }
}
