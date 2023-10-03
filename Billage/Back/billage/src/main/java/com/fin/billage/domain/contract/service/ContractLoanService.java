package com.fin.billage.domain.contract.service;

import com.fin.billage.domain.account.entity.Account;
import com.fin.billage.domain.contract.dto.ContractLoanDetailResponseDto;
import com.fin.billage.domain.contract.dto.ContractLoanResponseDto;

import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.contract.repository.TransactionRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.temporal.ChronoUnit;


import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
public class ContractLoanService {
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final JwtUtil jwtUtil;

    // 거래내역 계산
    public BigDecimal calculateTransaction(List<BigDecimal> transaction, BigDecimal amount) {
        BigDecimal sum = BigDecimal.ZERO;

        for (BigDecimal t : transaction) {
            sum = sum.add(t); // 현재 합계에 t를 더함
        }

        // amount(빌린금액) - sum
        sum = amount.subtract(sum);

        return sum;
    }

    // 빌려준 거래 목록 리스트
    public List<ContractLoanResponseDto> searchLendList(HttpServletRequest request) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);

//        Contract contract = contractRepository.findByContractId(contractId);
//        Contract contract = contractRepository.findByContractId(user);
        // 송금인(tran_wd)가 debeter_user인 경우의 tran_amt를 가져와서
        // calculateTransaction(List<Bigdecimal> tran_amt, 빌린금액)에 넣어주기


        List<Contract> contracts = contractRepository.findAllByCreditorUser(user);
        List<ContractLoanResponseDto> lendList = new ArrayList<>();

        for (Contract c : contracts) {
            String tranWd = c.getDebtorUser().getUserName();
//            List<BigDecimal> tranAmtList = transactionRepository.findAllTranAmtByContractAndTranWd(c, tranWd);
            List<Transaction> tranList = transactionRepository.findAllByContractAndTranWd(c, tranWd);
            List<BigDecimal> tranAmtList = new ArrayList<>();

            for (Transaction b : tranList) {
                tranAmtList.add(b.getTranAmt());
            }

            String creditorBankName = (c.getContractCreditorBank().equals("004")) ? "국민은행" : "기업은행";
            String debtorBankName = (c.getContractDebtorBank().equals("004")) ? "국민은행" : "기업은행";

            ContractLoanResponseDto contractLoanResponseDto = ContractLoanResponseDto.builder()
                    .contractId(c.getContractId())
                    .contractAmt(c.getContractAmt())
                    .contractState(c.getContractState())
                    .creditorUser(c.getCreditorUser())
                    .debtorUser(c.getDebtorUser())
                    .repaymentCash(calculateTransaction(tranAmtList, c.getContractAmt()))
                    .remainingLoanTerm(ChronoUnit.DAYS.between(LocalDate.now(), c.getContractMaturityDate()))
                    .creditorBankCode(c.getContractCreditorBank())
                    .creditorBankName(creditorBankName)
                    .creditorAcNum(c.getContractCreditorAcNum())
                    .debtorBankCode(c.getContractDebtorBank())
                    .debtorBankName(debtorBankName)
                    .debtorAcNum(c.getContractDebtorAcNum())
                    .build();

            lendList.add(contractLoanResponseDto);
        }

        return lendList;
    }

    // 빌린 거래 목록 리스트
    public List<ContractLoanResponseDto> searchBorrowList(HttpServletRequest request) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);

//        Contract contract = contractRepository.findByContractId(contractId);

        // 송금인(tran_wd)가 debeter_user인 경우의 tran_amt를 가져와서
        // calculateTransaction(List<Bigdecimal> tran_amt, 빌린금액)에 넣어주기

        List<Contract> contracts = contractRepository.findAllByDebtorUser(user);
        List<ContractLoanResponseDto> borrowList = new ArrayList<>();

        for (Contract c : contracts) {
            String tranWd = c.getDebtorUser().getUserName();
//            List<BigDecimal> tranAmtList = transactionRepository.findAllTranAmtByContractAndTranWd(c, tranWd);
            List<Transaction> tranList = transactionRepository.findAllByContractAndTranWd(c, tranWd);
            List<BigDecimal> tranAmtList = new ArrayList<>();

            for (Transaction b : tranList) {
                tranAmtList.add(b.getTranAmt());
            }

            String creditorBankName = (c.getContractCreditorBank().equals("004")) ? "국민은행" : "기업은행";
            String debtorBankName = (c.getContractDebtorBank().equals("004")) ? "국민은행" : "기업은행";

            ContractLoanResponseDto contractLoanResponseDto = ContractLoanResponseDto.builder()
                    .contractId(c.getContractId())
                    .contractAmt(c.getContractAmt())
                    .contractState(c.getContractState())
                    .creditorUser(c.getCreditorUser())
                    .debtorUser(c.getDebtorUser())
                    .repaymentCash(calculateTransaction(tranAmtList, c.getContractAmt()))
                    .remainingLoanTerm(ChronoUnit.DAYS.between(LocalDate.now(), c.getContractMaturityDate()))
                    .creditorBankCode(c.getContractCreditorBank())
                    .creditorBankName(creditorBankName)
                    .creditorAcNum(c.getContractCreditorAcNum())
                    .debtorBankCode(c.getContractDebtorBank())
                    .debtorBankName(debtorBankName)
                    .debtorAcNum(c.getContractDebtorAcNum())
                    .build();

            borrowList.add(contractLoanResponseDto);
        }

        return borrowList;
    }

    // 거래 상세
    public ContractLoanDetailResponseDto detailLoan(Long contractId, HttpServletRequest request) {
        Contract contract = contractRepository.findByContractId(contractId);

        String creditorAcNum = "";
        String creditorBank = "";

        if (contract.getContractCreditorAcNum() != null) {
            creditorAcNum = contract.getContractCreditorAcNum();
        }

        if (contract.getContractCreditorBank() != null) {
            creditorBank = (contract.getContractCreditorBank().equals("004")) ? "국민은행" : "기업은행";
        }

        // 송금인(tran_wd)가 debeter_user인 경우의 tran_amt를 가져와서
        // calculateTransaction(List<Bigdecimal> tran_amt, 빌린금액)에 넣어주기
        String tranWd = contract.getDebtorUser().getUserName();
//        List<BigDecimal> tranAmtList = transactionRepository.findAllTranAmtByContractAndTranWd(contract, tranWd);
        List<Transaction> tranList = transactionRepository.findAllByContractAndTranWd(contract, tranWd);
        List<BigDecimal> tranAmtList = new ArrayList<>();

        for (Transaction b : tranList) {
            tranAmtList.add(b.getTranAmt());
        }

        ContractLoanDetailResponseDto contractLoanDetailResponseDto = ContractLoanDetailResponseDto.builder()
                .contractAmt(contract.getContractAmt())
                .contractStartDate(contract.getContractStartDate())
                .contractMaturityDate(contract.getContractMaturityDate())
                .contractInterestRate(contract.getContractInterestRate())
                .repaymentCash(calculateTransaction(tranAmtList, contract.getContractAmt()))
                .bankCode(contract.getContractCreditorBank())
                .mainAccount(creditorBank + " " + creditorAcNum)
                .build();

        return contractLoanDetailResponseDto;
    }
}
