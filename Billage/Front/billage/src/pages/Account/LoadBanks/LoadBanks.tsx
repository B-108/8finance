import { useState } from "react"
import { useNavigate } from "react-router-dom";

// 재사용 컴포넌트
import CenteredContainer from "/src/components/Common/CenterAlign"
import Header from "/src/components/Header/Header"
import Image from "/src/components/Common/Image";
import Text from "/src/components/Common/Text";

// 이미지
import rightarrow from '/src/assets/rightarrow_bank.svg';

// 스타일 컴포넌트
import { 
  BankBox,
  BankContainer, 
  LeftSection} from "./LoadBanks.style";

// 리코일
import { useRecoilState } from "recoil";
import { BankListState } from "/src/recoil/account";


function LoadBanks () {
  const [bankList, setBankList] = useRecoilState(BankListState);
  
  // 라우터 
  const navigate = useNavigate()
  const moveLoadAccounts = (bankcode?:string) => {
    navigate(`/loadaccounts/${bankcode}`)
  }

  return (
    <CenteredContainer>
      <Header
        headerTitle="은행 선택"/>

      <Text
        style={{ marginBottom: '1.5rem' }}
        $description
        $size="94%,">계좌를 확인할 은행을 선택해주세요.</Text>
      
      <BankContainer>
        {bankList.map((bank,index) => (
          <BankBox 
            key={index}
            onClick={() => moveLoadAccounts(bank.code)}>
            <LeftSection>
              <Image 
                src={bank.logo} 
                alt="NH"
                width='40px,'/>
              <Text
                $smallTitle>{bank.bankName}</Text>
            </LeftSection>

            <Image 
              src={rightarrow} 
              alt="NH"
              width='13px,'/>
          </BankBox>
        ))}
      </BankContainer>
    </CenteredContainer>
  )
}
export default LoadBanks