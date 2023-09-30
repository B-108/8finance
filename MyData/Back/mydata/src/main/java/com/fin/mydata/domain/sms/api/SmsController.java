package com.fin.mydata.domain.sms.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fin.mydata.domain.sms.dto.SmsDto;
import com.fin.mydata.domain.sms.dto.SmsVerifyDto;
import com.fin.mydata.domain.sms.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SmsController {
    private final SmsService smsService;

    // 문자인증 보내기
    @PostMapping
    public void sendSms(@RequestBody SmsDto messageDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        try {
            smsService.sendSms(messageDto);;
            // 이후의 로직 처리
        } catch (Exception e) {
            e.printStackTrace(); // 예외 메시지 출력
        }
    }

    // 문자인증
    @PostMapping("/verify")
    public ResponseEntity<String> verifySms(@RequestBody SmsVerifyDto verifyDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {

        boolean isSmsVerified = smsService.verifySms(verifyDto);

        if (isSmsVerified) {
            // 성공한 경우 true 반환
            return new ResponseEntity<>("true", HttpStatus.OK);
        } else {
            // 실패한 경우 false 반환
            return new ResponseEntity<>("false", HttpStatus.BAD_REQUEST);
        }
    }
}
