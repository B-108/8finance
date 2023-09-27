// Transfer.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 공통 컴포넌트 및 이미지
import Input, { ButtonInput } from '/src/components/Common/Input';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';

import plus from '/src/assets/plus.svg';
import calendar from '/src/assets/calendar.svg';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';

// 스타일 컴포넌트
import { ButtonContainer, SmallButtonsContainer, TranInputDiv, TranInputTitle } from './Transfer.style';

// 타입스크립트
import { IOUProps } from '/src/type/iou';
import { postIOU } from '/src/api/iou';

function Transfer() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [transferDate, setTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [autoTransferDate, setAutoTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [amount, setAmount] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<string>('');
    const [autoTransfer, setAutoTransfer] = useState<boolean>(false); // 자동이체 체크박스 상태

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

    // Date 타입 상태 변경 함수
    const handleTransferDateChange = (date: Date | null) => {
        setTransferDate(date);
    };
    const handleAutoTransferDateChange = (date: Date | null) => {
        setAutoTransferDate(date);
    };

    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterest(event.target.value);
    };

    const handleAutoTransferChange = () => {
        // 자동이체 체크박스가 변경될 때 호출되는 함수
        setAutoTransfer(!autoTransfer); // 체크박스 상태를 반전시킴
    };

    // 채용증 생성 요청을 보내는 함수
    const axiosPostIOU = async () => {
        const iouData: IOUProps = {
            creditorUser: 2, // 채권자 사용자 ID
            contractDebtorAcNum: accountInfo,
            contractMaturityDate: transferDate ? transferDate.toISOString() : '', // Date 객체를 문자열로 변환
            contractAutoTranYn: autoTransfer,
            contractAutoDate: autoTransferDate ? autoTransferDate.toISOString() : '', // Date 객체를 문자열로 변환
            contractAmt: amount,
            contractInterestRate: interest,
            contractDueAmt: totalAmount,
        };

        // 차용증 생성 요청API.
        try {
            await postIOU(iouData);
            console.log('차용증이 성공적으로 생성되었습니다.');
        } catch (error) {
            console.error('차용증 생성에 실패했습니다.', error);
        }
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
                    $buttonImage={magnifyingGlass}
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
                    $buttonImage={plus}
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>돈 갚을 날짜</TranInputTitle>
                <DatePicker
                    selected={transferDate}
                    onChange={handleTransferDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                        <ButtonInput
                            value={transferDate ? transferDate.toISOString() : ''}
                            $active
                            $size="98%,40px"
                            $buttonImage={calendar}
                        />
                    }
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>
                    자동이체
                    <input type="checkbox" id="myCheckbox" checked={autoTransfer} onChange={handleAutoTransferChange} />
                </TranInputTitle>
                <DatePicker
                    selected={autoTransferDate}
                    onChange={handleAutoTransferDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                        <ButtonInput
                            value={autoTransferDate ? autoTransferDate.toISOString() : ''}
                            $active
                            $size="98%,40px"
                            $buttonImage={calendar}
                        />
                    }
                />
            </TranInputDiv>
            <hr />
            <TranInputDiv>
                <TranInputTitle>빌릴 금액</TranInputTitle>
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
            <ButtonContainer>
                <Button $basicGrayBtn $size="100%, 50px" style={{ margin: '10px' }}>
                    작성취소
                </Button>
                <Button $basicGreenBtn $size="100%, 50px" style={{ margin: '10px' }} onClick={axiosPostIOU}>
                    작성완료
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default Transfer;
