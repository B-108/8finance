package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.transfer.dto.AccountRequestDto;
import com.fin.billage.domain.transfer.dto.AccountResponseDto;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final RequestUrlRepository requestUrlRepository;
    private final JwtUtil jwtUtil;

    // 사용자가 마이데이터에 동의하면 user 테이블에서 동의상태와 일시를 수정한다.
    @Transactional
    public User updateAgreementStatusAndDate(HttpServletRequest request, Boolean agreeYn) {
        // 토큰에서 user_pk를 가져온다.
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        // 가져온 user_pk를 통해 해당 pk값에 해당하는 user객체를 가져온다.
        User user = userRepository.findById(user_pk).orElse(null);

        // 사용자가 동의를 누르고 저장한게 맞다면
        if(agreeYn == true){
            // 유저정보를 바탕으로 바꿔야함. modify
            // user 엔티티의 updateAgreeYn을 통해 agreeYn에 ture를 넣어서 전달하면 userAgreeYn은 Y로 바뀐다.
            user.modifyAgreeYn('Y');
            userRepository.save(user);
        }

        updateBankUserAgreementStatus(user.getUserName(), user.getUserCellNo(), agreeYn);

        return user;
    }

    // 요청 코드(행동)에 따라서 그 행동에 맞는 Billage DB의 request_url 테이블에서 url을 가져온다.
    public List<String> getUrl(int actCode){
        List<String> requestUrls = requestUrlRepository.findRequestUrlsByRequestActCode(actCode);
        return requestUrls;
    }

    // 이름과 전화번호를 통해 사용자를 특정한 후 마이데이터 동의 상태를 바꿔준다.
    public void updateBankUserAgreementStatus(String userUsername, String userCellNo, Boolean agreeYn) {
        // 다른 서비스의 업데이트 엔드포인트 URL을 설정

        // 마이데이터 동의 상태값 변경: 1 (이체: 2, 거래내역조회: 3, 계좌정보조회: 4)
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

    public List<AccountResponseDto> searchBank(List<AccountRequestDto> accountInfoList, HttpServletRequest request) {
        // 토큰에서 user_pk를 가져온다.
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        // 가져온 user_pk를 통해 해당 pk값에 해당하는 user객체를 가져온다.
        User user = userRepository.findById(user_pk).orElse(null);

        List<AccountResponseDto> accountResponseDtoList = new ArrayList<>();

        for (AccountRequestDto accountRequestDto : accountInfoList) {
            String bankCode = accountRequestDto.getBankCode();
            String actCode = "4";

            // 요청코드와 은행코드를 넣어서 조건에 맞는 url을 Billage DB의 request_url 테이블에서 가져온다.
            String banKUrl = requestUrlRepository.findRequestUrlByRequestActCodeAndRequestBankCode(actCode, bankCode);

            // RestTemplate 생성
            RestTemplate restTemplate = new RestTemplate();

            // HTTP 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // HTTP 요청 본문 데이터 설정
            String jsonBody = "{\"userUsername\": \"" + userUsername + "\", \"userCellNo\": \"" + userCellNo + "\", \"agreeYn\": " + agreeYn + "}";
            HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

            // HTTP POST 요청 보내기 => 은행에 요청
            // requestEntity는 요청 본문 데이터와 헤더를 포함하는 객체입니다. String.class는 응답 데이터의 형식을 나타냅니다.
            // 이 코드는 HTTP POST 요청을 보내고 그에 대한 응답을 responseEntity 변수에 저장합니다.
            ResponseEntity<List<AccountResponseDto>> responseEntity = restTemplate.postForEntity(banKUrl, requestEntity);

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


        return accountResponseDtoList;
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

