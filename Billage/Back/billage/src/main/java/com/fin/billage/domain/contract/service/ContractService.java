//package com.fin.billage.domain.contract.service;
//
//import com.fin.billage.domain.contract.dto.ContractRequestDto;
//import com.fin.billage.domain.contract.dto.ContractRespondDto;
//import com.fin.billage.domain.contract.dto.ContractResponseDto;
//import com.fin.billage.domain.contract.entity.Contract;
//import com.fin.billage.domain.contract.repository.ContractRepository;
//import com.fin.billage.domain.user.entity.User;
//import com.fin.billage.domain.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//
//@Service
//@RequiredArgsConstructor
//public class ContractService {
//    private final ContractRepository contractRepository;
//    private final UserRepository userRepository;
//
//    // 차용증 등록
//    public Contract addContract(ContractRequestDto dto) {
//        Long userPk = 111L;
//        User creditorUser = userRepository.findById(userPk).orElse(null);
//        User debtorUser = userRepository.findById(dto.getDebtorUser()).orElse(null);
//
//        // 계좌랑 은행을 같이 받기 때문에 ->
//        String[] contractDebtorAcNumBank = dto.getContractDebtorAcNum().split(" ");
//
//        String contractDebtorAcNum = "";
//
//        if (contractDebtorAcNumBank[0].equals("국민은행")) {
//            contractDebtorAcNum = "004";
//        } else if (contractDebtorAcNumBank[0].equals("기업은행")) {
//            contractDebtorAcNum = "003";
//        }
//
//        Contract contract = Contract.builder()
//                .creditorUser(creditorUser)
//                .debtorUser(debtorUser)
//                .contractDebtorBank(contractDebtorAcNum)
//                .contractDebtorAcNum(contractDebtorAcNumBank[1])
//                .contractMaturityDate(dto.getContractMaturityDate())
//                .contractAutoTranYn(dto.getContractAutoTranYn())
//                .contractAutoTranDate(dto.getContractAutoDate())
//                .contractAmt(dto.getContractAmt())
//                .contractInterestRate(dto.getContractInterestRate())
//                .contractDueAmt(dto.getContractDueAmt())
//                .contractState(0)
//                .build();
//
//        contractRepository.save(contract);
//
//        return contract;
//    }
//
//    // 차용증 조회
//    public ContractResponseDto searchContract(Long contractId) {
//        Contract contract = contractRepository.findById(contractId).orElse(null);
//
//        ContractResponseDto dto = ContractResponseDto.builder()
//                .contractAmt(contract.getContractAmt())
//                .creditorUser(contract.getCreditorUser())
//                .debtorUser(contract.getDebtorUser())
//                .contractStartDate(contract.getContractStartDate())
//                .contractInterestRate(contract.getContractInterestRate())
//                .contractMaturityDate(contract.getContractMaturityDate())
//                .build();
//
//        return dto;
//    }
//
//    // 차용증 수락, 거절
//    public Contract respondToContract(ContractRespondDto dto) {
//        Contract contract = contractRepository.findById(dto.getContractId()).orElse(null);
//
//        if (dto.getContractYN() == true) {
//            contract.updateContractState(true);
//        } else if (dto.getContractYN() == false) {
//            contract.updateContractState(false);
//        }
//
//        contractRepository.save(contract);
//        return contract;
//    }
//}
