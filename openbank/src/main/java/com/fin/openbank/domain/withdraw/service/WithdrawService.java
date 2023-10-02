package com.fin.openbank.domain.withdraw.service;

import com.fin.openbank.domain.withdraw.dto.WithdrawRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WithdrawService {

    private final WebClient webClient;

    @Value("${http://localhost:3306/kb/transfer/withdraw}") // application.properties에서 출금 API의 URL을 읽어옵니다.
    private String withdrawApiUrl;

    @Autowired
    public WithdrawService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(withdrawApiUrl).build();
    }

    public boolean withdraw(WithdrawRequestDto requestDto) {
        // 출금 요청 API 호출을 통해 필요한 정보만 전달하여 처리
        return webClient.post()
                .uri("/withdraw")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(requestDto))
                .retrieve()
                .toBodilessEntity()
                .map(responseEntity -> responseEntity.getStatusCode().is2xxSuccessful())
                .block();
    }
}
