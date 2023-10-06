import Button from "/src/components/Common/Button"
import Input, { InputDiv, InputHeader } from "/src/components/Common/Input"
import { useState } from "react";
import logo from 'src/assets/logo.png'
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import CenteredContainer from "/src/components/Common/CenterAlign";
import Footer from "/src/components/Common/Footer";

function ChangePW(){

    const [phone, setPhone] = useState<string>('');
    const [certNum, setCertNum] = useState<number>();
    const handleCertChange = () => {
        console.log('인증');
        console.log(phone)
      };
     
      const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
        console.log(phone)
      };

      const handleCertNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertNum(Number(event.target.value));
        console.log(certNum)
      };


    return(
<>
        <CenteredContainer $center>

        <Image src={logo} alt="로고" width="120px" height="120px"></Image>
        <p style={{ fontSize: theme.fontSize.XL_28, fontWeight : 'bold' }}>비밀 번호 변경</p>

        <InputDiv style={{ marginBottom: '1rem' }}>
            <InputHeader>핸드폰 번호</InputHeader>
                <Input
                    type="phone"
                    value={phone}
                    $size="90%,40px"
                    $active
                    onChange={handlePhoneChange}>
            </Input>
        </InputDiv>
            <Button
                $smallGreenBtn
                $size="15%,25px"
                $Green
                onClick={handleCertChange}
                >
                전송
            </Button>

        <InputDiv style={{marginBottom : '4rem'}}>
            <InputHeader>인증 번호</InputHeader>
            <Input
                type="number"
                value={certNum}
                $size="90%,40px"
                $active
                onChange={handleCertNumChange}
                />

        </InputDiv>
        
        <Button $basicGreenBtn $size="91%,43px"
                $Green onClick={handleCertChange}>
                인증 하기</Button>
        </CenteredContainer>
        <Footer/>

        </>
    )
}
export default ChangePW