//package com.fin.billage.domain.loan.service;
//
//import com.fin.billage.domain.loan.dto.LoanResponseDto;
//import com.fin.billage.domain.loan.repository.LoanRepository;
//import com.fin.billage.domain.user.entity.User;
//import com.fin.billage.domain.user.repository.UserRepository;
//import com.fin.billage.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import javax.servlet.http.HttpServletRequest;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class LoanService {
//    private final LoanRepository loanRepository;
//    private final UserRepository userRepository;
//    private final JwtUtil jwtUtil;
//
//    public List<LoanResponseDto> searchLendList(HttpServletRequest request) {
//        Long user_pk = jwtUtil.extractUserPkFromToken(request);
//        User user = userRepository.findById(user_pk).orElse(null);
//
//    }
//}
