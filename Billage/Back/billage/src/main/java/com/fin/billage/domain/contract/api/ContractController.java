package com.fin.billage.domain.contract.api;

import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.account.service.AccountService;
import com.fin.billage.domain.contract.dto.ContractRequestDto;
import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contract")
public class ContractController {

    private final ContractService contractService;

    // 차용증 생성
    @PostMapping
    public ResponseEntity<Contract> addContract(@RequestBody ContractRequestDto dto) {
        Contract contract = contractService.addContract(dto);
        return new ResponseEntity<>(contract, HttpStatus.OK);
    }

    // 차용증 조회
    // 차용증 수정
}
