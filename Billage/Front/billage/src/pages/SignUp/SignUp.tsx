import Button from "/src/components/Common/Button"
import Input, { ButtonBox, InputAuthHeader, InputDiv, InputHeader } from "/src/components/Common/Input"
import { useState } from "react";
import logo from 'src/assets/logo.png'
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import { useNavigate } from "react-router-dom";
import CenteredContainer from "/src/components/Common/CenterAlign";
import Text from "/src/components/Common/Text";


function SignUp(){
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [certNum, setCertNum] = useState<number>();
    
    const navigate = useNavigate()
    const handleLoginClick = () => {
        console.log('로그인');
        console.log(phone)
        };
        
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
        console.log(phone)
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(phone)
    };
    const handleCertNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertNum(Number(event.target.value));
        console.log(phone)
    };
    const moveLogin = () => {
        navigate(`/login`)
    }

    return(
        <CenteredContainer $center>
            <Image src={logo} alt="로고" width="120px"></Image>
            <p style={{ fontSize: theme.fontSize.XL_28, fontWeight : 'bold' }}>Billage에 오신걸 환영합니다!</p>

            <InputDiv style={{marginBottom : '1rem'}}>
                <InputHeader>이름</InputHeader>
                <Input
                    type="name"
                    value={name}
                    $size="93%,40px"
                    $active
                    onChange={handleNameChange}
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
                        $size="15%,30px"
                        onClick={handleLoginClick}
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
                $Green onClick={handleLoginClick}>가입 하기</Button>

            <div style={{ fontSize: theme.fontSize.XS_12, color:theme.color.gray[55], marginTop: '1rem'}}>

                <span onClick={moveLogin} >이미 회원이신가요? 로그인하기</span>
            </div>
        </CenteredContainer>
    )
}
export default SignUp