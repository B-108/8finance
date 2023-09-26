package com.fin.billage.domain.sms.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.sms.dto.SmsDto;
import com.fin.billage.domain.sms.dto.SmsRequestDto;
import com.fin.billage.domain.sms.dto.SmsResponseDto;
import com.fin.billage.domain.sms.dto.SmsVerifyDto;
import com.fin.billage.domain.sms.entity.Sms;
import com.fin.billage.domain.sms.repository.SmsRepository;
import com.fin.billage.domain.transfer.entity.Url;
import com.fin.billage.domain.transfer.repository.RequestUrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@PropertySource("classpath:application.yml")
@Service
@Slf4j
@RequiredArgsConstructor
public class SmsService {

    private final RequestUrlRepository requestUrlRepository;
    private final SmsRepository smsRepository;

    @Value("${naver-cloud-sms.accessKey}")
    private String accessKey;

    @Value("${naver-cloud-sms.secretKey}")
    private String secretKey;

    @Value("${naver-cloud-sms.serviceId}")
    private String serviceId;

    @Value("${naver-cloud-sms.senderPhone}")
    private String phone;

    public SmsResponseDto sendSms(SmsDto messageDto) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {

        // 현재시간
        String time = Long.toString(System.currentTimeMillis());

        // 헤더세팅
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time);
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", getSignature(time)); // signature 서명

        List<SmsDto> messages = new ArrayList<>();
        messages.add(messageDto);

        String smsConfirmNum = createSmsKey();

        // api 요청 양식에 맞춰 세팅
        SmsRequestDto request = SmsRequestDto.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(phone)
                .content("[Billage] 인증번호 [" + smsConfirmNum + "]를 입력해주세요.")
                .messages(messages)
                .build();

        //request를 json형태로 body로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);

        // body와 header을 합친다
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        //restTemplate를 통해 외부 api와 통신
        SmsResponseDto smsResponseDto = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + serviceId + "/messages"), httpBody, SmsResponseDto.class);
//        SmsResponseDto responseDto = new SmsResponseDto(smsConfirmNum);

        String phoneNumber = messageDto.getTo();
        Optional<Sms> existingSms = smsRepository.findByPhoneNumber(phoneNumber);

        if (existingSms.isPresent()) {
            smsRepository.delete(existingSms.get());
        }

        Sms sms = Sms.builder()
                        .code(smsConfirmNum)
                        .phoneNumber(messageDto.getTo())
                        .build();

        smsRepository.save(sms);

        return smsResponseDto;
    }

    // 전달하고자 하는 데이터를 암호화해주는 작업
    public String getSignature(String time) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + this.serviceId + "/messages";
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(time)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    // 5자리의 난수를 조합을 통해 인증코드 만들기
    public static String createSmsKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 5; i++) { // 인증코드 5자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    @Transactional
    public boolean verifySms(SmsVerifyDto verifyDto) {
        Optional<Sms> optionalCode = smsRepository.findByPhoneNumber(verifyDto.getPhoneNumber());

        if (optionalCode.isPresent() && verifyDto.getVerifyNumber().equals(optionalCode.get().getCode())) {
            // Optional이 존재하고, verifyNumber와 일치하는 경우
            smsRepository.deleteByCode(optionalCode.get().getCode());
            return true;
        } else {
            return false;
        }
    }

    // 마이데이터 문자 인증 보내기
    public void sendMyDataSms(SmsDto messageDto) {
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        Url url = requestUrlRepository.findRequestUrlByRequestBankCodeAndRequestActCode("101", "101");
        // HTTP POST 요청 보내기
        webClient.post()
                .uri(url.getRequestUrl())
                .body(BodyInserters.fromValue(messageDto))
                .retrieve()
                .bodyToMono(String.class)
                .subscribe(
                        responseBody -> {
                            System.out.println("문자 인증 성공");
                        },
                        error -> {
                            System.out.println("문자 인증 실패" + error.getMessage());
                        }
                );
    }

    // 마이데이터 문자 인증 검증
    public boolean verifyMyDataSms(SmsVerifyDto verifyDto) {
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        Url url = requestUrlRepository.findRequestUrlByRequestBankCodeAndRequestActCode("101", "102");
        System.out.println(url.getRequestUrl());
        try {
            // HTTP POST 요청 보내기
            String responseBody = webClient.post()
                    .uri(url.getRequestUrl())
                    .body(BodyInserters.fromValue(verifyDto))
                    .retrieve()
                    .onStatus(HttpStatus::isError, response -> Mono.error(new WebClientResponseException(response.statusCode().value(), response.statusCode().getReasonPhrase(), response.headers().asHttpHeaders(), null, null)))
                    .bodyToMono(String.class)
                    .block(); // 이 부분에서 결과를 기다립니다.

            // responseBody 변수에 API 응답 결과가 문자열로 들어갑니다.
            System.out.println("API 응답: " + responseBody);

            // 여기서 responseBody를 분석하고 필요한 작업을 수행하십시오.
            if(responseBody.equals("true")) return true;

        } catch (WebClientResponseException ex) {
            System.out.println("HTTP 요청 실패: " + ex.getRawStatusCode() + " " + ex.getStatusText());
        } catch (Exception ex) {
            System.out.println("문자 인증 실패: " + ex.getMessage());
        }
        return false;
    }
}