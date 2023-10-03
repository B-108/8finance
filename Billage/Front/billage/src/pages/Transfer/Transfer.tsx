// Transfer.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from 'react-router-dom';

// 공통 컴포넌트 및 이미지
import Input, { ButtonInput } from '/src/components/Common/Input';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';
import ConfirmBox from '/src/components/Common/YesOrNo';

import plus from '/src/assets/plus.svg';
import calendar from '/src/assets/calendar.svg';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';

// 스타일 컴포넌트
import { 
  ButtonContainer, 
  SmallButtonsContainer, 
  TranInputDiv, 
  TranInputTitle } from './Transfer.style';

// 타입스크립트
import { IOUProps } from '/src/type/iou';
import { postIOU } from '/src/api/iou';


function Transfer() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<string>('');
    const [transferDate, setTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [autoTransferDate, setAutoTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [amountInfo, setAmountInfo] = useState<string>('0');
    const [interest, setInterest] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<string>('0');
    const [autoTransfer, setAutoTransfer] = useState<boolean>(false); // 자동이체 체크박스 상태
    const navigate = useNavigate()

    //작성 취소 버튼 클릭시 활성
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // 다이얼로그 상태 추가
 
    const handleCancelClick = () => {
        setIsCancelDialogOpen(true);
    };

    const handleConfirmCancel = () => {
        setIsCancelDialogOpen(false);
    };

    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo(event.target.value);
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
        setAutoTransfer(!autoTransfer); // 체크박스 상태 반전
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 입력값에서 숫자만 추출
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자 외의 문자는 제거
        setAmountInfo(inputValue);
    };

    const handleButtonClick = (increment: number) => {
        setAmountInfo((prevAmount) => (parseInt(prevAmount) + increment).toString());
    };

    // 채용증 생성 요청을 보내는 함수
    const axiosPostIOU = async () => {
        const iouData: IOUProps = {
            creditorUser: 2, // 채권자 사용자 ID
            contractDebtorAcNum: accountInfo,
            contractMaturityDate: transferDate ? transferDate.toISOString() : '', // Date 객체를 문자열로 변환
            contractAutoTranYn: autoTransfer,
            contractAutoDate: autoTransferDate ? autoTransferDate.toISOString() : '', // Date 객체를 문자열로 변환
            contractAmt: amountInfo,
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
                    $size="88%,40px"
                    onChange={handleFriendInfoChange}
                    $buttonImage={magnifyingGlass}
                />
            </TranInputDiv>

            <TranInputDiv>
                <TranInputTitle>돈 받을 계좌</TranInputTitle>
                <ButtonInput
                    value={accountInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleAccountInfoChange}
                    $buttonImage={plus}
                />
            </TranInputDiv>
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
                            $size="88%,40px"
                            $buttonImage={calendar}
                        />
                    }
                />
            </TranInputDiv>

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
                            $size="88%,40px"
                            $buttonImage={calendar}
                        />
                    }
                />
            </TranInputDiv>

            <TranInputDiv style={{ alignItems: 'center' }}>
                <TranInputTitle>빌릴 금액</TranInputTitle>
                <Input
                    value={amountInfo.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // 숫자 포맷팅
                    $active
                    $size="88%,40px"
                    $position
                    onChange={handleAmountChange}
                    type="amount"
                    $inputMode="numeric"
                ></Input>
                <SmallButtonsContainer>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="100%,25px"
                        onClick={() => handleButtonClick(10000)}
                    >
                        +1만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="100%,25px"
                        onClick={() => handleButtonClick(50000)}
                    >
                        +5만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="100%,25px"
                        onClick={() => handleButtonClick(100000)}
                    >
                        +10만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="100%,25px"
                        onClick={() => handleButtonClick(1000000)}
                    >
                        +100만
                    </Button>
                </SmallButtonsContainer>
            </TranInputDiv>

            <TranInputDiv style={{ alignItems: 'center' }}>
                <TranInputTitle>이자율</TranInputTitle>
                <Input
                    type="interest"
                    value={interest}
                    $active
                    $size="88%,40px"
                    $position
                    onChange={handleInterestChange}
                ></Input>
            </TranInputDiv>

            <TranInputDiv style={{ alignItems: 'center' }}>
                <TranInputTitle>총 상환 금액</TranInputTitle>
                <Input
                    value={totalAmount}
                    $active
                    $size="88%,40px"
                    onChange={handleTotalAmountChange}
                    $position
                ></Input>
            </TranInputDiv>
            <ButtonContainer>
                <Button $basicGrayBtn $size="48%, 50px"onClick={handleCancelClick}>
                    작성취소
                </Button>
                <Button $basicGreenBtn $size="48%, 50px" onClick={axiosPostIOU}>
                    작성완료
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default Transfer;
