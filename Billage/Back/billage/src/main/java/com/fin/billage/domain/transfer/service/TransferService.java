package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.transfer.repository.RequestUrlRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final RequestUrlRepository requestUrlRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public User updateAgreementStatusAndDate(HttpServletRequest request, Boolean agreeYn) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);

        if(agreeYn == true){ // 유저정보를 바탕으로 바꿔야함. update
            user.updataAgreeYn(agreeYn);
            userRepository.save(user);
        }

        updateBankUserAgreementStatus(user.getUserName(), user.getUserCellNo(), agreeYn);

        return user;
    }

    public List<String> getUrl(int actCode){
        List<String> requestUrls = requestUrlRepository.findRequestUrlsByRequestActCode(actCode);
        return requestUrls;
    }

    public void updateBankUserAgreementStatus(String userUsername, String userCellNo, Boolean agreeYn) {
        // 다른 서비스의 업데이트 엔드포인트 URL을 설정

        // 마이데이터 동의 상태값 변경: 1 (이체: 2, 조회: 3)
        List<String> updateUrls = getUrl(1);


//        // HTTP 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // HTTP 요청 본문에 전달할 데이터 생성
//        // 여기서는 사용자 이름(userUsername), 휴대전화번호(userCellNo), 동의 여부(agreeYn)를 JSON으로 전달합니다.
//        String requestBody = "{"
//                + "\"username\": \"" + userUsername + "\","
//                + "\"cellNo\": \"" + userCellNo + "\","
//                + "\"agreeYn\": " + agreeYn
//                + "}";
//
//        // HTTP 요청 엔티티 생성
//        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        // HTTP PATCH 요청 보내기
//        ResponseEntity<String> response = restTemplate.exchange(updateUrl, HttpMethod.PATCH, requestEntity, String.class);
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            // 업데이트 성공
//            String responseBody = response.getBody();
//            // 응답 데이터 처리
//        } else {
//            // 업데이트 실패
//            // 오류 처리
//        }
    }
}

