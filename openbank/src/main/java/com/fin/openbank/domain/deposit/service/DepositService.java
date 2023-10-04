package com.fin.openbank.domain.deposit.service;

import com.fin.openbank.domain.transfer.dto.TransferRequestDto;
import com.fin.openbank.domain.transfer.entity.Transaction;
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

//@Service
//@RequiredArgsConstructor
//public class DepositService {
//    private final TransactionRepository transactionRepository;
//    private final RequestUrlRepository requestUrlRepository;
//
//    public void deposit(TransferRequestDto requestDto, String dpBankCode, TransactionType deposit) {
//
//        WebClient webClient = WebClient.builder()
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
//                .build();
//
//        Url url = requestUrlRepository.findByRequestBankCodeAndTransactionType(dpBankCode, deposit);
//        // HTTP POST 요청 보내기
//        webClient.post()
//                .uri(url.getRequestUrl())
//                .body(BodyInserters.fromValue(requestDto))
//                .retrieve()
//                .bodyToMono(String.class)
//                .subscribe(
//                        responseBody -> {
//                            Transaction t = Transaction.builder()
//                                    .tranDate(requestDto.getTranDate()) // 거래 일자 및 시간
//                                    .tranAmt(requestDto.getTranAmt()) // 거래 금액
//                                    .tranWdName(requestDto.getTranWdName()) // 지급인 이름
//                                    .tranWdCellNo(requestDto.getTranWdCellNo()) // 지급인 핸드폰 번호
//                                    .tranWdBankCode(requestDto.getTranWdBankCode()) // 지급인 은행 코드
//                                    .tranWdAcNum(requestDto.getTranWdAcNum()) // 지급인 계좌 번호
//                                    .tranDpName(requestDto.getTranDpName()) // 수취인 이름
//                                    .tranDpCellNo(requestDto.getTranDpCellNo()) // 수취인 핸드폰 번호
//                                    .tranDpBankCode(requestDto.getTranDpBankCode()) // 수취인 은행 코드
//                                    .tranDpAcNum(requestDto.getTranDpAcNum()) // 수취인 계좌 번호
//                                    .build();
//                            transactionRepository.save(t);
//                        },
//                        error -> {
//                            System.out.println("이체 실패" + error.getMessage());
//                        }
//                );
//    }
//}

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

        if (success != null && success) {
            System.out.println("입금 요청 성공");
            // 출금 요청이 성공한 경우에만 Transaction 엔티티를 생성하고 저장
//            Transaction t = Transaction.builder()
//                    .tranDate(requestDto.getTranDate()) // 거래 일자 및 시간
//                    .tranAmt(requestDto.getTranAmt()) // 거래 금액
//                    .tranWdName(requestDto.getTranWdName()) // 지급인 이름
//                    .tranWdCellNo(requestDto.getTranWdCellNo()) // 지급인 핸드폰 번호
//                    .tranWdBankCode(requestDto.getTranWdBankCode()) // 지급인 은행 코드
//                    .tranWdAcNum(requestDto.getTranWdAcNum()) // 지급인 계좌 번호
//                    .tranDpName(requestDto.getTranDpName()) // 수취인 이름
//                    .tranDpCellNo(requestDto.getTranDpCellNo()) // 수취인 핸드폰 번호
//                    .tranDpBankCode(requestDto.getTranDpBankCode()) // 수취인 은행 코드
//                    .tranDpAcNum(requestDto.getTranDpAcNum()) // 수취인 계좌 번호
//                    .build();
//            transactionRepository.save(t);
        } else {
            System.out.println("입금 요청 실패");
        }

        return success != null && success;
    }
}