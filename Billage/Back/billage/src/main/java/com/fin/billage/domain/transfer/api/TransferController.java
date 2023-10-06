package com.fin.billage.domain.transfer.api;

import com.fin.billage.domain.transfer.dto.AccountResponseDto;
import com.fin.billage.domain.transfer.dto.TransferCashRequestDto;
import com.fin.billage.domain.transfer.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transfer")
public class TransferController {

    private final TransferService transferService;

    // 계좌 불러오기 (마이데이터로 요청)
    @PostMapping("/getBank")
    public ResponseEntity<List<AccountResponseDto>> searchBank(@RequestBody List<String> list, HttpServletRequest request) {
        List<AccountResponseDto> accountResponseDtoList = transferService.searchBank(list, request);
        return new ResponseEntity<>(accountResponseDtoList, HttpStatus.OK);
    }

    // 이체
    @PostMapping
    public ResponseEntity<String> transferCash(@RequestBody TransferCashRequestDto dto, HttpServletRequest request) {
//        try {
//            // 서비스 호출
//            transferService.transferCash(dto, request);
//            // 성공적인 응답 반환
//            return ResponseEntity.ok("이체 성공"); // 성공 메시지 반환
//        } catch (Exception e) {
//            // 에러가 발생한 경우
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
            transferService.transferCash(dto, request);
            return ResponseEntity.ok().build();
    }

}
