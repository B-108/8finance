import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트 재사용
import Button from "/src/components/Common/Button"
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import CenteredContainer from "/src/components/Common/CenterAlign";
import Text from "/src/components/Common/Text";

// 스타일 컴포넌트
import Input, { 
  InputDiv, 
  InputHeader } from "/src/components/Common/Input"

// 이미지
  import logo from 'src/assets/logo.png'

// 리코일
import { PhoneState } from "/src/recoil/auth";
import { useRecoilState } from "recoil";

// 타입스크립트

function Login(){
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  
  const MAX_LENGTH = 20;

  // 라우터
  const navigate = useNavigate()
  const moveSignUp = () => {navigate(`/signup`)}
  const movePinEnter = () => {navigate('/pinenter/login')}

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아니면 입력 못 받도록
    if(isNaN(Number(event.target.value))) {return}

    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setPhone(event.target.value.split(' ').join(''));
  };

  return(
    <CenteredContainer $center>

        <Image src={logo} alt="로고" width="120px"></Image>

        <Text
            $mainText
            $size="60%,">Billage에 오신걸 환영합니다!</Text>

        <InputDiv style={{marginBottom : '2rem'}}>
            <InputHeader>핸드폰 번호</InputHeader>
            <Input
                type="phone"
                value={phone}
                $size="86%,40px"
                $active
                onChange={handlePhoneChange}/>
        </InputDiv>
    
        <Button    
            $basicGreenBtn 
            $size="91%,43px" 
            $Green onClick={movePinEnter}
            >로그인</Button>
        
        <div style={{ fontSize: theme.fontSize.XS_12, color:theme.color.gray[55], marginTop: '1rem'}}>
            <span onClick={moveSignUp} >회원가입</span>
            <span> | </span>
            <span>간편 비밀번호 찾기</span>
        </div>

    </CenteredContainer>
  )
}

export default Login