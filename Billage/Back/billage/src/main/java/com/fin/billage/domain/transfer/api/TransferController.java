//package com.fin.billage.domain.transfer.api;
//
//import com.fin.billage.domain.transfer.dto.AccountRequestDto;
//import com.fin.billage.domain.transfer.dto.AccountResponseDto;
//import com.fin.billage.domain.transfer.service.TransferService;
//import com.fin.billage.domain.user.entity.User;
//import com.fin.billage.domain.user.repository.UserRepository;
//import com.fin.billage.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpRequest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletRequest;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/transfer")
//public class TransferController {
//
//    private final TransferService transferService;
//
//
//    // [이체] 사용자가 마이데이터 동의해서 유저 테이블의 동의상태를 동의로 변경하고 동의일시를 설정합니다.
//    // 이 동의했다는 사실을 은행과 마이데이터에게 전달해야한다.
//    @PatchMapping("/mydata/agree/{agreeYn}")
//    public ResponseEntity<User> updateAgreeYN(HttpServletRequest request, @PathVariable Boolean agreeYn) {
//        // 현재 시간을 가져옵니다.
//        // 사용자 동의 상태를 업데이트하고 동의일시를 설정하는 서비스 메소드를 호출합니다.
//        User updatedUser = transferService.updateAgreementStatusAndDate(request, agreeYn);
//
//        if (updatedUser != null) {
//            return ResponseEntity.ok(updatedUser);
//        } else {
//            // 업데이트 실패 시 처리합니다.
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    // 마이데이터 동의
//    // 모든 은행의 목록을 가지고 와(기업, 국민, 신한, ...) => 프론트에서 진행
//
//    // 은행을 여러개 선택해
//    // '계좌 불러오기' 버튼을 눌러
//    // 선택한 은행의 사용자의 계좌 목록을 보여줘
//    @PostMapping("/selectBankList")
//    public ResponseEntity<List<AccountResponseDto>> searchBank(@RequestBody List<AccountRequestDto> list, HttpServletRequest request) {
//        List<AccountResponseDto> accountResponseDtoList = transferService.searchBank(list, request);
//        return new ResponseEntity<>(accountResponseDtoList, HttpStatus.OK);
//    }
//
//
//    // 그 다음에 등록을 원하는 계좌를 선택해
//
//
//
//    // 화면단에서 시중 모든 은행 중에서 고객이 계좌 등록을 원하는 은행을 몇개 선택한다.
//    // 이후 '연결하기' 버튼을 누른다.
//
//    // '연결하기' 버튼을 누르면 선택한 은행의 해당 고객의 계좌목록을 가져와 화면에 다시 보여준다.
//    // 고객은 등록하고 싶은 계좌 몇개를 선택하고 '등록하기'를 누른다.
//
//
//
//    // 사용자가 '계좌 불러오기'를 눌러서 은행 선택 화면으로 넘어간다.
//    // -> 이부분은 백에서 할 필요가 없고 프론트에서 리다이렉트를 하면 된다.
//
//
//    // 프론트로부터 선택된 은행 목록을 가져와서
//    //
//    // 동시에 각 은행(외부 컨테이너)에게 계좌 목록을 요청하는 api
//
//    // 받아온
//
//    // 화면단에서 고객이 은행 여러개를 선택하고 다음 버튼을 누른다.
//    // 다음 버튼을 눌렀을때 동작하는 api가 있어야한다.
//    // 은행 코드와 유저 정보를 합쳐서 은행으로 요청해서 정보를 받아오는 api가 있어야한다.
//
//    // 따라서 백에서 고객이 선택한 은행 정보를 받아오는 api가 있어야한다.
//}
