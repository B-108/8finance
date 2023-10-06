package com.fin.bank.userservice.domain.user.api;

import com.fin.bank.userservice.domain.user.dto.UserGetRequestDto;
import com.fin.bank.userservice.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/no")
    public ResponseEntity<?> getUserPk(@RequestBody UserGetRequestDto userGetRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(userService.getUserPk(userGetRequestDto, request), HttpStatus.OK);
    }
}
