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
  const moveMain = () => {navigate(`/main`)}
  const movePinRegister = () => {navigate(`/pinregister`)}

  const handlePinCheckChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.value.length > 2){
      event.target.value = event.target.value.slice(0,2)
      return 
    }
    if (event.target.value !== "") {
      if (event.target.value[1] === " "){ return }
      if (event.target.value[1] === undefined) { 
        setPinCheck(pinCheck.slice(0,pinCheck.length-2))
        return
      }

      if(pinCheck.length <=8 && isNaN(Number(event.target.value[1]))) {return}
      else if (pinCheck.length > 8 && !/^[a-zA-Z!@#$%^&*(),.?":{}|<>]+$/.test(event.target.value[1])) {
        return;
      }
      setPinCheck(pinCheck + event.target.value[1] + " ");
    }

    else {
      if (pinCheck.length > 1) {
        setPinCheck(pinCheck.slice(0,pinCheck.length-2))
      }
    }
    
    if (event.target.value.length === 2 && index < 4) {
      const nextInput = inputRefs[index + 1].current;
      if (nextInput) { nextInput.focus() }
    }

    else if (!event.target.value.length && index > 0 && index < 6) {
      const backInput = inputRefs[index - 1].current;
      if (backInput) { backInput.focus() }
    }

    const pinNumber = pinCheck.split(" ").join("") + event.target.value.split(" ").join("")
    
    if (pinCheck.length >= 8 && event.target.value) {
      if (pinRegister.split(" ").join("") === pinNumber){
        axiosSignUp(pinNumber)
        moveMain()
      }

      else if (pinRegister.split(" ").join("") !== pinNumber){
        movePinRegister()
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
    setPinCheck(" ")
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
          $IsValue = {pinCheck.length >= 2 ? true : false}
          value={pinCheck.length >= 1 ? pinCheck.slice(0,2) : ""}
          onChange={(event) => handlePinCheckChange(event, 0)}
        ></Input>
        <Input 
          ref={inputRefs[1]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinCheck.length >= 4 ? true : false}
          value={pinCheck.length >= 3 ? pinCheck.slice(2,4) : ""}
          onChange={(event) => handlePinCheckChange(event, 1)}
        ></Input>
        <Input 
          ref={inputRefs[2]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinCheck.length >= 6 ? true : false}
          value={pinCheck.length >= 5 ? pinCheck.slice(4,6) : ""}
          onChange={(event) => handlePinCheckChange(event, 2)}
        ></Input>
        <Input 
          ref={inputRefs[3]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinCheck.length >= 8 ? true : false}
          value={pinCheck.length >= 7 ? pinCheck.slice(6,8) : ""}
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
          $IsValue = {pinCheck.length >= 10 ? true : false}
          value={pinCheck.length >= 9 ? pinCheck.slice(8,10) : ""}
          onChange={(event) => handlePinCheckChange(event, 4)}
        ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 혹은</Text>
      <Text
        $description
        >특수기호 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinCheck;

