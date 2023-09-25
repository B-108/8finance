package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.contract.repository.TransactionRepository;
import com.fin.billage.domain.transfer.dto.*;
import com.fin.billage.domain.transfer.repository.RequestUrlRepository;
import com.fin.billage.domain.user.dto.UserSetPasswordRequestDto;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.BodyInserters;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.ObjectMapper;


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
    public class Test {
        String a = "test";

        public String getA() {
            return a;
        }
    }

//    // 사용자가 마이데이터에 동의하면 user 테이블에서 동의상태와 일시를 수정한다.
//    @Transactional
//    public User updateAgreementStatusAndDate(HttpServletRequest request, Boolean agreeYn) {
//        // 토큰에서 user_pk를 가져온다.
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
//        // 가져온 user_pk를 통해 해당 pk값에 해당하는 user객체를 가져온다.
//        User user = userRepository.findById(user_pk).orElse(null);
//
//        // 사용자가 동의를 누르고 저장한게 맞다면
//        if(agreeYn == true){
//            // 유저정보를 바탕으로 바꿔야함. modify
//            // user 엔티티의 updateAgreeYn을 통해 agreeYn에 ture를 넣어서 전달하면 userAgreeYn은 Y로 바뀐다.
//            user.modifyAgreeYn('Y');
//            userRepository.save(user);
//        }
//
//        String userName = user.getUserName();
//        String userCellNo = user.getUserCellNo();
//
//        updateBankUserAgreementStatus(userName, userCellNo, agreeYn);
//
//        return user;
//    }

//    // 요청 코드(행동)에 따라서 그 행동에 맞는 Billage DB의 request_url 테이블에서 url을 가져온다.
//    public List<String> getUrl(int actCode){
//        List<String> requestUrls = requestUrlRepository.findRequestUrlsByRequestActCode(actCode);
//        return requestUrls;
//    }

//    // 이름과 전화번호를 통해 사용자를 특정한 후 마이데이터 동의 상태를 바꿔준다.
//    public void updateBankUserAgreementStatus(String userName, String userCellNo, Boolean agreeYn) {
//        // 다른 서비스의 업데이트 엔드포인트 URL을 설정
//
//        // 마이데이터 동의 상태값 변경: 1 (이체: 2, 거래내역조회: 3, 계좌정보조회: 4)
//        // 모든 은행들의 동의 상태변경 Url 가져오기
//        List<String> updateUrls = getUrl(1);
//        // 예를들어 http://localhost:7080/KB/user/updateUser
//
//        WebClient webClient = WebClient.builder()
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
//                .build();
//
//        TransferRequestDto dto = TransferRequestDto.builder()
//                .userName(userName)
//                .userCellNo(userCellNo)
//                .agreeYn(agreeYn)
//                .build();
//
//        for (String apiUrl : updateUrls) {
//            // HTTP POST 요청 보내기
//            webClient.post()
//                    .uri(apiUrl)
//                    .body(BodyInserters.fromValue(dto))
//                    .retrieve()
//                    .bodyToMono(String.class)
//                    .subscribe(
//                            responseBody -> {
//                                System.out.println("업데이트 성공: " + responseBody);
//                            },
//                            error -> {
//                                System.out.println("업데이트 실패: " + error.getMessage());
//                            }
//                    );
//        }
//    }

    // 나의 은행 계좌 가져오기 -> 마이데이터에 요청
    public Mono<List<AccountResponseDto>> searchBank(List<AccountRequestDto> accountInfoList, HttpServletRequest request) {
        Long user_pk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(user_pk).orElse(null);
        String userName = user.getUserName();
        String userCellNo = user.getUserCellNo();

        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        // Mono<List<AccountResponseDto>>를 생성
        return Flux.fromIterable(accountInfoList)
                .flatMap(accountRequestDto -> {
                    String bankCode = accountRequestDto.getBankCode();
                    String actCode = "4";

                    // 요청코드와 은행코드를 넣어서 조건에 맞는 URL을 Billage DB의 request_url 테이블에서 가져온다.
                    String bankUrl = requestUrlRepository.findRequestUrlByRequestActCodeAndRequestBankCode(actCode, bankCode);

                    TransferSearchRequestDto dto = TransferSearchRequestDto.builder()
                            .actCode(actCode)
                            .bankCode(bankCode)
                            .userCellNo(userCellNo)
                            .userName(userName)
                            .build();

                    // HTTP POST 요청 보내기 => 은행에 요청
                    return webClient.post()
                            .uri(bankUrl)
                            .body(BodyInserters.fromValue(dto))
                            .retrieve()
                            .bodyToMono(String.class)
                            .flatMap(responseBody -> {
                                System.out.println("업데이트 성공: " + responseBody);
                                // 응답을 AccountResponseDto로 변환하고 반환
                                return Mono.just(convertResponseToDto(responseBody));
                            })
                            .onErrorResume(error -> {
                                System.out.println("업데이트 실패: " + error.getMessage());
                                return Mono.empty(); // 에러 발생 시 빈 Mono를 반환하여 계속 진행
                            });
                })
                .collectList(); // 모든 응답을 리스트로 수집
    }

    private AccountResponseDto convertResponseToDto(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(responseBody, AccountResponseDto.class);
        } catch (Exception e) {
            // 예외 처리 - JSON을 AccountResponseDto로 변환하는 데 실패했을 때 수행할 작업
            e.printStackTrace();
            return null; // 또는 에러를 로깅하고 기본 값 또는 특정 에러 값을 반환
        }
    }

    // 이체 (오픈뱅킹에 요청)
    public void transferCash(TransferCashRequestDto dto, HttpServletRequest request) {
        String actCode = "2";
        String bankCode = dto.getTranWdBankCode();

        String bankUrl = requestUrlRepository.findRequestUrlByRequestActCodeAndRequestBankCode(actCode, bankCode);

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
                .uri(bankUrl)
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

    //


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

