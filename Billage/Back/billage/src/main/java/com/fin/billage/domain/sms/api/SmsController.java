package com.fin.billage.domain.sms.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fin.billage.domain.sms.dto.SmsDto;
import com.fin.billage.domain.sms.dto.SmsResponseDto;
import com.fin.billage.domain.sms.dto.SmsVerifyDto;
import com.fin.billage.domain.sms.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SmsController {
    private final SmsService smsService;

    // 문자인증 보내기
    @PostMapping
    public SmsResponseDto sendSms(@RequestBody SmsDto messageDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        SmsResponseDto responseDto = smsService.sendSms(messageDto);
        return responseDto;
    }

    // 문자인증
    @PostMapping("/verify")
    public ResponseEntity<Void> verifySms(@RequestBody SmsVerifyDto verifyDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {

        boolean isSmsVerified = smsService.verifySms(verifyDto);

        if (isSmsVerified) {
            // 성공한 경우 200 OK 반환
            return ResponseEntity.ok().build();
        } else {
            // 실패한 경우 400 Bad Request 반환
            return ResponseEntity.badRequest().build();
        }
    }

    // 마이데이터 문자 인증 보내기
    @PostMapping("/myData")
    public void sendMyDataSms(@RequestBody SmsDto messageDto) {
        smsService.sendMyDataSms(messageDto);
    }

    // 마이데이터 문자 인증
    @PostMapping("/myData/verify")
    public ResponseEntity<Void> verifyMyDataSms(@RequestBody SmsVerifyDto verifyDto) {

        boolean isSmsVerified = smsService.verifyMyDataSms(verifyDto);

        if (isSmsVerified) {
            // 성공한 경우 200 OK 반환
            return ResponseEntity.ok().build();
        } else {
            // 실패한 경우 400 Bad Request 반환
            return ResponseEntity.badRequest().build();
        }
    }
}
