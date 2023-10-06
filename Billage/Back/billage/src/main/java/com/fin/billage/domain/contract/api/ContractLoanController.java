package com.fin.billage.domain.contract.api;

import com.fin.billage.domain.contract.dto.ContractLoanDetailResponseDto;
import com.fin.billage.domain.contract.dto.ContractLoanResponseDto;
import com.fin.billage.domain.contract.dto.TransactionResponseDto;
import com.fin.billage.domain.contract.service.ContractLoanService;
import com.fin.billage.domain.contract.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/loan")
public class ContractLoanController {

    private final ContractLoanService contractLoanService;
    private final TransactionService transactionService;
    // 내가 채권자면 빌려준 목록이고
    // 내가 채무자면 빌려준 목록

    // 빌려준 거래 조회
    @GetMapping("/lend")
    public ResponseEntity<List<ContractLoanResponseDto>> searchLendList(
            HttpServletRequest request
    ) {
        List<ContractLoanResponseDto> loanResponseDtoList = contractLoanService.searchLendList(request);
        return new ResponseEntity<>(loanResponseDtoList, HttpStatus.OK);
    }

    // 빌린 거래 조회
    @GetMapping("/borrow")
    public ResponseEntity<List<ContractLoanResponseDto>> searchBorrowList(
            HttpServletRequest request) {
        List<ContractLoanResponseDto> loanResponseDtoList = contractLoanService.searchBorrowList(request);
        return new ResponseEntity<>(loanResponseDtoList, HttpStatus.OK);
    }

    // 거래 상세 보기
    @GetMapping("/{contractId}/detail")
    public ResponseEntity<ContractLoanDetailResponseDto> detailLoan (
            @PathVariable Long contractId,
            HttpServletRequest request) {
        ContractLoanDetailResponseDto contractLoanDetailResponseDto = contractLoanService.detailLoan(contractId, request);
        return new ResponseEntity<>(contractLoanDetailResponseDto, HttpStatus.OK);
    }

    // 거래 내역 조회
    @GetMapping("/{contractId}/trInfo")
    public ResponseEntity<List<TransactionResponseDto>> searchTrInfo (
            @PathVariable Long contractId) {
        List<TransactionResponseDto> transactionResponseDtoList = transactionService.searchTrInfo(contractId);
        return new ResponseEntity<>(transactionResponseDtoList, HttpStatus.OK);
    }
}