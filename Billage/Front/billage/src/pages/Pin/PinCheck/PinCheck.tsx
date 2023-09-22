import { InputBox } from "./PinCheck.style"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Input from "/src/components/Common/Input"
import Text from "/src/components/Common/Text"
import plus from "/src/assets/plus.svg"
import Image from "/src/components/Common/Image"

function PinCheck () {
  return (
    <CenteredContainer $center>
      <Text
        $PinText
        >간편 비밀번호 확인</Text>

      <InputBox>
        <Input $size="12px,26px" $simplepassword
          ></Input>
        <Input $size="12px,26px" $simplepassword
          ></Input>
        <Input $size="12px,26px" $simplepassword
          ></Input>
        <Input $size="12px,26px" $simplepassword
          ></Input>
        <Image
          src={plus}
          alt="plus"></Image>
        <Input $size="12px,26px" $simplepassword
          ></Input>
      </InputBox>

      <Text
        $description
        >숫자4자리와 영문자 하나로 설정해 주세요!</Text>
    </CenteredContainer>
  )
}

export default PinCheck