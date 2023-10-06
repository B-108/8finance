package com.fin.mydata.domain.log.api;

import com.fin.mydata.domain.log.dto.AccountRequestDto;
import com.fin.mydata.domain.log.dto.AccountResponseDto;
import com.fin.mydata.domain.log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myData")
public class LogController {

    private final LogService logService;

    // 계좌 불러오기 (은행으로 요청)
    @PostMapping("/getBank")
    public ResponseEntity<List<AccountResponseDto>> searchBank(@RequestBody List<AccountRequestDto> list) {
        List<AccountResponseDto> accountResponseDtoList = logService.searchBank(list);
        return new ResponseEntity<>(accountResponseDtoList, HttpStatus.OK);
    }


}
