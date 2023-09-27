package com.fin.bank.userservice.domain.user.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/name")
    public ResponseEntity<?> getUerName() {
        return new ResponseEntity("123", HttpStatus.OK);
    }
}
