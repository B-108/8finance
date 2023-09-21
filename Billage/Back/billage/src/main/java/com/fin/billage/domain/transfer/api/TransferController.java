package com.fin.billage.domain.transfer.api;

import com.fin.billage.domain.transfer.service.TransferService;
import com.fin.billage.domain.user.entity.User;
import com.fin.billage.domain.user.repository.UserRepository;
import com.fin.billage.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TransferController {

    private final TransferService transferService;


    // [이체] 사용자가 마이데이터 동의해서 유저 테이블의 동의상태를 동의로 변경하고 동의일시를 설정합니다.
    @PatchMapping("/mydata/agree/{agreeYn}")
    public ResponseEntity<User> updateAgreeYN(HttpServletRequest request, @PathVariable Boolean agreeYn) {
        // 현재 시간을 가져옵니다.
        // 사용자 동의 상태를 업데이트하고 동의일시를 설정하는 서비스 메소드를 호출합니다.
        User updatedUser = transferService.updateAgreementStatusAndDate(request, agreeYn);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            // 업데이트 실패 시 처리합니다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // 레스트 템플릿을 이용한다.
        // 토큰에서 user_pk를 가지고 와서
        // api에 넣어서 모든 은행에게 전달한다.

    }

    // 이 동의했다는 사실을 은행과 마이데이터에게 전달해야한다.

    // 은행에게 전달하는 경우에
    // 은행의 "동의 내용 전달 api" 에 어떤 유저인지 유저 일련련호를 담아서 쏜다.
//    @PostMapping(/{user_seq_no})


    // 마이데이터에게 전달하는 경우에
    // 마이데이터의 "동의 내용 전달 api"에 어떤 유저인지 유저 일련번호를 담아서 쏜다.

    //

    // 사용자가 '계좌 불러오기'를 눌러서 은행 선택 화면으로 넘어간다.
    // -> 이부분은 백에서 할 필요가 없고 프론트에서 리다이렉트를 하면 된다.

    // 화면단에서 고객이 은행 여러개를 선택하고 다음 버튼을 누른다.
    // 다음 버튼을 눌렀을때 동작하는 api가 있어야한다.
    // 은행 코드와 유저 정보를 합쳐서 은행으로 요청해서 정보를 받아오는 api가 있어야한다.

    // 따라서 백에서 고객이 선택한 은행 정보를 받아오는 api가 있어야한다.
}
