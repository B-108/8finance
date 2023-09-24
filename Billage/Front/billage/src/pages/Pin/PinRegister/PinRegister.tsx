import { useState } from "react"
import { useNavigate } from "react-router-dom"

// 이미지
import plus from "/src/assets/plus.svg"

// 재사용 컴포넌트
import CenteredContainer from "/src/components/Common/CenterAlign"
import Text from "/src/components/Common/Text"
import Image from "/src/components/Common/Image"
import Input from "/src/components/Common/Input"

// 스타일 컴포넌트  
import { InputBox } from "./PinRegister.style"

// 리코일 
import { useRecoilState } from "recoil"
import { 
  NameState, 
  PhoneState, 
  PinNumberState } from "/src/recoil/auth"

// 타입스크립트
import { SignUpProps } from "/src/type/auth"

// API

function PinRegister () {
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [name, setName] = useRecoilState<string>(NameState);
  const [pinNumber,setPinNumber] = useRecoilState<string>(PinNumberState)
  
  // 라우터 
  const navigate = useNavigate()
  const movePinCheck = () => {navigate(`/pincheck`)}

  const handlePinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 1){
      event.target.value = event.target.value.slice(0,1)
      return 
    }
    if (event.target.value !== "") {
      setPinNumber(pinNumber + event.target.value);
    }
    else {
      setPinNumber(pinNumber.slice(0,pinNumber.length-1))
    }
    console.log(`Pin : ${pinNumber}`)
    
    if (pinNumber.length >= 4) {
      movePinCheck()
    }
  };

  return (
    <CenteredContainer $center>
      <Text
        $pinText
        >간편 비밀번호 등록</Text>

      <InputBox>
        <Input
          $size="20px,20px" 
          $simplepassword
          value={pinNumber.length >= 1 ? pinNumber[0] : ""}
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinNumber.length >= 2 ? pinNumber[1] : ""}
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinNumber.length >= 3 ? pinNumber[2] : ""}
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinNumber.length >= 4 ? pinNumber[3] : ""}
          onChange={handlePinNumberChange}
          ></Input>
        <Image
          src={plus}
          alt="plus"></Image>
        <Input 
          $size="20px,20px" 
          $simplepassword
          value={pinNumber.length >= 5 ? pinNumber[4] : ""}
          onChange={handlePinNumberChange}
          ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinRegister;

