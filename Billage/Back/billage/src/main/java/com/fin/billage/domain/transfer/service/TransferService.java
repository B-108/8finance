package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.contract.repository.TransactionRepository;
import com.fin.billage.domain.transfer.dto.*;
import com.fin.billage.domain.transfer.entity.Url;
import com.fin.billage.domain.transfer.repository.RequestUrlRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.BodyInserters;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final UserRepository userRepository;
    private final RequestUrlRepository requestUrlRepository;
    private final ContractRepository contractRepository;
    private final TransactionRepository transactionRepository;
    private final JwtUtil jwtUtil;

    // 나의 은행 계좌 가져오기 -> 마이데이터에 요청
    public List<AccountResponseDto> searchBank(List<String> bankCodes, HttpServletRequest request) {
        Long userPk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(userPk).orElse(null);
        String userName = user.getUserName();
        String userCellNo = user.getUserCellNo();

        List<AccountResponseDto> accountResponses = new ArrayList<>();


        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();


        Flux.fromIterable(bankCodes)
                .flatMap(bankCode -> {
                    Url url = requestUrlRepository.findRequestUrlByRequestBankCodeAndRequestActCode(bankCode, "4");

                    // API에 요청을 보내고 응답을 Mono로 받음
                    TransferRequestBodyDto dto = TransferRequestBodyDto.builder()
                            .userName(userName)
                            .userCellNo(userCellNo)
                            .bankCode(bankCode)
                            .build();

                    Mono<AccountResponseDto> responseMono = webClient.post()
                            .uri(url.getRequestUrl()) // 실제 API의 엔드포인트 URL로 변경
                            .body(BodyInserters.fromValue(dto))
                            .retrieve()
                            .bodyToMono(AccountResponseDto.class);
                    return responseMono;
                })
                .doOnNext(accountResponses::add) // 각 응답을 리스트에 추가
                .blockLast(); // 모든 요청이 완료될 때까지 블록

        return accountResponses;
    }

    // 이체 (오픈뱅킹에 요청)
    public void transferCash(TransferCashRequestDto dto, HttpServletRequest request) {
        String actCode = "2";
        String bankCode = dto.getTranWdBankCode();

        Url url = requestUrlRepository.findRequestUrlByRequestBankCodeAndRequestActCode(bankCode, actCode);

        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);
        String userName = user.getUserName();
        String userCellNo = user.getUserCellNo();
        Contract contract = contractRepository.findByContractId(dto.getContractId());

        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();
//
//        Transaction transaction = transactionRepository.findByContract(contract);

        // HTTP POST 요청 보내기
        webClient.post()
                .uri(url.getRequestUrl())
                .body(BodyInserters.fromValue(dto))
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(
                        responseBody -> {
                            Transaction t = Transaction.builder()
                                    .tranAmt(dto.getTranAmt())
                                    .contract(contract)
                                    .tranDp(dto.getTranDp())
                                    .tranDpAcNum(dto.getTranDpAcNum())
                                    .tranDpBankCode(dto.getTranDpBankCode())
                                    .tranWd(dto.getTranWd())
                                    .tranWdAcNum(dto.getTranWdAcNum())
                                    .tranWdBankCode(dto.getTranWdBankCode())
                                    .tranDate(LocalDateTime.now())
                                    .build();

                            transactionRepository.save(t);
                        },
                        error -> {
                            System.out.println("이체 실패" + error.getMessage());
                        }
                );
    }

    public class Test {
        String a = "test";

        public String getA() {
            return a;
        }
    }

    public void test() {
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        // HTTP POST 요청 보내기
        webClient.post()
                .uri("http://localhost:8088/")
                .body(BodyInserters.fromValue(new Test()))
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(
                        responseBody -> {
                            System.out.println("업데이트 성공: " + responseBody);
                        },
                        error -> {
                            System.out.println("업데이트 실패: " + error.getMessage());
                        }
                );
    }
}

