import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
import HANA from '/src/assets/HANA.svg';
import IBK from '/src/assets/IBK.svg';
import SINHAN from '/src/assets/SINHAN.svg';
import URI from '/src/assets/URI.svg';
import basicAccount from "/src/assets/basicAccount.svg"

// 타입스크립트
import { AccountProps, EachBankAccountType } from '/src/type/account';

// API

// 리코일
import { useRecoilState } from 'recoil';
import { 
  AccountsSelectedState, 
  EachBankAccountState } from '/src/recoil/account';``

// 알림 모달창
import ConfirmContext from '/src/context/confirm/ConfirmContext';

function LoadAccounts() {
  const [isAccountClicked, setIsAccountClicked] = useState<boolean[]>([]);
  const [accountsSelected, setAccountsSelected] = useRecoilState(AccountsSelectedState) 
  const [eachBankAccount, setEachBankAccount] = useRecoilState(EachBankAccountState);

  // 라우터 
  const navigate = useNavigate()
  const moveLoadBanks = () => {navigate(`/loadbanks`)}
  const movePinEnter = () => { 
    console.log(accountsSelected)
    openConfirm()
  }

  const handleAccountClick = (index:number,selectedAccount:EachBankAccountType) => {
    setIsAccountClicked(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index]; // 클릭할 때마다 toggle
      return updatedState;
    });

    setAccountsSelected(prevState => {
      const isAlreadySelected = prevState.includes(selectedAccount);
      console.log(accountsSelected)
      
      if (isAlreadySelected) {
          return prevState.filter(account => account !== selectedAccount); // 이미 있는 경우 제외
      } else {
          return [...prevState, selectedAccount]; // 없는 경우 추가
      }
    });
  };

  // 알림 모달창
  const { confirm: confirmComp } = useContext(ConfirmContext);

  const onConfirmClick = async (text: string) => {
    const result = await confirmComp(text);
    console.log("custom", result);
    return result;
  };

  const openConfirm = async () => {
    const nextAction = await onConfirmClick(`총${accountsSelected.length}개의 계좌를 등록하시나요?`);
    if (nextAction) {
      navigate('/pinenter/account') 
    }
    return;
  };
  
  useEffect(()=>{
    setIsAccountClicked(Array(eachBankAccount.length).fill(false))
  },[eachBankAccount])

  useEffect(()=>{
    setAccountsSelected([])
  },[])

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
          {eachBankAccount.map((account,index)=>(
            <Banks key={index}
              onClick={() => {
                handleAccountClick(index, account)}} 
              $isClicked={isAccountClicked[index]}>
              <Image
                style={{marginLeft:"2%"}}
                src={basicAccount} 
                alt="basicAccount"
                width='45px,'/>
              <BankName>{account.bankName}</BankName>
              <AccountNumber>{account.accountNum}</AccountNumber>
            </Banks>
          ))}
        </BankContainer>

        <BtnContainter style={{ margin: '10px' }}>
          <Button 
            $basicGrayBtn 
            $size="48%, 45px"
            onClick={moveLoadBanks}>돌아가기
          </Button>
          <Button 
            $basicGreenBtn 
            $size="48%, 45px"
            onClick={movePinEnter}>등록
          </Button>
        </BtnContainter>

      </CenteredContainer>
    </>
  );
}

export default LoadAccounts;