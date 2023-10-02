package com.fin.openbank.domain.transfer.api;

import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.dto.TransferResponseDto;
import com.fin.openbank.domain.transfer.service.TransferService;
import com.fin.openbank.domain.withdraw.dto.WithdrawRequestDto;
import com.fin.openbank.domain.withdraw.service.WithdrawService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/transactions")
public class TransferController {

    private final TransferService transactionService;
    private final WithdrawService withdrawService;

    @GetMapping("/test")
    public void test() {
        System.out.println("TLasdffff");

    }
    // 이체 요청 API
    @PostMapping("/transfer")
    public ResponseEntity<TransferResponseDto> transfer(@RequestBody TransferRequestDto requestDto) {
        // TransactionService를 통해 이체 요청을 처리하고 결과를 얻습니다.
        boolean success = transactionService.saveTransaction(requestDto);
        if (success) {
            // 이체가 성공했을 경우 200 OK 상태와 성공 응답을 반환합니다.
            return new ResponseEntity<>(createSuccessResponse(), HttpStatus.OK);
        } else {
            // 이체가 실패했을 경우 400 Bad Request 상태와 에러 응답을 반환합니다.
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }

    // 성공 응답 생성 메서드
    private TransferResponseDto createSuccessResponse() {
        return TransferResponseDto.builder()
                .message("Transfer successful")
                .build();
    }

    // 에러 응답 생성 메서드
    private TransferResponseDto createErrorResponse() {
        return TransferResponseDto.builder()
                .message("Transfer failed. Check customer information, account number, and balance.")
                .build();
    }

    @PostMapping("/test")
    public void Test(@RequestBody WithdrawRequestDto requestDto){
        System.out.println("test");
        withdrawService.withdraw(requestDto);
    }
}
