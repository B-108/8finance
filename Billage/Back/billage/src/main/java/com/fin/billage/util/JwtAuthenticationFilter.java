package com.fin.billage.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

// JWT 인증을 위해 생성되는 토큰
// 요청이 들어오면 헤더에서 토큰 추출하는 역할
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtUtil jwtUtil;


    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterchain) throws IOException, ServletException {
        String token = jwtUtil.resolveToken((HttpServletRequest) servletRequest);

        // 토큰 유효성 검사
        if (token != null && jwtUtil.validateToken(token)) {

            if ((((HttpServletRequest) servletRequest).getRequestURI().equals("/user/refresh"))) {
                Authentication authentication = jwtUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterchain.doFilter(servletRequest, servletResponse);
    }
}
