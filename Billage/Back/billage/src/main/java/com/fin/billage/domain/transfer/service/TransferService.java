package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.transfer.repository.RequestUrlRepository;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
            user.updateAgreeYn(agreeYn);
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
        // 모든 은행들의 동의 상태변경 Url 가져오기
        List<String> updateUrls = getUrl(1);
        // 예를들어 http://localhost:7080/KB/user/updateUser

        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 본문 데이터 설정
        String jsonBody = "{\"userUsername\": \"" + userUsername + "\", \"userCellNo\": \"" + userCellNo + "\", \"agreeYn\": " + agreeYn + "}";
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        // HTTP POST 요청 보내기
        for (String apiUrl : updateUrls) {
            // requestEntity는 요청 본문 데이터와 헤더를 포함하는 객체입니다. String.class는 응답 데이터의 형식을 나타냅니다.
            // 이 코드는 HTTP POST 요청을 보내고 그에 대한 응답을 responseEntity 변수에 저장합니다.
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(apiUrl, requestEntity, String.class);
            // 응답 처리
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                // 성공적인 응답 처리
                String responseBody = responseEntity.getBody();
                System.out.println("업데이트 성공: " + responseBody);
            } else {
                // 오류 응답 처리
                System.out.println("업데이트 실패: " + responseEntity.getStatusCode());
            }
        }
    }
}

// Bank 프로젝트에서 받을 때 예시코드
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/KB/user")
//public class UserController {
//
//    @PostMapping("/updateUser")
//    public String updateUser(@RequestBody UserUpdateRequest request) {
//        // 받은 데이터 처리
//        String username = request.getUserUsername();
//        String cellNo = request.getUserCellNo();
//        Boolean agreeYn = request.getAgreeYn();
//
//        // 원하는 로직을 수행
//        // 예를 들어, 데이터베이스 업데이트 등
//
//        return "업데이트가 성공적으로 수행되었습니다.";
//    }
//}
//public class UserUpdateRequest {
//    private String userUsername;
//    private String userCellNo;
//    private Boolean agreeYn;
//
//}

