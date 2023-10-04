package com.fin.billage.domain.transfer.service;


import com.fin.billage.domain.contract.entity.Contract;
import com.fin.billage.domain.contract.entity.Transaction;
import com.fin.billage.domain.contract.repository.ContractRepository;
import com.fin.billage.domain.contract.repository.TransactionRepository;
import com.fin.billage.domain.notice.entity.Notice;
import com.fin.billage.domain.notice.repository.NoticeRepository;
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
    private final NoticeRepository noticeRepository;
    private final JwtUtil jwtUtil;


    // 나의 은행 계좌 가져오기 -> 마이데이터에 요청
    public List<AccountResponseDto> searchBank(List<String> bankCodes, HttpServletRequest request) {
        Long userPk = jwtUtil.extractUserPkFromToken(request);
        User user = userRepository.findById(userPk).orElse(null);
        String userName = user.getUserName();
        String userCellNo = user.getUserCellNo();



        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();

        List<AccountResponseDto> accountResponses = new ArrayList<>();


        // Reactor에서 제공하는 비동기 시퀀스
        Flux.fromIterable(bankCodes)
                .flatMap(bankCode -> {
                    List<TransferRequestBodyDto> list = new ArrayList<>();
                    TransferRequestBodyDto dto = TransferRequestBodyDto.builder()
                            .userName(userName)
                            .userCellNo(userCellNo)
                            .bankCode(bankCode)
                            .build();
                    list.add(dto);

                    Url url = requestUrlRepository.findByRequestBankCodeAndRequestActCode(bankCode, "004");

                    // API에 요청을 보내고 응답을 Mono로 받음
                    // Mono - 비동기 및 논블로킹 코드를 구현하는 데 사용되는 핵심 타입
                    Mono<List<AccountResponseDto>> responseMono = webClient.post()
                            .uri(url.getRequestUrl()) // 엔드포인트 URL을 원하는대로 변경
                            .contentType(MediaType.APPLICATION_JSON)
                            // list를 JSON으로 변환
                            .body(BodyInserters.fromValue(list))
                            // HTTP 요청을 실행하고, 그 결과를 처리하기 위한 WebClient.ResponseSpec을 반환
                            // 이후의 체이닝 메서드는 이 ResponseSpec에서 호출
                            .retrieve()
                            // HTTP 응답 본문을 Flux로 변환. 여기서는 AccountResponseDto 클래스 형식으로 변환합니다.
                            // 즉, API 응답의 JSON 데이터를 AccountResponseDto 객체로 매핑합니다.
                            .bodyToFlux(AccountResponseDto.class)
                            // Flux의 모든 요소를 수집하여 리스트로 만듭니다.
                            .collectList();

                    return responseMono;
                })
                // 각 응답(accountResponses)을 전체 응답 리스트(accountResponses)에 추가하는 작업
                .doOnNext(accountResponses::addAll)
                // 모든 비동기 작업이 완료될 때까지 블록하고, 최종 결과를 반환합니다.
                // 이 코드에서는 모든 API 요청이 완료되고 응답이 수집된 후에 블록
                .blockLast();

        return accountResponses;
    }

    // 이체 (오픈뱅킹에 요청)
    // 일단 무조건 이체 되게 바꿔놈
    public void transferCash(TransferCashRequestDto dto, HttpServletRequest request) {
//        String actCode = "002";
//        String bankCode = dto.getTranWdBankCode();
//
////        Url url = requestUrlRepository.findByRequestBankCodeAndRequestActCode(bankCode, actCode);
//
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
//        User user = userRepository.findById(user_pk).orElse(null);
//        String userName = user.getUserName();
//        String userCellNo = user.getUserCellNo();
        Contract contract = contractRepository.findByContractId(dto.getContractId());
//
//        Transaction t = Transaction.builder()
//                                    .tranAmt(dto.getTranAmt())
//                                    .contract(contract)
//                                    .tranDp(dto.getTranDp())
//                                    .tranDpAcNum(dto.getTranDpAcNum())
//                                    .tranDpBankCode(dto.getTranDpBankCode())
//                                    .tranWd(dto.getTranWd())
//                                    .tranWdAcNum(dto.getTranWdAcNum())
//                                    .tranWdBankCode(dto.getTranWdBankCode())
//                                    .tranDate(LocalDateTime.now())
//                                    .build();
//
//        transactionRepository.save(t);
//
//        // 차용증 이체 노티에 등록
//        Notice n = Notice.builder()
//                .contractId(contract.getContractId())
//                .user(contract.getCreditorUser())
//                .noticeUserName(contract.getDebtorUser().getUserName())
//                .noticeSendDate(LocalDateTime.now())
//                .noticeAmount(dto.getTranAmt())
//                .noticeType(4)
//                .build();
//
//        noticeRepository.save(n);


        String tranWdCellNo = "";            // 지급인 핸드폰 번호
        String tranDpCellNo = "";            // 수취인 핸드폰 번호

        // 수취인이 채무자일 때
        if(dto.getTranDp().equals(contract.getDebtorUser().getUserName())) {
            tranDpCellNo = contract.getDebtorUser().getUserCellNo();
        }
        // 수취인이 채권자일 때
        if(dto.getTranDp().equals(contract.getCreditorUser().getUserName())) {
            tranDpCellNo = contract.getCreditorUser().getUserCellNo();
        }
        // 지급인이 채무자일 때
        if(contract.getDebtorUser().getUserName().equals(dto.getTranWd())) {
            tranWdCellNo = contract.getDebtorUser().getUserCellNo();
        }
        // 지급인이 채권자일 때
        if(contract.getCreditorUser().getUserName().equals(dto.getTranWd())) {
            tranWdCellNo = contract.getCreditorUser().getUserCellNo();
        }

        TransferCashOpenBankingRequestDto transferCashOpenBankingRequestDto = TransferCashOpenBankingRequestDto.builder()
                .tranDate(LocalDateTime.now())
                .tranAmt(dto.getTranAmt())
                .tranDpName(dto.getTranDp())
                .tranDpBankCode(dto.getTranDpBankCode())
                .tranDpAcNum(dto.getTranDpAcNum())
                .tranDpCellNo(tranDpCellNo)
                .tranWdName(dto.getTranWd())
                .tranWdBankCode(dto.getTranWdBankCode())
                .tranWdAcNum(dto.getTranWdAcNum())
                .tranWdCellNo(tranWdCellNo)
                .build();

        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)  // 기본 헤더 설정
                .build();
//
//        Transaction transaction = transactionRepository.findByContract(contract);

        // HTTP POST 요청 보내기
        webClient.post()
                .uri("https://j9b108.p.ssafy.io/openbank/transactions/transfer")
                .body(BodyInserters.fromValue(transferCashOpenBankingRequestDto))
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

