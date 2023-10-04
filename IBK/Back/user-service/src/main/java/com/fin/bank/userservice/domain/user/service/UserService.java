package com.fin.bank.userservice.domain.user.service;

import com.fin.bank.userservice.domain.user.dto.UserGetRequestDto;
import com.fin.bank.userservice.domain.user.dto.UserGetResponseDto;
import com.fin.bank.userservice.domain.user.entity.User;
import com.fin.bank.userservice.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserGetResponseDto getUserPk(UserGetRequestDto userGetRequestDto, HttpServletRequest request) {
        User findUSer = userRepository.findByUserCellNoAndUserName(userGetRequestDto.getUserCellNo(), userGetRequestDto.getUserName()).orElseThrow(() -> new RuntimeException("없습니다"));
        return UserGetResponseDto.builder()
                .userPk(findUSer.getUserPk())
                .build();
    }
}
