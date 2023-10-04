// Transfer.tsx

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

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
import { ButtonContainer, SmallButtonsContainer, TranInputDiv, TranInputTitle } from './Transfer.style';

// 타입스크립트
import { IOUProps } from '/src/type/iou';
import { postIOU } from '/src/api/iou';
import { AccountType } from '/src/type/account';
import { UserType } from '/src/type/user';
import { getAccountList } from '/src/api/account';
import { UserState } from '/src/recoil/user';
import { useRecoilState } from 'recoil';
import { getUserList } from '/src/api/user';

function Transfer() {
    const [friendInfo, setFriendInfo] = useState<string>('');
    const [myAccountInfo, setMyAccountInfo] = useState<string>('');
    const [myAccountInfoCode, setMyAccountInfoCode] = useState<string>('');
    const [transferDate, setTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [autoTransferDate, setAutoTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [amountInfo, setAmountInfo] = useState<string>('0');
    const [interest, setInterest] = useState<string>('0');
    const [totalAmount, setTotalAmount] = useState<string>('0');

    // 자동이체 체크박스 상태
    // const [autoTransfer, setAutoTransfer] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    //작성 취소 버튼 클릭시 활성
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // 다이얼로그 상태 추가

    //내 계좌 목록
    const [accounts, setAccounts] = useState<AccountType[]>([]);

    // 유저 목록
    const [users, setUsers] = useState<UserType[]>([]);

    const handleCancelClick = () => {
        setIsCancelDialogOpen(true);
    };

    const handleConfirmCancel = () => {
        setIsCancelDialogOpen(false);
    };

    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleMyAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMyAccountInfo(event.target.value);
    };
    const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalAmount(event.target.value);
    };

    // Date 타입 상태 변경 함수
    const handleTransferDateChange = (date: Date | null) => {
        setTransferDate(date);
    };
    // const handleAutoTransferDateChange = (date: Date | null) => {
    //     setAutoTransferDate(date);
    // };

    // const handleAutoTransferChange = () => {
    //     setAutoTransfer(!autoTransfer); // 체크박스 상태 반전
    // };
    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 입력값에서 숫자만 추출
        const inputValue = event.target.value.replace(/[^0-9.]/g, ''); // 숫자와 소수점만 허용
        setInterest(inputValue);
    };
    const calculateTotalAmount = () => {
        // 이자율과 빌릴 금액을 숫자로 변환
        const interestRate = parseFloat(interest);
        const loanAmount = parseInt(amountInfo.replace(/,/g, ''));

        // 이자 계산
        const interestAmount = (interestRate / 100) * loanAmount;

        // 총 상환 금액 계산 (빌릴 금액 + 이자)
        const totalAmount = loanAmount + interestAmount;

        // 숫자 포맷팅 및 업데이트
        setTotalAmount(totalAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [interest, amountInfo]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 입력값에서 숫자만 추출
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자 외의 문자는 제거
        setAmountInfo(inputValue);
    };

    const handleButtonClick = (increment: number) => {
        setAmountInfo((prevAmount) => (parseInt(prevAmount) + increment).toString());
    };

    //Axios
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
    // 전체 유저조회
    const axiosUserList = async (): Promise<void> => {
        try {
            const response = await getUserList();
            setUsers(response?.data);
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // 차용증 생성
    const axiosPostIOU = async () => {
        const iouData: IOUProps = {
            creditorUser: 2, // 채권자 사용자 ID
            contractDebtorAcNum: myAccountInfo,
            contractMaturityDate: transferDate ? transferDate.toISOString() : '', // Date 객체를 문자열로 변환
            contractAutoTranYn: false,
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

    //useEffect
    useEffect(() => {
        axiosAccountList();
    }, []);

    useEffect(() => {
        axiosUserList();
    }, []);

    return (
        <CenteredContainer>
            <Header headerTitle="차용증 작성"></Header>

            <TranInputDiv>
                <TranInputTitle>지인 선택</TranInputTitle>
                {/* <ButtonInput
                    value={friendInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleFriendInfoChange}
                    $buttonImage={magnifyingGlass}
                /> */}
                <select
                    value={friendInfo}
                    onChange={handleFriendInfoChange}
                    style={{ width: '95%', height: '40px', borderRadius: '10px', border: '3px solid #BDBDBD' }}
                >
                    {users.map((user) => (
                        <option key={user.userPk} value={user.userName}>
                            {user.userName}
                        </option>
                    ))}
                </select>
            </TranInputDiv>

            <TranInputDiv>
                <TranInputTitle>돈 받을 계좌</TranInputTitle>
                {/* <ButtonInput
                    value={myAccountInfo}
                    $active
                    $size="88%,40px"
                    onChange={handleMyAccountInfoChange}
                    $buttonImage={plus}
                ></ButtonInput> */}
                <select
                    value={myAccountInfo}
                    onChange={handleMyAccountInfoChange}
                    style={{ width: '95%', height: '40px', borderRadius: '10px', border: '3px solid #BDBDBD' }}
                >
                    {accounts.map((account) => (
                        <option key={account.accountId} value={account.accountNum}>
                            {account.accountNum}
                        </option>
                    ))}
                </select>
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

            {/* <TranInputDiv>
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
                            $checkBox={autoTransfer}
                        />
                    }
                />
            </TranInputDiv> */}

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
                        $size="18%,25px"
                        onClick={() => handleButtonClick(10000)}
                    >
                        +1만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="18%,25px"
                        onClick={() => handleButtonClick(50000)}
                    >
                        +5만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="18%,25px"
                        onClick={() => handleButtonClick(100000)}
                    >
                        +10만
                    </Button>
                    <Button
                        style={{ margin: '7px 0px 0px 5px' }}
                        $smallBlackBtn
                        $size="18%,25px"
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
                    value={totalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // 숫자 포맷팅
                    $active
                    $size="88%,40px"
                    onChange={handleTotalAmountChange}
                    $position
                    disabled
                ></Input>
            </TranInputDiv>
            <ButtonContainer>
                <Button $basicGrayBtn $size="48%, 50px" onClick={handleCancelClick}>
                    작성취소
                </Button>
                <Button $basicGreenBtn $size="48%, 50px" onClick={axiosPostIOU}>
                    작성완료
                </Button>
            </ButtonContainer>
            {isCancelDialogOpen && <ConfirmBox onCancel={handleConfirmCancel} onConfirm={() => navigate(-1)} />}
        </CenteredContainer>
    );
}

export default Transfer;
