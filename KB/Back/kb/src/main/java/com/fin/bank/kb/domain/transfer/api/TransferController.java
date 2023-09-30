package com.fin.bank.kb.domain.transfer.api;

import com.fin.bank.kb.domain.transfer.dto.TransferRequestDto;
import com.fin.bank.kb.domain.transfer.dto.TransferResponseDto;
import com.fin.bank.kb.domain.account.service.AccountService;
import com.fin.bank.kb.domain.transfer.enums.TransactionType;
import com.fin.bank.kb.domain.transfer.service.TransferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class TransferController {

    private final TransferService transferService;

    /**
     * 각 API의 주석은 POSTMAN과 동일하게 맞춰놓음
     */

    // kb_입금요청_API
    @PostMapping("/deposit")
    public ResponseEntity<TransferResponseDto> deposit(@RequestBody TransferRequestDto requestDto) {
        boolean success = transferService.deposit(requestDto);
        if (success) {
            return new ResponseEntity<>(createSuccessResponse(TransactionType.DEPOSIT), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }


    // kb_출금요청_API
    @PostMapping("/withdraw")
    public ResponseEntity<TransferResponseDto> withdraw(@RequestBody TransferRequestDto requestDto) {
        boolean success = transferService.withdraw(requestDto);
        if (success) {
            return new ResponseEntity<>(createSuccessResponse(TransactionType.WITHDRAWAL), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(createErrorResponse(), HttpStatus.BAD_REQUEST);
        }
    }

    // 성공 응답 생성 메서드
    private TransferResponseDto createSuccessResponse(TransactionType transactionType) {
        return TransferResponseDto.builder()
                .message(transactionType.getValue() + " successful")
                .build();
    }

    // 에러 응답 생성 메서드
    private TransferResponseDto createErrorResponse() {
        return TransferResponseDto.builder()
                .message("Transaction failed. Check customer information, account number, and balance.")
                .build();
    }


}
