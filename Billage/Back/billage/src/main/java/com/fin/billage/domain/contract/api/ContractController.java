package com.fin.billage.domain.contract.api;

import com.fin.billage.domain.contract.dto.ContractCreditorAcNumRequestDto;
import com.fin.billage.domain.contract.dto.ContractRequestDto;
import com.fin.billage.domain.contract.dto.ContractRespondDto;
import com.fin.billage.domain.contract.dto.ContractResponseDto;
import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contract")
public class ContractController {

    private final ContractService contractService;

    // 차용증 생성
    @PostMapping
    public ResponseEntity<Contract> addContract(@RequestBody ContractRequestDto dto, HttpServletRequest request) {
        Contract contract = contractService.addContract(dto, request);
        return new ResponseEntity<>(contract, HttpStatus.OK);
    }

    // 차용증 조회
    @GetMapping("/{contractId}")
    public ResponseEntity<ContractResponseDto> searchContract(@PathVariable Long contractId) {
        ContractResponseDto contractResponseDto = contractService.searchContract(contractId);
        return new ResponseEntity<>(contractResponseDto, HttpStatus.OK);
    }

    // 채권자 - 빌려줄 계좌 등록하기
    @PatchMapping
    public ResponseEntity<Contract> modifyContractCreditorAcNum(@RequestBody ContractCreditorAcNumRequestDto dto) {
        Contract contract = contractService.modifyContractCreditorAcNum(dto);
        return new ResponseEntity<>(contract, HttpStatus.OK);
    }

    // 차용증 수락, 거절 ( + 수락 시 이체까지 시켜야함)
   @PatchMapping("/agreeYn")
    public ResponseEntity<Contract> respondToContract(@RequestBody ContractRespondDto dto) {
       Contract contract = contractService.respondToContract(dto);
       return new ResponseEntity<>(contract, HttpStatus.OK);
   }
}
