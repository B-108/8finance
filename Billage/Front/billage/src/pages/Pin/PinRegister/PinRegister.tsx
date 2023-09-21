import { InputBox } from "./PinRegister.style"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Input from "/src/components/Common/Input"
import Text from "/src/components/Common/Text"
import plus from "/src/assets/plus.svg"
import Image from "/src/components/Common/Image"
import { useEffect, useRef, useState } from "react"

function PinRegister () {
  const [pinNumber,setPinNumber] = useState<string>("")
  const focusRef = useRef<HTMLInputElement | null>(null);

  const handlePinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPinNumber(pinNumber + event.target.value);
    console.log(pinNumber)
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []); 

  return (
    <CenteredContainer $center>
      <Text
        $PinText
        >간편 비밀번호 등록</Text>

      <InputBox>
        <Input
          ref={focusRef}
          $size="20px,20px" 
          $simplepassword
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          onChange={handlePinNumberChange}
          ></Input>
        <Input 
          $size="20px,20px" 
          $simplepassword
          onChange={handlePinNumberChange}
          ></Input>
        <Image
          src={plus}
          alt="plus"></Image>
        <Input 
          $size="20px,20px" 
          $simplepassword
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

