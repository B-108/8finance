package com.fin.billage.domain.contract.repository;

import com.fin.billage.domain.contract.dto.ContractLoanDetailResponseDto;
import com.fin.billage.domain.contract.dto.ContractLoanResponseDto;
import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findAllByDebtorUser(User user);

    List<Contract> findAllByCreditorUser(User user);

    Contract findByContractId(Long contractId);
}
