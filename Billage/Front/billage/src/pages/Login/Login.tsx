import Button from "/src/components/Common/Button"
import Input, { InputDiv, InputHeader } from "/src/components/Common/Input"
import { useState } from "react";
import logo from 'src/assets/logo.png'
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import { CenteredContainer } from "/src/components/Common/CenterAlign";
import { useNavigate } from "react-router-dom";

function Login(){
    const [phone, setPhone] = useState<string>('');
    const navigate = useNavigate()
    const handleLoginClick = () => {
        console.log('로그인');
        console.log(phone)
      };
    
      const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
        console.log(phone)
      };
    const moveSignUp = () => {
        navigate(`/signup`)
    }

    return(
        <>
        <CenteredContainer>

        <Image src={logo} alt="로고" width="120px" height="120px"></Image>
        <p style={{ fontSize: theme.fontSize.XL_28, fontWeight : 'bold' }}>Billage에 오신걸 환영합니다!</p>
        <InputDiv style={{marginBottom : '2rem'}}>
            <InputHeader>핸드폰 번호</InputHeader>
            <Input
                type="phone"
                value={phone}
                $size="90%,40px"
                $active
                onChange={handlePhoneChange}
            />
        </InputDiv>
        
        <Button $basicGreenBtn $size="91%,43px" $Green onClick={handleLoginClick}>로그인</Button>
        <div style={{ fontSize: theme.fontSize.XS_12, color:theme.color.gray[55], marginTop: '1rem'}}>
            <span onClick={moveSignUp} >회원가입</span>
            <span> | </span>
            <span>간편 비밀번호 찾기</span>
        </div>
        </CenteredContainer>

        </>
    )
}

export default Login