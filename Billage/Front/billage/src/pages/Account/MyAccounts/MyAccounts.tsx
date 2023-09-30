import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트
import { 
  Account,
  AccountImg,
  AccountNUm,
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
import colorCreditCard from '/src/assets/colorCreditCard.svg';
import rightArrow from '/src/assets/rightArrow.svg';
import account_IBK1 from '/src/assets/account/account_IBK1.svg'
import account_IBK2 from '/src/assets/account/account_IBK2.svg'
import account_IBK3 from '/src/assets/account/account_IBK3.svg'
import account_IBK4 from '/src/assets/account/account_IBK4.svg'
import account_IBK5 from '/src/assets/account/account_IBK5.svg'
import account_KB1 from '/src/assets/account/account_KB1.svg'
import account_KB2 from '/src/assets/account/account_KB2.svg'
import account_KB3 from '/src/assets/account/account_KB3.svg'
import account_KB4 from '/src/assets/account/account_KB4.svg'
import account_KB5 from '/src/assets/account/account_KB5.svg'

// API
import { 
  getAccountList, 
  patchMainAccount } from '/src/api/account';
  
// 타입스크립트
import { AccountType } from '/src/type/account';

function MyAccounts() {
  const [accounts, setAccounts] = useState<AccountType[]>([])


  // 라우터
  const navigate = useNavigate()
  const moveAccountEnroll = () => {navigate(`/accountenroll`)}
  
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

  // 주계좌 등록
  const axiosMainAccount = async (accountId:number): Promise<void> => {
    try {
      const response = await patchMainAccount(accountId)
      axiosAccountList()
      console.log(response)
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
          {accounts && accounts.map((account,index) => (
          <Account 
            key={index}
            $isClicked={account.accountMainYn} >
            <AccountNUm>
              {account.accountBankCode === "004" ? "KB 국민은행 _ ":"IBK 기업은행 _ "}
              {account.accountNum}
            </AccountNUm>

            <AccountImg
              src={account_KB4}
              onClick={() => {
                axiosMainAccount(account.accountId)}}>
            </AccountImg>
          </Account>
          ))}
        </AccountsBox>

      </CenteredContainer>
      <Footer/>
    </>
  );
}

export default MyAccounts;
