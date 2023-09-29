package com.fin.mydata.domain.log.service;

import com.fin.mydata.domain.log.dto.AccountRequestDto;
import com.fin.mydata.domain.log.dto.AccountResponseDto;
import com.fin.mydata.domain.log.entity.Log;
import com.fin.mydata.domain.log.entity.RequestUrl;
import com.fin.mydata.domain.log.repository.LogRepository;
import com.fin.mydata.domain.log.repository.RequestUrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;
    private final RequestUrlRepository requestUrlRepository;

    // 나의 은행 계좌 가져오기 -> 은행 요청
    public List<AccountResponseDto> searchBank(List<AccountRequestDto> requestList) {
        List<AccountResponseDto> accountResponses = new ArrayList<>();

        // 마이데이터 DB에 요청 저장
        if (!requestList.isEmpty()) {
            AccountRequestDto firstRequest = requestList.get(0);
            Log log = Log.builder()
                    .logDate(LocalDateTime.now())
                    .logCellNo(firstRequest.getUserCellNo())
                    .logServiceName("billage")
                    .logRequest("2")
                    .logUserName(firstRequest.getUserName())
                    .build();

            logRepository.save(log);
        }

        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        Flux.fromIterable(requestList)
                .flatMap(request -> {
                    List<AccountRequestDto> list = new ArrayList<>();
                    list.add(request);
                    RequestUrl requestUrl = requestUrlRepository.findByRequestBankCodeAndRequestActCode(request.getBankCode(), "004");

                    // API에 요청을 보내고 응답을 Mono로 받음
                    Mono<List<AccountResponseDto>> responseMono = webClient.post()
                            .uri(requestUrl.getRequestUrl()) // 엔드포인트 URL을 원하는대로 변경
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(BodyInserters.fromValue(list))
                            .retrieve()
                            .bodyToFlux(AccountResponseDto.class)
                            .collectList();

                    return responseMono;
                })
                .doOnNext(accountResponses::addAll) // 각 응답을 리스트에 추가
                .blockLast(); // 모든 요청이 완료될 때까지 블록

        return accountResponses;
    }
}

