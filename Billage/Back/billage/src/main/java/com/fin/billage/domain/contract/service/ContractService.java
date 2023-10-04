package com.fin.billage.domain.contract.service;

import com.fin.billage.domain.contract.dto.*;
import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.notice.entity.Notice;
import com.fin.billage.domain.notice.repository.NoticeRepository;
import com.fin.billage.domain.transfer.api.TransferController;
import com.fin.billage.domain.transfer.dto.TransferCashRequestDto;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class ContractService {
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final TransferController transferController;
    private final NoticeRepository noticeRepository;

    // 차용증 등록
    public Contract addContract(ContractRequestDto dto, HttpServletRequest request) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);

        // 채무자 (작성자)
        User debtorUser = userRepository.findById(user_pk).orElse(null);
        // 채권자
        User creditorUser = userRepository.findById(dto.getCreditorUser()).orElse(null);

        // 계좌랑 은행을 같이 받기 때문에 ->
        String[] contractDebtorAcNumBank = dto.getContractDebtorAcNum().split(" ");

        String contractDebtorAcNum = "";

        if (contractDebtorAcNumBank[0].equals("국민은행")) {
            contractDebtorAcNum = "004";
        } else if (contractDebtorAcNumBank[0].equals("기업은행")) {
            contractDebtorAcNum = "003";
        }

        Contract contract = Contract.builder()
                .creditorUser(creditorUser)
                .debtorUser(debtorUser)
                .contractDebtorBank(contractDebtorAcNum)
                .contractDebtorAcNum(contractDebtorAcNumBank[1])
                .contractMaturityDate(dto.getContractMaturityDate())
                .contractAutoTranYn(dto.getContractAutoTranYn())
                .contractAutoTranDate(dto.getContractAutoDate())
                .contractAmt(dto.getContractAmt())
                .contractInterestRate(dto.getContractInterestRate())
                .contractDueAmt(dto.getContractDueAmt())
                .contractState(0)
                .contractCreateDate(LocalDateTime.now())
                .build();

        contractRepository.save(contract);

        // 차용증 요청 채권자 노티 DB에 등록
        Notice n = Notice.builder()
                .contractId(contract.getContractId())
                .user(creditorUser)
                .noticeUserName(debtorUser.getUserName())
                .noticeSendDate(LocalDateTime.now())
                .noticeState(1)
                .build();

        noticeRepository.save(n);

        return contract;
    }

    // 차용증 조회
    public ContractResponseDto searchContract(Long contractId) {
        Contract contract = contractRepository.findById(contractId).orElse(null);

        ContractResponseDto dto = ContractResponseDto.builder()
                .contractAmt(contract.getContractAmt())
                .creditorUser(contract.getCreditorUser())
                .debtorUser(contract.getDebtorUser())
                .contractStartDate(contract.getContractStartDate())
                .contractInterestRate(contract.getContractInterestRate())
                .contractMaturityDate(contract.getContractMaturityDate())
                .build();

        return dto;
    }

    // 차용증 수락, 거절
    public Contract respondToContract(TransferCashRequestDto dto, Boolean yN, HttpServletRequest request) {
        Contract contract = contractRepository.findById(dto.getContractId()).orElse(null);

        if (yN) {
            contract.updateContractState(true);
            // 자동이체 로직 가져와서 호출해서 쓰기
            transferController.transferCash(dto, request);

            // 차용증 수락 노티에 등록
            Notice n = Notice.builder()
                    .contractId(contract.getContractId())
                    .user(contract.getDebtorUser())
                    .noticeUserName(contract.getCreditorUser().getUserName())
                    .noticeSendDate(LocalDateTime.now())
                    .noticeState(2)
                    .build();

            noticeRepository.save(n);

            } else if (!yN) {
            contract.updateContractState(false);

            // 차용증 거절 노티에 등록
            Notice n = Notice.builder()
                    .contractId(contract.getContractId())
                    .user(contract.getDebtorUser())
                    .noticeUserName(contract.getCreditorUser().getUserName())
                    .noticeSendDate(LocalDateTime.now())
                    .noticeState(3)
                    .build();

            noticeRepository.save(n);
        }
        contractRepository.save(contract);
        return contract;
    }

//     채권자 - 빌려줄 계좌 등록
    public Contract modifyContractCreditorAcNum(ContractCreditorAcNumRequestDto dto) {
//         계좌랑 은행을 같이 받기 때문에 ->
        String[] contractCreditorAcNumBank = dto.getContractCreditorAcNum().split(" ");

        String contractCreditorBankCode = "";

        if (contractCreditorAcNumBank[0].equals("국민은행")) {
            contractCreditorBankCode = "004";
        } else if (contractCreditorAcNumBank[0].equals("기업은행")) {
            contractCreditorBankCode = "003";
        }
        System.out.println(dto.getContractId());

        Contract contract = contractRepository.findById(dto.getContractId()).orElse(null);
        contract.modifyContractCreditorAcNum(contractCreditorBankCode, contractCreditorAcNumBank[1]);
        contractRepository.save(contract);

        return contract;
    }
}
