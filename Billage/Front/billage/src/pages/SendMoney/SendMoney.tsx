import Input, { ButtonInput } from '/src/components/Common/Input';
import React, { useState } from 'react';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import plus from '/src/assets/plus.svg';
import Button from '/src/components/Common/Button';
import { ButtonContainer, InputDiv, InputTitle, SmallButtonsContainer } from './SendMoney.style';

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
                <Input value={friendInfo} $active $size="98%,40px" onChange={handleFriendInfoChange}></Input>
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>상대방 계좌</InputTitle>
                <Input value={accountInfo} $active $size="98%,40px" onChange={handleAccountInfoChange}></Input>
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>내 계좌</InputTitle>
                <ButtonInput
                    value={myAccountInfo}
                    $active
                    $size="98%,40px"
                    onChange={handleMyAccountInfoChange}
                    $buttonImage={plus} // 이미지 버튼 추가
                />
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>돌려줄 금액</InputTitle>

                <Input value={amount} $active $size="98%,40px" onChange={handleAmountChange}></Input>
                <SmallButtonsContainer>
                    <Button $smallBlackBtn $size="10%,25px" style={{ margin: '6px' }}>
                        +1만
                    </Button>
                    <Button $smallBlackBtn $size="10%,25px" style={{ margin: '6px' }}>
                        +5만
                    </Button>
                    <Button $smallBlackBtn $size="10%,25px" style={{ margin: '6px' }}>
                        +10만
                    </Button>
                    <Button $smallBlackBtn $size="10%,25px" style={{ margin: '6px' }}>
                        +100만
                    </Button>
                </SmallButtonsContainer>
            </InputDiv>
            <hr />
            <InputDiv>
                <InputTitle>남은 금액</InputTitle>
                <Input $active $size="98%,40px"></Input>
            </InputDiv>
            <hr />
            <ButtonContainer>
                <Button $basicGrayBtn $size="100%, 50px" style={{ margin: '10px' }}>
                    작성취소
                </Button>
                <Button $basicGreenBtn $size="100%, 50px" style={{ margin: '10px' }}>
                    작성완료
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default SendMoney;
