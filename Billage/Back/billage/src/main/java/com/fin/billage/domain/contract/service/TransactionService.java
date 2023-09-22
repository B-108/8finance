package com.fin.billage.domain.contract.service;

import com.fin.billage.domain.contract.dto.TransactionResponseDto;
import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.contract.repository.TransactionRepository;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final ContractRepository contractRepository;

    public List<TransactionResponseDto> searchTrInfo(Long contractId) {

        Contract contract = contractRepository.findByContractId(contractId);

        List<Transaction> transactionList = transactionRepository.findAllByContract(contract);

        List<TransactionResponseDto> transactionResponseDtoList = new ArrayList<>();

        for (Transaction t : transactionList) {
            TransactionResponseDto transactionResponseDto = TransactionResponseDto.builder()
                    .tranWd(t.getTranWd())
                    .tranWdAcNum(t.getTranWdAcNum())
                    .tranWdBankCode(t.getTranWdBankCode())
                    .tranDp(t.getTranDp())
                    .tranDpAcNum(t.getTranDpAcNum())
                    .tranDpBankCode(t.getTranDpBankCode())
                    .tranAmt(t.getTranAmt())
                    .tranDate(t.getTranDate())
                    .build();

            transactionResponseDtoList.add(transactionResponseDto);
        }



        return transactionResponseDtoList;
    }
}
