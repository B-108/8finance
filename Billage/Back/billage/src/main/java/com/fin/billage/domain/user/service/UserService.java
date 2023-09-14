package com.fin.billage.domain.user.service;

import com.fin.billage.domain.user.dto.*;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtAuthenticationProvider;
import com.fin.billage.util.JwtToken;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;
    private final JwtUtil jwtUtil;

    public UserSignUpResponseDto signup(UserSignUpRequestDto userSignUpRequestDto) {
        // 폰 번호 & 이름 중복 검증 => 이미 가입한 이용자입니다.
        if (userRepository.existsByUserCellNoAndUserName(userSignUpRequestDto.getUserCellNo(), userSignUpRequestDto.getUserName())) {
            throw new RuntimeException("이미");
        }

        String encryptPassword = bCryptPasswordEncoder.encode(userSignUpRequestDto.getUserSimplePass());

        User signUpUser = userRepository.save(User.builder()
                        .userCellNo(userSignUpRequestDto.getUserCellNo())
                        .userName(userSignUpRequestDto.getUserName())
                        .userSimplePass(encryptPassword)
                        .build());

        return UserSignUpResponseDto.builder()
                .userName(userSignUpRequestDto.getUserName())
                .build();
    }

    public UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequestDto.getUserCellNo(), userLoginRequestDto.getUserSimplePass());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtUtil.createToken(authentication);

        // DB에 있는 User 정보에서 userName 가져오기
        User findUser = userRepository.findByUserCellNo(userLoginRequestDto.getUserCellNo())
                .orElseThrow(()-> new RuntimeException("없어"));


        return UserLoginResponseDto.builder()
                .jwtToken(token)
                .userName(findUser.getUserName())
                .build();
    }

    public UserLogoutResponseDto logout(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User findUserByAuthentication = userRepository.findByUserCellNo(authentication.getName())
                        .orElseThrow(() -> new RuntimeException("없어"));

        if (findUserByAuthentication.getUserPk() == jwtUtil.extractUserPkFromToken(request))
            return UserLogoutResponseDto.builder()
                    .message("로그아웃에 성공했습니다")
                    .build();

        return UserLogoutResponseDto.builder()
                .message("비정상적인 요청입니다.")
                .build();
    }
}
