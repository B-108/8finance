import { useState } from "react"

// 이미지
import plus from "/src/assets/plus.svg"

// 재사용 컴포넌트
import CenteredContainer from "/src/components/Common/CenterAlign"
import Text from "/src/components/Common/Text"
import Image from "/src/components/Common/Image"
import Input from "/src/components/Common/Input"

// 스타일 컴포넌트  
import { InputBox } from "./PinEnter.style"

// 리코일 
import { useRecoilState } from "recoil"
import { 
  PhoneState,
  PinEnterState } from "/src/recoil/auth"
  
// 타입스크립트
import { LoginProps } from "/src/type/auth"

// API
import { postLogin } from "/src/api/auth"


// 로그인, 돈이체(빌려, 갚아), 계좌등록

function PinEnter () {
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [pinEnter,setPinEnter] = useRecoilState<string>(PinEnterState)

  const handlepinEnterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1){
      event.target.value = event.target.value.slice(0,1)
      return 
    }
    if (event.target.value !== "") {
      setPinEnter(pinEnter + event.target.value);
    }
    else {
      setPinEnter(pinEnter.slice(0,pinEnter.length-1))
    }
    console.log(`Pin : ${pinEnter}`)
    
    if (pinEnter.length >= 4 ) {
      console.log("비밀번호 5자리 입력 들어오면",pinEnter + event.target.value)
      axiosLogin(pinEnter + event.target.value)
    }
  };

  const axiosLogin = async (Pin : string):Promise<void> => {
    const user: LoginProps = {
      userCellNo: phone,
      userSimplePass: Pin,
    }
    try {
      await postLogin(user)
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <CenteredContainer $center>
      <Text
        $pinText
        >간편 비밀번호 입력</Text>

      <InputBox>
        <Input
          $size="20px,20px" 
          $simplepassword
          value={pinEnter.length >= 1 ? pinEnter[0] : ""}
          onChange={handlepinEnterChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinEnter.length >= 2 ? pinEnter[1] : ""}
          onChange={handlepinEnterChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinEnter.length >= 3 ? pinEnter[2] : ""}
          onChange={handlepinEnterChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinEnter.length >= 4 ? pinEnter[3] : ""}
          onChange={handlepinEnterChange}
          ></Input>
        <Image
          src={plus}
          alt="plus"></Image>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinEnter.length >= 5 ? pinEnter[4] : ""}
          onChange={handlepinEnterChange}
          ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinEnter;

