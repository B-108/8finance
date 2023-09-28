import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
  const inputRefs = Array.from({ length: 5 }, () => useRef<HTMLInputElement>(null));


  // 라우터 
  const { routeAction } = useParams<{ routeAction?: string}>()
  const navigate = useNavigate()
  const moveMain = () => {navigate(`/Main`)}

  const handlepinEnterChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    
    // 한칸에 2글자(공백 + 값) 제한
    if (event.target.value.length > 2){
      event.target.value = event.target.value.slice(0,2)
      return 
    }

    if (event.target.value !== "") {
      if (event.target.value[1] === " "){ return }
      if (event.target.value[1] === undefined) { 
        setPinEnter(pinEnter.slice(0,pinEnter.length-2))
        return
      }

      if(pinEnter.length <=8 && isNaN(Number(event.target.value[1]))) {return}
      else if (pinEnter.length > 8 && !/^[a-zA-Z!@#$%^&*(),.?":{}|<>]+$/.test(event.target.value[1])) {
        return;
      }
      setPinEnter(pinEnter + event.target.value[1] + " ");
    }
    
    else {
      if (pinEnter.length > 1) {
        setPinEnter(pinEnter.slice(0,pinEnter.length-2))
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
    
    if (pinEnter.length >= 8 && event.target.value) {
      if (routeAction === "login") {
        axiosLogin(pinEnter.split(" ").join("") + event.target.value.split(" ").join(""))
      }
    }
  };

  const axiosLogin = async (Pin : string):Promise<void> => {
    const info: LoginProps = {
      userCellNo: phone,
      userSimplePass: Pin,
    }
    try {
      const response = await postLogin(info)
      if (response) {moveMain()}
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
    setPinEnter(" ")
  }, []);

  return (
    <CenteredContainer $center>
      <Text
        $pinText
        >간편 비밀번호 입력</Text>

      <InputBox>
        <Input
          ref={inputRefs[0]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinEnter.length >= 2 ? true : false}
          value={pinEnter.length >= 1 ? pinEnter.slice(0,2) : ""}
          onChange={(event) => handlepinEnterChange(event, 0)}
        ></Input>
        <Input 
          ref={inputRefs[1]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinEnter.length >= 4 ? true : false}
          value={pinEnter.length >= 3 ? pinEnter.slice(2,4) : ""}
          onChange={(event) => handlepinEnterChange(event, 1)}
        ></Input>
        <Input 
          ref={inputRefs[2]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinEnter.length >= 6 ? true : false}
          value={pinEnter.length >= 5 ? pinEnter.slice(4,6) : ""}
          onChange={(event) => handlepinEnterChange(event, 2)}
        ></Input>
        <Input 
          ref={inputRefs[3]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinEnter.length >= 8 ? true : false}
          value={pinEnter.length >= 7 ? pinEnter.slice(6,8) : ""}
          onChange={(event) => handlepinEnterChange(event, 3)}
        ></Input>
        <Image
          src={plus}
          alt="plus"
        />
        <Input 
          ref={inputRefs[4]}
          $size="20px," 
          $simplepassword
          $IsValue = {pinEnter.length >= 10 ? true : false}
          value={pinEnter.length >= 9 ? pinEnter.slice(8,10) : ""}
          onChange={(event) => handlepinEnterChange(event, 4)}
        ></Input>
      </InputBox>

      <Text
        $description
        >간편 비밀번호 5자리를 입력해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinEnter;

