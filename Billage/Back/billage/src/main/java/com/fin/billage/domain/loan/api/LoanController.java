//package com.fin.billage.domain.loan.api;
//
//import com.fin.billage.domain.loan.dto.LoanResponseDto;
//import com.fin.billage.domain.loan.repository.LoanRepository;
//import com.fin.billage.domain.loan.service.LoanService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/loan")
//public class LoanController {
//
//    private final LoanService loanService;
//    // 내가 채권자면 빌려준 목록이고
//    // 내가 채무자면 빌려준 목록
//
//    // 빌려준 거래 조회
//    @GetMapping("/lend")
//    public ResponseEntity<List<LoanResponseDto>> searchLendList(HttpServletRequest request) {
//        List<LoanResponseDto> loanResponseDtoList = loanService.searchLendList(request);
//        return new ResponseEntity<>(loanResponseDtoList, HttpStatus.OK);
//    }
//    // 빌린 거래 조회
//}