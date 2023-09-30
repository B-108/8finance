import Input, { ButtonInput } from '/src/components/Common/Input';
import React, { useState } from 'react';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import plus from '/src/assets/plus.svg';
import Button from '/src/components/Common/Button';
import { ButtonContainer, InputDiv, InputTitle, SmallButtonsContainer } from './SendMoney.style';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';

function SendMoney() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [myAccountInfo, setMyAccountInfo] = useState<string>('');
    const [amount, setAmountInfo] = useState<string>('');

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

    return (
        <CenteredContainer>
            <Header headerTitle="이체하기"></Header>
            <InputDiv>
                <InputTitle>돈 받을 사람</InputTitle>
                <ButtonInput
                    value={friendInfo}
                    $active
                    $size="86%,40px"
                    onChange={handleFriendInfoChange}
                    $buttonImage={magnifyingGlass}/>
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>상대방 계좌</InputTitle>
                <ButtonInput
                    value={accountInfo}
                    $active
                    $size="86%,40px"
                    onChange={handleAccountInfoChange}
                    $buttonImage={plus}/>
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>내 계좌</InputTitle>
                <ButtonInput
                    value={myAccountInfo}
                    $active
                    $size="86%,40px"
                    onChange={handleMyAccountInfoChange}
                    $buttonImage={plus} // 이미지 버튼 추가
                />
            </InputDiv>
            <hr />
            
            <InputDiv style={{alignItems:"center"}}>
                <InputTitle>보내는 금액</InputTitle>
                <Input
                  value={amount} 
                  $active 
                  $size="86%,40px" 
                  onChange={handleAmountChange}></Input>
                <SmallButtonsContainer>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="18%,25px" >+1만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="18%,25px" >+5만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="18%,25px" >+10만
                  </Button>
                  <Button style={{margin:"7px 0px 0px 5px"}}
                    $smallBlackBtn $size="18%,25px" >+100만
                  </Button>
                </SmallButtonsContainer>
            </InputDiv>

            <hr />
            <InputDiv style={{alignItems:"center"}}>
                <InputTitle>남은 금액</InputTitle>
                <Input $active $size="86%,40px"></Input>
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
