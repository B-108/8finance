import Input, { ButtonInput } from '/src/components/Common/Input';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import plus from '/src/assets/plus.svg';
import calendar from '/src/assets/calendar.svg';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';
import Button from '/src/components/Common/Button';
import { TranInputDiv, TranInputTitle } from './Transfer.style';

function Transfer() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [transferDate, setTransferDate] = useState(new Date());
    const [autoTransferDate, setAutoTransferDate] = useState(new Date());
    const [interest, setInterest] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<string>('');

    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
    };
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };
    const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalAmount(event.target.value);
    };
    const handleTransferDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransferDate(event.target.value);
    };
    const handleAutoTransferDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoTransferDate(event.target.value);
    };
    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterest(event.target.value);
    };

    return (
        <CenteredContainer>
            <Header headerTitle="차용증 작성"></Header>

            <TranInputDiv>
                <TranInputTitle>지인 선택</TranInputTitle>
                <ButtonInput
                    value={friendInfo}
                    $active
                    $size="98%,40px"
                    onChange={handleFriendInfoChange}
                    $buttonImage={magnifyingGlass} // 이미지 버튼 추가
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>돈 받을 계좌</TranInputTitle>
                <ButtonInput
                    value={accountInfo}
                    $active
                    $size="98%,40px"
                    onChange={handleAccountInfoChange}
                    $buttonImage={plus} // 이미지 버튼 추가
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>돈 갚을 날짜</TranInputTitle>
                <DatePicker
                    selected={transferDate}
                    onChange={(date) => setTransferDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={<ButtonInput value={transferDate} $active $size="98%,40px" $buttonImage={calendar} />}
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>
                    자동이체
                    <input type="checkbox" id="myCheckbox" />
                </TranInputTitle>
                <DatePicker
                    selected={autoTransferDate}
                    onChange={(date) => setAutoTransferDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                        <ButtonInput value={autoTransferDate} $active $size="98%,40px" $buttonImage={calendar} />
                    }
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>빌릴 금액</TranInputTitle>
                <Input value={amount} $active $size="98%,40px" onChange={handleAmountChange}></Input>
                <SmallButtonsContainer></SmallButtonsContainer>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>이자율</TranInputTitle>
                <Input
                    type="interest"
                    value={interest}
                    $active
                    $size="98%,40px"
                    onChange={handleInterestChange}
                ></Input>
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>총 상환 금액</TranInputTitle>
                <Input value={totalAmount} $active $size="98%,40px" onChange={handleTotalAmountChange}></Input>
            </TranInputDiv>
            <hr />
            <ButtonContainer></ButtonContainer>
        </CenteredContainer>
    );
}

export default Transfer;

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
