package com.fin.billage.domain.user.service;

import com.fin.billage.domain.user.dto.UserLoginRequestDto;
import com.fin.billage.domain.user.dto.UserLoginResponseDto;
import com.fin.billage.domain.user.dto.UserSignUpRequestDto;
import com.fin.billage.domain.user.dto.UserSignUpResponseDto;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtAuthenticationProvider;
import com.fin.billage.util.JwtToken;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

        return new UserSignUpResponseDto(userSignUpRequestDto.getUserName());
    }

    public UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginRequestDto.getUserCellNo(), userLoginRequestDto.getUserSimplePass());

        Authentication authentication = jwtAuthenticationProvider.authenticate(authenticationToken);

        JwtToken token = jwtUtil.createToken(authentication);

        // DB에 있는 User 정보에서 userName 가져오기
//        User findUser = userRepository.findByUserEmail(userLoginRequest.getUserEmail())
//                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        return null;
    }
}
