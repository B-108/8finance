import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 이미지
import logo from 'src/assets/logo.png'

// 재사용 컴포넌트
import CenteredContainer from "/src/components/Common/CenterAlign";
import Text from "/src/components/Common/Text";
import Input from "/src/components/Common/Input"
import Button from "/src/components/Common/Button"
import Image from "/src/components/Common/Image";
import theme from "/src/themes";

// 스타일 컴포넌트  
import { 
  ButtonBox, 
  InputAuthHeader, 
  InputDiv, 
  InputHeader } from "/src/components/Common/Input"

// 리코일 
import { useRecoilState } from "recoil";
import { 
  NameState, 
  PhoneState } from "/src/recoil/auth";


function SignUp(){
  const [name, setName] = useRecoilState<string>(NameState);
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [certNum, setCertNum] = useState<string>('');
  
  const MAX_LENGTH = 10;

  // 라우터 
  const navigate = useNavigate()
  const moveLogin = () => {navigate(`/`)}
  const movePinRegister = () => {navigate(`/pinregister`)}
    
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setName(event.target.value.split(' ').join(''));
    console.log(name)
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setPhone(event.target.value.split(' ').join(''));
    console.log(phone)
  };

  const handleCertNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setCertNum(event.target.value.split(' ').join(''));
    console.log(certNum)
  };
  
  return(
    <CenteredContainer $center>
      <Image src={logo} alt="로고" width="120px"></Image>
      
      <Text
        $mainText
        $size="60%,">Billage에 오신걸 환영합니다!</Text>

      <InputDiv style={{marginBottom : '1rem'}}>
        <InputHeader>이름</InputHeader>
        <Input
          type="name"
          value={name}
          $size="93%,40px"
          $active
          onChange={handleNameChange}와 
        />
      </InputDiv>

      <InputDiv style={{ marginBottom: '1rem' }}>
        <InputAuthHeader>핸드폰 번호</InputAuthHeader>
        <Input
          type="phone"
          value={phone}
          $size="93%,40px"
          $active
          onChange={handlePhoneChange}/>
      
        <ButtonBox>
          <Button
            $smallGreenBtn
            $size="26%,30px"
            >전송
          </Button>
        </ButtonBox>
      </InputDiv>

      <InputDiv style={{marginBottom : '1rem'}}>
        <InputHeader>인증 번호</InputHeader>
        <Input
          type="number"
          value={certNum}
          $size="93%,40px"
          $active
          onChange={handleCertNumChange}/>
      </InputDiv>
              
      <Button 
        $basicGreenBtn 
        $size="93%,43px" 
        $Green
        onClick={movePinRegister}>가입 하기</Button>

      <div 
        style={{ 
          fontSize: theme.fontSize.XS_12, 
          color:theme.color.gray[55], 
          marginTop: '1rem'}}>
        <span onClick={moveLogin} >이미 회원이신가요? 로그인하기</span>
      </div>
    </CenteredContainer>
  )
}
export default SignUp