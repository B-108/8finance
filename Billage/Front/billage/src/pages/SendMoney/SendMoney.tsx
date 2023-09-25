import Input, { ButtonInput, InputDiv, TranInputDiv, TranInputTitle } from '/src/components/Common/Input';
import React, { useState } from 'react';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import plus from '/src/assets/plus.svg';
import Button from '/src/components/Common/Button';

function SendMoney() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [endDate, setEndDate] = useState(new Date());
    const [transferDate, setTransferDate] = useState<string>('');
    const [interest, setInterest] = useState<string>('');

    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleTransferDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };

    return (
        <CenteredContainer>
            <Header headerTitle="이체하기"></Header>
            <TranInputDiv>
                <TranInputTitle>돈 받을 계좌</TranInputTitle>
                <Input $active $size="98%,40px"></Input>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>상대방 계좌</TranInputTitle>
                <Input $active $size="98%,40px"></Input>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>내 계좌</TranInputTitle>
                <Input $active $size="98%,40px"></Input>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>돌려줄 금액</TranInputTitle>

                <Input value={amount} $active $size="98%,40px" onChange={handleAmountChange}></Input>
                <SmallButtonsContainer></SmallButtonsContainer>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>남은 금액</TranInputTitle>

                <Input
                    type="interest"
                    value={interest}
                    $active
                    $size="98%,40px"
                    onChange={handleInterestChange}
                ></Input>
            </TranInputDiv>
            <hr />
            <ButtonContainer></ButtonContainer>
        </CenteredContainer>
    );
}

export default SendMoney;

const SmallButtonsContainer = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </div>
    );
};

//하단 작성
const ButtonContainer = () => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                position: 'absolute',
                bottom: '20px',
            }}
        >
            <Button $basicGrayBtn $size="100%, 50px" style={{ margin: '10px' }}>
                작성취소
            </Button>
            <Button $basicGreenBtn $size="100%, 50px" style={{ margin: '10px' }}>
                작성완료
            </Button>
        </div>
    );
};
