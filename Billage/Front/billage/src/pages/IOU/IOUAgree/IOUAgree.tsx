import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useLocation } from 'react-router-dom';
// 공용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';

// 스타일 컴포넌트
import {
    Amount,
    ButtonContainer,
    Content,
    Dates,
    IOUContainer,
    IOUContent,
    InputDiv,
    InputTitle,
    Title,
    UserBox,
    UserInfo,
    UserName,
    UserPhone,
    UserType,
    WatermarkContainer,
    WatermarkImage,
    WatermarkText,
} from './IOUAgree.style';

// 이미지
import logo from '/src/assets/logo.png';
import Text from '/src/components/Common/Text';

// 타입스크립트
import { AccountType } from '/src/type/account';
import { AgreeIOUProps } from '/src/type/iou';

// API
import { getAccountList } from '/src/api/account';
import { agreeIOU, EnrollWd } from '/src/api/iou';
import { promises } from 'readline';

function IOUAgree() {
    const [myAccountInfo, setMyAccountInfo] = useState<string>('');
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [myAccountInfoCode, setMyAccountInfoCode] = useState<string>('');
    const navigate = useNavigate()
    const location = useLocation()
    const useData = location.state.data
    const [agree, setAgree] = useState<string>('true')
    console.log(useData)
    const handleMyAccountInfoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setMyAccountInfo(event.target.value);
    };

    // 전체 계좌조회
    const axiosAccountList = async (): Promise<void> => {
      try {
          const response = await getAccountList();
          setAccounts(response?.data);
          console.log(response?.data);
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        axiosAccountList();
    }, []);

    useEffect(() => {
        const mainAccount = accounts.find((account) => account.accountMainYn === true);
        if (mainAccount) {
            setMyAccountInfo(mainAccount.accountNum);
            setMyAccountInfoCode(mainAccount.accountBankCode);
        }
    }, [accounts]);
    
    const info: AgreeIOUProps = {
        contractId: useData.contractId,
        tranWd: useData.creditorUser.userName,
        tranWdAcNum: myAccountInfo,
        tranWdBankCode: myAccountInfoCode,
        tranDp: useData.debtorUser.userName,
        tranDpAcNum: useData.debtorAcNum,
        tranDpBankCode: useData.debtorBankCode,
        tranAmt: useData.contractAmt,
        tranContent: '거래시작',
    };
    let BankName = '';
    if (myAccountInfoCode === '004') {
      BankName = '국민은행';
    } else if (myAccountInfoCode === '003') {
      BankName = '기업은행';
    }
    const contractCreditorAcNum : string = `${BankName} ${myAccountInfo}`
    console.log(contractCreditorAcNum)
    console.log(info)
    const axiosAgreeIOU =async (): Promise<void> => {
          try{
              await agreeIOU(agree, info)
          }
          catch(error){
              console.log(error)
          }
      }
    const axiosEnrollWd =async (): Promise<void> => {
        try{
            console.log('채권자 계좌등록 중')
            await EnrollWd(useData.contractId, contractCreditorAcNum)
        }
        catch(error){
            console.log(error)
        }
    }
    const AgreeIOU = async ():Promise<void> => {
        try{
            console.log(info)     
            await axiosEnrollWd()
            await axiosAgreeIOU()
            await navigate('/main')
        }
        catch(error){
            console.log()
        }
  

    }
    const day = new Date()
    const year = day.getFullYear(); // 년도 추출
    const month = day.getMonth() + 1; // 월 추출 (월은 0부터 시작하므로 +1 해줍니다)
    const date = day.getDate(); // 일 추출

    return (
        <CenteredContainer>
            <Header 
              headerTitle="거래하기"></Header>
            <IOUContainer>
                <WatermarkContainer>
                    <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                </WatermarkContainer>

                <IOUContent>
                    <Title>차 용 증</Title>
                    <div style={{ width: '100%', height: '225px' }}>
                        <Amount>￦ {useData.contractAmt} (원)</Amount>
                        <hr />
                        <Content>
                            위 금액을 채무자 {useData.debtorUser.userName}(이)가 채권자 {useData.creditorUser.userName}(으)로부터
                            0000.00.00일 틀림없이
                            빌렸습니다.
                        </Content>
                        <Content>
                            채무자 {useData.debtorUser.userName}(은)는 위 금액을 연 이자{useData.interestRate}
                            %로 하여 0000.00.00일까지 채권자 {useData.creditorUser.userName}에게 갚겠습니다.
                        </Content>
                    </div>
                    <Dates>날짜: {year}년 {month}월 {date}일</Dates>
                    <hr />

                    <UserBox>
                        <UserType>채권자</UserType>
                        <UserInfo>
                            <UserName>이름 : {useData.creditorUser.userName}</UserName>
                            <UserPhone>전화번호 : {useData.creditorUser.userCellNo}</UserPhone>
                        </UserInfo>
                    </UserBox>

                    <UserBox>
                        <UserType>채무자</UserType>
                        <UserInfo>
                            <UserName>이름 : {useData.debtorUser.userName}</UserName>
                            <UserPhone>전화번호 : {useData.debtorUser.userCellNo}</UserPhone>
                        </UserInfo>
                    </UserBox>
                </IOUContent>

                <WatermarkText>
                    *본 문서는 Billage에서 발행한 차용증이며,
                    <br />
                    사전에 채권자, 채무자의 상호 동의를 거친 후 작성된 것임을 알려드립니다.
                </WatermarkText>
            </IOUContainer>
            
            <Text
              $size='94%,'>
              이체계좌</Text>

            <InputDiv style={{alignItems:"center"}}>
                <select
                value={myAccountInfo}
                onChange={handleMyAccountInfoChange}
                style={{
                  width : '95%', 
                  height: '40px', 
                  borderRadius: '10px', 
                  border: '3px solid #BDBDBD'}}>
                {accounts.map((account) => (
                    <option
                        key={account.accountId}
                        value={account.accountNum}>
                        {account.accountNum}
                    </option>))}
                </select>
            </InputDiv>  

            <ButtonContainer>
                <Button 
                  $basicGrayBtn 
                  $size="48%,45px">
                    거절하기
                </Button>
                <Button 
                  $basicGreenBtn 
                  $size="48%,45px"
                  onClick={AgreeIOU}
                  >
                    돈 빌려주기
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default IOUAgree;
