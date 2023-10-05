package com.fin.bank.kb.domain.transfer.api;

import com.fin.bank.kb.domain.transfer.dto.TransferRequestDto;
import com.fin.bank.kb.domain.transfer.service.TransferService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/transfer")
public class TransferController {

    private final TransferService transferService;

    // 고객의 입금 요청 API
    @PostMapping("/deposit")
    public boolean deposit(@RequestBody TransferRequestDto requestDto) {
        boolean success = transferService.deposit(requestDto);
        if (success) {
            System.out.println("deposit 성공");
            return true;
        } else {
            return false;
        }
    }

    // 고객의 출금 요청 API
    @PostMapping("/withdraw")
    public boolean withdraw(@RequestBody TransferRequestDto requestDto) {
        boolean success = transferService.withdraw(requestDto);
        if (success) {
            System.out.println("withdraw 성공");
            return true;
        } else {
            return false;
        }
    }
}
