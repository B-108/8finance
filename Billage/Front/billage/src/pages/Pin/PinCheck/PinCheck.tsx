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
import { InputBox } from "./PinCheck.style"

// 리코일 
import { useRecoilState } from "recoil"
import { 
  NameState, 
  PhoneState,
  PinCheckState,
  PinRegisterState, } from "/src/recoil/auth"

// 타입스크립트
import { SignUpProps } from "/src/type/auth"

// API
import { postSignUp } from "/src/api/auth"

function PinCheck () {
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [name, setName] = useRecoilState<string>(NameState);
  const [pinRegister,setPinRegister] = useRecoilState<string>(PinRegisterState)
  const [pinCheck,setPinCheck] = useRecoilState<string>(PinCheckState)
  const inputRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null));


  // 라우터 
  const navigate = useNavigate()
  const moveMain = () => {navigate(`/Main`)}

  const handlePinCheckChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.value.length > 1){
      event.target.value = event.target.value.slice(0,1)
      return 
    }
    if (event.target.value !== "") {
      if (event.target.value === " "){ return }
      setPinCheck(pinCheck + event.target.value);
    }
    else {
      setPinCheck(pinCheck.slice(0,pinCheck.length-1))
    }
    
    if (event.target.value.length === 1 && index < 4) {
      const nextInput = inputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (pinCheck.length >= 4 ) {
      if (pinRegister === pinCheck + event.target.value){
        axiosSignUp(pinCheck + event.target.value)
        moveMain()
      }

      else if (pinRegister !== pinCheck + event.target.value){
        console.log("비밀번호 확인이 틀렸을 때")
      }
    }
  };

  const axiosSignUp = async (Pin : string):Promise<void> => {
    const info: SignUpProps = {
      userCellNo: phone,
      userName: name,
      userSimplePass: Pin,
    }
    try {
      await postSignUp(info)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
    setPinCheck("")
  }, []);

  return (
    <CenteredContainer $center>
      <Text
        $pinText
        >간편 비밀번호 확인</Text>

      <InputBox>
        <Input
          ref={inputRefs[0]}
          $size="20px," 
          $simplepassword
          value={pinCheck.length >= 1 ? pinCheck[0] : ""}
          onChange={(event) => handlePinCheckChange(event, 0)}
        ></Input>
        <Input 
          ref={inputRefs[1]}
          $size="20px," 
          $simplepassword
          value={pinCheck.length >= 2 ? pinCheck[1] : ""}
          onChange={(event) => handlePinCheckChange(event, 1)}
        ></Input>
        <Input 
          ref={inputRefs[2]}
          $size="20px," 
          $simplepassword
          value={pinCheck.length >= 3 ? pinCheck[2] : ""}
          onChange={(event) => handlePinCheckChange(event, 2)}
        ></Input>
        <Input 
          ref={inputRefs[3]}
          $size="20px," 
          $simplepassword
          value={pinCheck.length >= 4 ? pinCheck[3] : ""}
          onChange={(event) => handlePinCheckChange(event, 3)}
        ></Input>
        <Image
          src={plus}
          alt="plus"
        />
        <Input 
          ref={inputRefs[4]}
          $size="20px," 
          $simplepassword
          value={pinCheck.length >= 5 ? pinCheck[4] : ""}
          onChange={(event) => handlePinCheckChange(event, 4)}
        ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinCheck;
