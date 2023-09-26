import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트
import { 
  Accounts, 
  AccountsBox, 
  LeftSection,
  RightSection} from './MyAccounts.style';

// 재사용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Footer from '/src/components/Common/Footer';
import Header from '/src/components/Header/Header';
import Text from '/src/components/Common/Text';
import Button from '/src/components/Common/Button';
import Image from '/src/components/Common/Image';

// 이미지
import sampleAccount from '/src/assets/sampleAccount.svg';
import sampleAccount2 from '/src/assets/sampleAccount2.svg';
import colorCreditCard from '/src/assets/colorCreditCard.svg';
import rightArrow from '/src/assets/rightArrow.svg';

// API
import { 
  getAccountList } from '/src/api/account';


function MyAccounts() {
  const [accounts, setAccounts] = useState([])
  const [isAccountClicked, setIsAccountClicked] = useState(false);

  // 라우터
  const navigate = useNavigate()
  const moveAccountEnroll = () => {navigate(`/accountenroll`)}
  
  const handleAccountClick = () => {
    setIsAccountClicked(true); // 클릭 시 테두리 색 변경
    setTimeout(() => {
        setIsAccountClicked(false); // 3초 후에 테두리 색 원래대로 복구
    }, 3000); // 3초 동안 유지
  };

  // 전체 계좌조회
  const axiosAccountList = async (): Promise<void> => {
    try {
      const response = await getAccountList()
      setAccounts(response?.data)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    axiosAccountList()
  },[])

  return (
    <>
      <CenteredContainer>
        <Header 
          headerTitle="내 계좌"></Header>
        
        <Text
          $description
          $size="92%,">카드를 꾸욱 눌러서 주 계좌를 설정해 보세요!</Text>
        
        <Button
          $registerBtn
          $size="94%,45px"
          onClick = {moveAccountEnroll}>
            <LeftSection>
              <Image
                src={colorCreditCard}
                alt="colorCreditCard"
                width="32px"></Image>
              계좌 등록
            </LeftSection>

            <RightSection>
              <Image
                src={rightArrow}
                alt="rightArrow"
                width="12px"></Image>
            </RightSection>
        </Button>

        <AccountsBox>
          {accounts.map((account,index) => (
          <Accounts
            key={index}
            src={sampleAccount}
            onClick={handleAccountClick}
            $isClicked={isAccountClicked}>
          </Accounts>))}
        </AccountsBox>

      </CenteredContainer>
      <Footer/>
    </>
  );
}

export default MyAccounts;
