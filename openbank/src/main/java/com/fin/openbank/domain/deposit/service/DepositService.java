package com.fin.openbank.domain.deposit.service;

import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.entity.Url;
import com.fin.openbank.domain.transfer.enums.TransactionType;
import com.fin.openbank.domain.transfer.repository.RequestUrlRepository;
import com.fin.openbank.domain.transfer.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class DepositService {
    private final TransactionRepository transactionRepository;
    private final RequestUrlRepository requestUrlRepository;

    public boolean deposit(TransferRequestDto requestDto, String dpBankCode, TransactionType deposit) {

        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        Url url = requestUrlRepository.findByRequestBankCodeAndTransactionType(dpBankCode, deposit);

        // HTTP POST 요청 보내기
        Boolean success = webClient.post()
                .uri(url.getRequestUrl())
                .body(BodyInserters.fromValue(requestDto))
                .retrieve()
                .bodyToMono(Boolean.class) // 결과를 Boolean으로 변환
                .block(); // 비동기 호출을 동기적으로 기다림
        System.out.println("success 상태" + success);
        if (success != null && success) {
            System.out.println("입금 요청 성공");
            // 출금 요청이 성공한 경우에만 Transaction 엔티티를 생성하고 저장
        } else {
            System.out.println("입금 요청 실패");
        }

        return success != null && success;
    }
}