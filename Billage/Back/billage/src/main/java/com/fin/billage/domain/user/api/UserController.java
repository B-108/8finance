package com.fin.billage.domain.user.api;

import com.fin.billage.domain.user.dto.UserLoginRequestDto;
import com.fin.billage.domain.user.dto.UserSetPasswordRequestDto;
import com.fin.billage.domain.user.dto.UserSignUpRequestDto;
import com.fin.billage.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserSignUpRequestDto userSignUpRequestDto) {
        return new ResponseEntity(userService.signup(userSignUpRequestDto), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return new ResponseEntity<>(userService.login(userLoginRequestDto), HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        return new ResponseEntity<>(userService.logout(request), HttpStatus.OK);
    }

    @PatchMapping("/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        return new ResponseEntity<>(userService.deleteUser(request), HttpStatus.OK);
    }

    @PatchMapping("/setpassword")
    public ResponseEntity<?> modifyUser(HttpServletRequest request, @RequestBody UserSetPasswordRequestDto userSetPasswordRequestDto) {
        return new ResponseEntity<>(userService.setPassword(request, userSetPasswordRequestDto), HttpStatus.OK);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        return new ResponseEntity<>(userService.refreshToken(request), HttpStatus.OK);
    }
}
