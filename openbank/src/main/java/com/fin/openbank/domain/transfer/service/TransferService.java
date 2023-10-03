package com.fin.openbank.domain.transfer.service;

import com.fin.openbank.domain.deposit.service.DepositService;
import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.entity.Transaction;
import com.fin.openbank.domain.transfer.enums.TransactionType;
import com.fin.openbank.domain.transfer.repository.TransactionRepository;
import com.fin.openbank.domain.withdraw.service.WithdrawService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TransferService {

    private final TransactionRepository transactionRepository;
    private final WithdrawService withdrawService;
    private final DepositService depositService;

    public boolean processTransferRequest(TransferRequestDto transferRequestDto) {
        TransactionType WDtransactionType = TransactionType.WITHDRAWAL;
        TransactionType DPtransactionType = TransactionType.DEPOSIT;

        // 지급은행 코드 추출
        String WdBankCode = transferRequestDto.getTranWdBankCode();
        // 지급은행에게 출금 요청
        withdrawService.withdraw(transferRequestDto, WdBankCode, WDtransactionType);

        // 수취은행 코드 추출
        String DpBankCode = transferRequestDto.getTranDpBankCode();
        // 수취은행에게 입금 요청
        depositService.deposit(transferRequestDto, DpBankCode, DPtransactionType);

        // Transaction 엔티티 생성 및 저장
        Transaction transaction = Transaction.builder()
                .tranDate(transferRequestDto.getTranDate())
                .tranAmt(transferRequestDto.getTranAmt())
                .tranWdName(transferRequestDto.getTranWdName())
                .tranWdCellNo(transferRequestDto.getTranWdCellNo())
                .tranWdBankCode(transferRequestDto.getTranWdBankCode())
                .tranWdAcNum(transferRequestDto.getTranWdAcNum())
                .tranDpName(transferRequestDto.getTranDpName())
                .tranDpCellNo(transferRequestDto.getTranDpCellNo())
                .tranDpBankCode(transferRequestDto.getTranDpBankCode())
                .tranDpAcNum(transferRequestDto.getTranDpAcNum())
                .build();

        transactionRepository.save(transaction);

        return true;
    }



}
