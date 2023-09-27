import { useState, useEffect, useRef } from "react"

import { useNavigate } from "react-router-dom"

// 이미지
import plus from "/src/assets/plus.svg"

// 재사용 컴포넌트
import CenteredContainer from "/src/components/Common/CenterAlign"
import Text from "/src/components/Common/Text"
import Image from "/src/components/Common/Image"
import Input from "/src/components/Common/Input"

// 스타일 컴포넌트  
import {
  InputBox } from "./PinRegister.style"

// 리코일 
import { useRecoilState } from "recoil"
import { 
  NameState, 
  PhoneState, 
  PinRegisterState} from "/src/recoil/auth"

// 타입스크립트

// API

function PinRegister () {
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [name, setName] = useRecoilState<string>(NameState);
  const [pinRegister,setPinRegister] = useRecoilState<string>(PinRegisterState)
  const inputRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null));

  // 라우터 
  const navigate = useNavigate()
  const movePinCheck = () => {navigate(`/pincheck`)}

  const handlepinRegisterChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.value.length > 1){
      event.target.value = event.target.value.slice(0,1)
      return 
    }
    if (event.target.value !== "") {
      if (event.target.value === " "){ return }
      setPinRegister(pinRegister + event.target.value);
    }
    else {
      setPinRegister(pinRegister.slice(0,pinRegister.length-1))
    }

    if (event.target.value.length === 1 && index < 4) {
      const nextInput = inputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    if (pinRegister.length >= 4) {
      movePinCheck()
    }
  };

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  return (
    <CenteredContainer $center>
      <Text
        $pinText
        >간편 비밀번호 등록</Text>

      <InputBox>
        <Input
          ref={inputRefs[0]}
          $size="20px," 
          $simplepassword
          value={pinRegister.length >= 1 ? pinRegister[0] : ""}
          onChange={(event) => handlepinRegisterChange(event, 0)}
        ></Input>
        <Input 
          ref={inputRefs[1]}
          $size="20px," 
          $simplepassword
          value={pinRegister.length >= 2 ? pinRegister[1] : ""}
          onChange={(event) => handlepinRegisterChange(event, 1)}
        ></Input>
        <Input 
          ref={inputRefs[2]}
          $size="20px," 
          $simplepassword
          value={pinRegister.length >= 3 ? pinRegister[2] : ""}
          onChange={(event) => handlepinRegisterChange(event, 2)}
        ></Input>
        <Input 
          ref={inputRefs[3]}
          $size="20px," 
          $simplepassword
          value={pinRegister.length >= 4 ? pinRegister[3] : ""}
          onChange={(event) => handlepinRegisterChange(event, 3)}
        ></Input>
        <Image
          src={plus}
          alt="plus"
        />
        <Input 
          ref={inputRefs[4]}
          $size="20px," 
          $simplepassword
          value={pinRegister.length >= 5 ? pinRegister[4] : ""}
          onChange={(event) => handlepinRegisterChange(event, 4)}
        ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinRegister;

