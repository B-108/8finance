import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 재사용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Footer from '/src/components/Common/Footer';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';
import Text from '/src/components/Common/Text';
import Input, { 
  AccountInputHeader,
  ButtonBox, 
  InputDiv} from '/src/components/Common/Input';

// 스타일 컴포넌트
import { 
  AgreementDiv, 
  Checkbox } from './AccountEnroll.style';

// 타입스크립트
import { 
  MessageCertProps, 
  MessageProps } from '/src/type/auth';

// API
import { 
  postMyDataMessage, 
  postMyDataMessageCert } from '/src/api/account';

// 리코일
import { useRecoilState } from 'recoil';
import { PhoneState } from '/src/recoil/auth';

function AccountEnroll() {
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [certNum, setCertNum] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);

  const MAX_LENGTH = 20;

  // 라우터 
  const navigate = useNavigate()
  const moveLoadBanks = async () => {
    const response = await axiosMyDataMessagCert()
    if( response && isChecked) {navigate(`/loadbanks`)}
  }

  // 전화번호 입력
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isNaN(Number(event.target.value))) {return}

    if (event.target.value.length > MAX_LENGTH) {
        event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setPhone(event.target.value.split(' ').join(''));
  };

  // 인증번호 입력
  const handleCertNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(isNaN(Number(event.target.value))) {return}

    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setCertNum(event.target.value.split(' ').join(''));
  };

  // 문자인증 번호요청
  const axiosMyDataMessage = async (): Promise<void> => {
    const info: MessageProps = {
      to : phone,
    }
    try {
      return await postMyDataMessage(info)
    }
    catch(error) {
      console.log(error)
    }
  }

  // 문자 인증 요청
  const axiosMyDataMessagCert = async (): Promise<number|undefined> => {
    const info: MessageCertProps = {
      phoneNumber : phone,
      verifyNumber : certNum
    }
    try {
      return await postMyDataMessageCert(info)
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <CenteredContainer>
        <Header headerTitle="계좌 등록"></Header>
        <Text
          style={{ marginBottom: '1.5rem' }}
          $description
          $size='94%,'>마이데이터에서 계좌 정보를 불러오세요!</Text>

        <InputDiv style={{ marginBottom: '1.5rem' }}>
          <AccountInputHeader>핸드폰번호</AccountInputHeader>
          <Input 
            type="phone" 
            value={phone} 
            $size="89%,40px" 
            $active onChange={handlePhoneChange} />

          <ButtonBox>
            <Button 
              $smallGreenBtn 
              $size="26%,30px"
              onClick={axiosMyDataMessage}>전송
            </Button>
          </ButtonBox>
        </InputDiv>

        <InputDiv style={{ marginBottom: '1.5rem' }}>
          <AccountInputHeader>인증번호</AccountInputHeader>
          <Input 
            type="number" 
            value={certNum} 
            $size="89%,40px" 
            $active onChange={handleCertNumChange} />
        </InputDiv>
        
        <AgreementDiv>
            <Checkbox 
              type="checkbox" 
              checked={isChecked} 
              onChange={() => setIsChecked(!isChecked)} />
            마이데이터를 통해 사용자의 계좌 정보를 불러오는 데에 동의 합니다. (필수)
        </AgreementDiv>

        <Button 
          $basicGreenBtn 
          $size="94%, 40px"
          onClick={moveLoadBanks}>
          계좌 불러오기
        </Button>

      </CenteredContainer>
      <Footer/>
    </>
  );
}

export default AccountEnroll;

