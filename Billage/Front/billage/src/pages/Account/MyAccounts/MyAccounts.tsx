import React, { 
  useState, 
  useEffect,
  useContext, 
  useRef} from 'react';
import { useNavigate } from 'react-router-dom';

// 스타일 컴포넌트
import { 
  Account,
  AccountImg,
  AccountNUm,
  AccountsBox, 
  LeftSection,
  RightSection,
  Test,} from './MyAccounts.style';

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

// 알림 모달
import ConfirmContext from '/src/context/confirm/ConfirmContext';

const ibkAccountImages = [
  account_IBK1, 
  account_IBK2, 
  account_IBK3, 
  account_IBK4, 
  account_IBK5,
  account_IBK1, 
  account_IBK2, 
  account_IBK3, 
  account_IBK4, 
  account_IBK5
];

const kbAccountImages = [
  account_KB1, 
  account_KB2, 
  account_KB3, 
  account_KB4, 
  account_KB5,
  account_KB1, 
  account_KB2, 
  account_KB3, 
  account_KB4, 
  account_KB5
];

function MyAccounts() {
  const [accounts, setAccounts] = useState<AccountType[]>([])
  const [isLongPressActive, setIsLongPressActive] = useState(false);
  const pressTimer = useRef(null);
  
  // 라우터
  const navigate = useNavigate()
  const moveAccountEnroll = () => {navigate(`/accountenroll`)}

  // 이미지 선택 함수
  const getRandomAccountImage = (bankcode : string, index : number) => {
    if(bankcode === "004") {
      return kbAccountImages[index];
    }

    else if(bankcode === "003") {
      return ibkAccountImages[index];
    }
  }
  
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

  const startPress = (accountId:number) => {
    console.log("스타트 프레스")
    pressTimer.current = setTimeout(() => {
      setIsLongPressActive(true);
      openConfirm(accountId);
    }, 500); // 2초 후에 openConfirm 실행
  };

  const endPress = () => {
    console.log("click")
    clearTimeout(pressTimer.current);
    setIsLongPressActive(false);
  };

  // ConFirm 모달 창
  const { confirm: confirmComp } = useContext(ConfirmContext);

  const onConfirmClick = async (text: string) => {
    const result = await confirmComp(text);
    console.log("custom", result);
    return result;
  };

  const openConfirm = async (accountId:number) => {
    const nextAction = await onConfirmClick("주계좌로 선택하시나요?");
    if (nextAction) {
      axiosMainAccount(accountId)
    }
    return;
  };

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
              <Test
                onMouseDown={() => startPress(account.accountId)}
                onMouseUp={endPress}
                onMouseLeave={endPress}>
              </Test>
              <AccountImg
                src={getRandomAccountImage(account.accountBankCode,index)}>
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
