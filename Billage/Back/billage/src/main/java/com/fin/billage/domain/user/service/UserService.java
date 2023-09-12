package com.fin.billage.domain.user.service;

import com.fin.billage.domain.user.dto.UserSignUpRequestDto;
import com.fin.billage.domain.user.dto.UserSignUpResponseDto;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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
}
