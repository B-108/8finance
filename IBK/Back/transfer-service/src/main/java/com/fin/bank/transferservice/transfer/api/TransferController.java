package com.fin.bank.transferservice.transfer.api;

import com.fin.bank.transferservice.transfer.dto.TransferGetListRequestDto;
import com.fin.bank.transferservice.transfer.dto.TransferRequestDto;
import com.fin.bank.transferservice.transfer.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transfer")
public class TransferController {

    private final TransferService transferService;

    /**
     * 빌리지가 오픈뱅킹센터로 요청하면 오픈뱅킹센터가 각 은행에게 입금 또는 출금을 요청한다.
     * 이때 요청하기 위해 각 은행의 API를 오픈뱅킹센터가 호출해서 사용한다.
     * 따라서 이곳에 있는 입금 요청 API, 출금 요청 API는 단순히 해당 은행 내의 고객의 계좌 잔액을 올리고 내리는 것이다.
     */

    // 고객의 입금 요청 API
    @PostMapping("/deposit")
    public boolean deposit(@RequestBody TransferRequestDto requestDto, HttpServletRequest request) {
        return transferService.deposit(requestDto, request);
    }

    // 고객의 출금 요청 API
    @PostMapping("/withdraw")
    public boolean withdraw(@RequestBody TransferRequestDto requestDto, HttpServletRequest request) {
        return transferService.withdraw(requestDto, request);
    }

    @PostMapping("/list")
    public ResponseEntity<?> getTransferList(@RequestBody TransferGetListRequestDto transferGetListRequestDto) {
        return new ResponseEntity<>(transferService.getTransferList(transferGetListRequestDto), HttpStatus.OK);
    }
}