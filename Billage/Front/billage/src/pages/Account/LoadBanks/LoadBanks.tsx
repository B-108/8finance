import { 
  useCallback, 
  useContext, 
  useState } from "react"
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
import { BankListState, 
  EachBankAccountState } from "/src/recoil/account";

// API
import { postBankAccounts } from "/src/api/account";

// 모달 알림창
import AlertSimpleContext from "/src/context/alertSimple/AlertSimpleContext";


function LoadBanks () {
  const [bankList, setBankList] = useRecoilState(BankListState);
  const [eachBankAccount, setEachBankAccount] = useRecoilState(EachBankAccountState);
  const [isEnd, setIsEnd] = useState(false);
  
  // 라우터 
  const navigate = useNavigate()
  const moveLoadAccounts = async (bankcode?:string | undefined) => {
    const response = await axiosBankAccounts (bankcode)
    setEachBankAccount(response)
    if(!response) {
      if(bankcode === `["004"]`) { 
        onAlertSimpleClick("KB국민은행에 계좌가 없습니다."); return }
      else if(bankcode === `["003"]`) { 
        onAlertSimpleClick("IBK기업은행에 계좌가 없습니다."); return }
      else if(bankcode === `["001"]`) { 
        onAlertSimpleClick("하나은행에 계좌가 없습니다."); return }
      else if(bankcode === `["002"]`) { 
        onAlertSimpleClick("농협은행에 계좌가 없습니다."); return }
      else if(bankcode === `["005"]`) { 
        onAlertSimpleClick("신한은행에 계좌가 없습니다."); return }
      else if(bankcode === `["006"]`) { 
        onAlertSimpleClick("우리은행에 계좌가 없습니다."); return }
    }
    navigate(`/loadaccounts`)
  }

  const axiosBankAccounts = async (bankcode?:string | undefined) => {
    try {
      return await postBankAccounts(bankcode)
    }
    catch(error) {
      console.log(error)
    }
  }

  // 알림창
  const HandleIsEnd = useCallback(() => {
    setIsEnd(!isEnd);
  }, [isEnd]);

  const { alert: alertSimpleComp } = useContext(AlertSimpleContext);
  
  const onAlertSimpleClick = async (text: string) => {
    const result = await alertSimpleComp(text);
    console.log("custom", result);
    HandleIsEnd();
  };

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