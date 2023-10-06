package com.fin.openbank.domain.transfer.api;

import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.dto.TransferResponseDto;
import com.fin.openbank.domain.transfer.service.TransferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/transactions")
// 클래스 레벨에서 @RequestMapping("/transactions")을 사용하여 /transactions 경로에 대한 요청을 이 클래스에서 처리한다고 지정
public class TransferController {

    private final TransferService transactionService;

    // 이체 요청 API
    // 이 API는 빌리지 Web-Client로 호출하는 것임. 이때 Client가 은행이다.
    @PostMapping("/transfer")
    // @PostMapping("/transfer") 어노테이션을 사용하여 /transfer 경로에 대한 POST 요청을 처리하는 메서드를 정의
    public ResponseEntity<TransferResponseDto> transfer(@RequestBody TransferRequestDto requestDto) {
        // TransactionService를 통해 이체 요청을 처리하고 결과를 얻습니다.
        boolean success = transactionService.processTransferRequest(requestDto);
        if (success) {
            System.out.println("OpenBankingCenter 이체 성공");
            return new ResponseEntity<>(createSuccessResponse(), HttpStatus.OK);
        } else {
            System.out.println("OpenBankingCenter 이체 실패");
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
}
