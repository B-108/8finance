import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트
import { 
  AccountNumber, 
  BankContainer, 
  BankName, 
  Banks,
  BtnContainter} from './LoadAccounts.style';

// 공용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Text from '/src/components/Common/Text';
import Image from '/src/components/Common/Image';
import Button from '/src/components/Common/Button';

// 이미지
import NH from '/src/assets/NH.svg';
import KB from '/src/assets/KB.svg';

// 타입스크립트
import { AccountProps } from '/src/type/account';

// API
import { postAccountRegister } from '/src/api/account';


function LoadAccounts() {
  const [isAccountClicked, setIsAccountClicked] = useState(false);

  const handleAccountClick = () => {
      setIsAccountClicked(!isAccountClicked); // 클릭 시 테두리 색 변경
  };

  const axiosAccountRegister = async (): Promise<void> => {
    const info: AccountProps = {
      accountBankCode : "004",
      accountNum :"111-11111-2222", 
    }
    try {
      await postAccountRegister(info)
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <CenteredContainer>
        <Header 
          headerTitle="계좌 선택"></Header>

        <Text
          style={{ marginBottom: '1.5rem' }}
          $description
          $size='94%,'
          >등록할 계좌를 선택해주세요.</Text>
          
        <BankContainer>
          <Banks
            onClick={handleAccountClick} 
            $isClicked={isAccountClicked}>
            <Image 
              src={NH} 
              alt="NH"
              width='35px,'/>
            <BankName>농협은행</BankName>
            <AccountNumber>123-456-7890</AccountNumber>
          </Banks>
          <Banks 
            onClick={handleAccountClick} 
            $isClicked={isAccountClicked}>
            <Image 
              src={KB} 
              alt="KB"
              width='35px,'/>
              <BankName>농협은행</BankName>
              <AccountNumber>123-456-7890</AccountNumber>
          </Banks>
        </BankContainer>

        <BtnContainter style={{ margin: '10px' }}>
          <Button 
            $basicGrayBtn 
            $size="48%, 40px">돌아가기
          </Button>
          <Button 
            $basicGreenBtn 
            $size="48%, 40px"
            onClick={axiosAccountRegister}>등록
          </Button>
        </BtnContainter>
      </CenteredContainer>
    </>
  );
}

export default LoadAccounts;