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
    if (event.target.value.length > 1){
      event.target.value = event.target.value.slice(0,1)
      return 
    }

    if (event.target.value !== "") {
      if (event.target.value === " "){ return }
      setPinEnter(pinEnter + event.target.value);
    }

    else {
      console.log("back")
      setPinEnter(pinEnter.slice(0,pinEnter.length-1))
    }

    if (event.target.value.length === 1 && index < 4) {
      const nextInput = inputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    if (pinEnter.length >= 4 && event.target.value) {
      console.log("비밀번호 5자리 입력 들어오면",pinEnter + event.target.value)
      if (routeAction === "login") {
        axiosLogin(pinEnter + event.target.value)
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
          value={pinEnter.length >= 1 ? pinEnter[0] : ""}
          onChange={(event) => handlepinEnterChange(event, 0)}
        ></Input>
        <Input 
          ref={inputRefs[1]}
          $size="20px," 
          $simplepassword
          value={pinEnter.length >= 2 ? pinEnter[1] : ""}
          onChange={(event) => handlepinEnterChange(event, 1)}
        ></Input>
        <Input 
          ref={inputRefs[2]}
          $size="20px," 
          $simplepassword
          value={pinEnter.length >= 3 ? pinEnter[2] : ""}
          onChange={(event) => handlepinEnterChange(event, 2)}
        ></Input>
        <Input 
          ref={inputRefs[3]}
          $size="20px," 
          $simplepassword
          value={pinEnter.length >= 4 ? pinEnter[3] : ""}
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
          value={pinEnter.length >= 5 ? pinEnter[4] : ""}
          onChange={(event) => handlepinEnterChange(event, 4)}
        ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinEnter;

