package com.fin.bank.userservice.domain.user.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/name")
    public ResponseEntity<?> getUerName(HttpServletRequest request) {
        System.out.println("request : " + request);
        System.out.println("request.toSring : " + request.toString() );
        System.out.println("request.getHeader : " + request.getHeader("Authorization"));
        System.out.println("request.getRequestURI : " + request.getRequestURI());
        System.out.println(request.getHeader("userPk"));
        System.out.println(request.getHeader("accountNo"));

        return new ResponseEntity("123", HttpStatus.OK);
    }
}
