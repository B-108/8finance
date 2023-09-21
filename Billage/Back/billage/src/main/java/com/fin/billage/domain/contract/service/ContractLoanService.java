//package com.fin.billage.domain.contract.service;
//
//import com.fin.billage.domain.contract.dto.ContractLoanDetailResponseDto;
//import com.fin.billage.domain.contract.dto.ContractLoanResponseDto;
//
//import com.fin.billage.domain.contract.entity.Contract;
//import com.fin.billage.domain.contract.repository.ContractRepository;
//import com.fin.billage.domain.user.entity.User;
//import com.fin.billage.domain.user.repository.UserRepository;
//import com.fin.billage.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import javax.servlet.http.HttpServletRequest;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//
//
//@Service
//@RequiredArgsConstructor
//public class ContractLoanService {
//    private final ContractRepository contractRepository;
//    private final UserRepository userRepository;
//    private final JwtUtil jwtUtil;
//
//    // 빌려준 거래 목록 리스트
//    public List<ContractLoanResponseDto> searchLendList(HttpServletRequest request) {
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
//        User user = userRepository.findById(user_pk).orElse(null);
//
//        List<Contract> contracts = contractRepository.findAllByCreditorUser(user);
//
//        List<ContractLoanResponseDto> lendList = new ArrayList<>();
//
//        for (Contract c : contracts) {
//            ContractLoanResponseDto contractLoanResponseDto = ContractLoanResponseDto.builder()
//                    .contractAmt(c.getContractAmt())
//                    .contractState(c.getContractState())
//                    .creditorUser(c.getCreditorUser())
//                    .debtorUser(c.getDebtorUser())
//                    .build();
//
//            lendList.add(contractLoanResponseDto);
//        }
//
//        return lendList;
//    }
//
//    // 빌린 거래 목록 리스트
//    public List<ContractLoanResponseDto> searchBorrowList(HttpServletRequest request) {
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
//        User user = userRepository.findById(user_pk).orElse(null);
//
//        List<Contract> contracts = contractRepository.findAllByDebtorUser(user);
//
//        List<ContractLoanResponseDto> borrowList = new ArrayList<>();
//
//        for (Contract c : contracts) {
//            ContractLoanResponseDto contractLoanResponseDto = ContractLoanResponseDto.builder()
//                    .contractAmt(c.getContractAmt())
//                    .contractState(c.getContractState())
//                    .creditorUser(c.getCreditorUser())
//                    .debtorUser(c.getDebtorUser())
//                    .build();
//
//            borrowList.add(contractLoanResponseDto);
//        }
//
//        return borrowList;
//    }
//
//    // 거래 상세
//    public ContractLoanDetailResponseDto detailLoan(Long contractId, HttpServletRequest request) {
////        Long user_pk = jwtUtil.extractUserPkFromToken(request);
////        User user = userRepository.findById(user_pk).orElse(null);
//        Contract contract = contractRepository.findByContractId(contractId);
//
//        ContractLoanDetailResponseDto contractLoanDetailResponseDto = ContractLoanDetailResponseDto.builder()
//                .contractAmt(contract.getContractAmt())
//                .contractStartDate(contract.getContractStartDate())
//                .contractMaturityDate(contract.getContractMaturityDate())
//                .contractInterestRate(contract.getContractInterestRate())
//                .build();
//
//        return contractLoanDetailResponseDto;
//    }
//}
