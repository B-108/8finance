import Input, { ButtonInput } from '/src/components/Common/Input';
import React, { useState, useEffect } from 'react';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import plus from '/src/assets/plus.svg';
import Button from '/src/components/Common/Button';
import { ButtonContainer, InputDiv, InputTitle, SmallButtonsContainer } from './SendMoney.style';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAccountList } from '/src/api/account';
import { AccountType } from '/src/type/account';

function SendMoney() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [myAccountInfo, setMyAccountInfo] = useState<string>('');
    const [amount, setAmountInfo] = useState<string>('0');
    const navigate = useNavigate()
    const location = useLocation()

    const [accounts, setAccounts] = useState<AccountType[]>([])
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
    // useEffect(()=>{
    //     axiosAccountList()
    //   },[])
    
    console.log(amount)
    
    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleMyAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMyAccountInfo(event.target.value);
    };
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountInfo(event.target.value);
    };
    const handleButtonClick = (increment: number) => {
        setAmountInfo((prevAmount) => (parseInt(prevAmount) + increment).toString());
    };

    return (
        <CenteredContainer>
            <Header headerTitle="이체하기"></Header>
            <InputDiv>
                <InputTitle>돈 받을 사람</InputTitle>
                <ButtonInput
                    value={friendInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleFriendInfoChange}
                    />
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>상대방 계좌</InputTitle>
                <ButtonInput
                    value={accountInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleAccountInfoChange}
                    />
            </InputDiv>
            <hr />
            <InputDiv style={{alignItems:"center"}}>
                <InputTitle>내 계좌</InputTitle>
                {/* <ButtonInput
                    value={myAccountInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleMyAccountInfoChange}
                    $buttonImage={plus} // 이미지 버튼 추가
                /> */}
                    <select
                    value={myAccountInfo}
                    onChange={() => handleMyAccountInfoChange}
                    style={{width : '95%', height: '40px', borderRadius: '10px', border: '3px solid'}}
                    // $active
                    // $size="86%,40px"
                >
                    {accounts.map((account) => (
                        <option
                            key={account.accountId}
                            value={account.accountNum}
                            disabled={!account.accountMainYn}
                        >
                            {account.accountNum}
                        </option>
                    ))}
                </select>

            </InputDiv>
            <hr />
            
            <InputDiv style={{alignItems:"center"}}>
                <InputTitle>보내는 금액</InputTitle>
                <Input
                  value={amount} 
                  $active 
                  $size="88%,40px" 
                  $position
                  onChange={handleAmountChange}
                  ></Input>
                <SmallButtonsContainer>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="100%,25px"
                    onClick={() => handleButtonClick(10000)}
                    >+1만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="100%,25px"
                    onClick={() => handleButtonClick(50000)}
                    >+5만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="100%,25px" 
                    onClick={() => handleButtonClick(100000)}
                    >+10만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="100%,25px"
                    onClick={() => handleButtonClick(1000000)}
                    >+100만
                  </Button>
                </SmallButtonsContainer>
            </InputDiv>

            <hr />
            <InputDiv style={{alignItems:"center"}}>
                <InputTitle>남은 금액</InputTitle>
                {/* <Input $active $size="88%,40px">{location.state.repaymentCash - Number(amount)}</Input> */}
            </InputDiv>
            <hr />
            <ButtonContainer>
                <Button $basicGrayBtn $size="48%, 50px">
                    작성취소
                </Button>
                <Button $basicGreenBtn $size="48%, 50px">
                    작성완료
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default SendMoney;
