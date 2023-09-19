import Button from "/src/components/Common/Button"
import { InputBody, InputDiv, InputHeader } from "/src/components/Common/Input"
import { useState } from "react";
import logo from 'src/assets/logo.png'
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 3%;
    height: 100vh; /* 화면 높이의 100% */
`;


function Login(){
    const [phone, setPhone] = useState<string>('');
    // const [password, setPassword] = useState<number>();
    const handleLoginClick = () => {
        console.log('로그인');
        console.log(phone)
        // console.log(password)
      };
    
      const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
        console.log(phone)
      };
    //   const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = event.target.value;
    //     setPassword(inputValue === '' ? undefined : Number(inputValue));
    //     console.log(password)
    //   };

    return(
        <>
        <CenteredContainer>

        <Image src={logo} alt="로고" width="120px" height="120px"></Image>
        <p style={{ fontSize: theme.fontSize.XL, fontWeight : 'bold' }}>Billage에 오신걸 환영합니다!</p>
        <InputDiv>
            <InputHeader>핸드폰 번호</InputHeader>
            <InputBody
                type="phone"
                value={phone}
                onChange={handlePhoneChange}
            />
        </InputDiv>
        
        <Button $bigButton $Green onClick={handleLoginClick}><span style={{fontSize: theme.fontSize.M}}>로그인</span></Button>
        <div style={{ fontSize: theme.fontSize.XS, color:theme.color.gray[55]}}>
            <span >회원가입</span>
            <span> | </span>
            <span>간편 비밀번호 찾기</span>
        </div>
        </CenteredContainer>

        </>
    )
}

export default Login