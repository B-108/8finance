package com.fin.openbank.domain.transfer.service;

import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.entity.Transaction;
import com.fin.openbank.domain.transfer.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TransferService {

    private final TransactionRepository transactionRepository;

    // 클라언트로부터 받은 이체 요청 정보에서 지급 은행을 찾아서, 해당 은행에게

    // 클라이언트로부터 받은 이체 요청 정보를 저장하는 메서드
    public boolean saveTransaction(TransferRequestDto transferRequestDto) {
        // TransferRequestDto에서 Transaction 엔티티로 변환하여 저장
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
        return false;
    }
}
