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
    public ResponseEntity<Void> transferCash(@RequestBody TransferCashRequestDto dto, HttpServletRequest request) {
        transferService.transferCash(dto, request);
        return ResponseEntity.ok().build();
    }
}
