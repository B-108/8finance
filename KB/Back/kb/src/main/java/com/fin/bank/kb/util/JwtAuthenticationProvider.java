package com.fin.bank.kb.util;

import com.fin.bank.kb.domain.user.entity.User;
import com.fin.bank.kb.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${8fin.authentication.scope}")
    private String tokenScope;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        User findUser = userRepository.findByUserCellNo(authentication.getName())
                .orElseThrow(()-> new RuntimeException("없어 이런 놈들"));

        /*
        로그인이 안될 경우
        1. 아이디가 틀렸을 때
        2. 비밀번호를 틀렸을 때
        3. 회원가입을 안했을 때 & 탈퇴한 아이디일 때 => 회원 정보가 없을 때
         */
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (!bCryptPasswordEncoder.matches((String) authentication.getCredentials(), findUser.getUserSimplePass()) // 비밀번호 불일치하거나
                || findUser.getUserDeleteDate() != null) {// 삭제한 날짜가 있다면 => 탈퇴한 회원이거나
            throw new RuntimeException("아이디 또는 비밀번호를 확인하세요");
        }

        // 권한 부여
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(tokenScope));

        return new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), findUser.getUserPk(), authorities);
    }

    // support를 먼저 보고 false면 authenticate 호출 안함
    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
