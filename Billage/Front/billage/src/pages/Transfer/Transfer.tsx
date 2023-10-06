import React, { useState, useEffect, useRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

// 공통 컴포넌트 및 이미지
import Input, { ButtonBox, ButtonInput, InputDiv } from '/src/components/Common/Input';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';
import Image from '/src/components/Common/Image';
import calendar from '/src/assets/calendar.svg';
import magnifyingGlass from '/src/assets/magnifyingGlass.svg';

// 스타일 컴포넌트
import { ButtonContainer, SmallButtonsContainer, TranInputDiv, TranInputTitle } from './Transfer.style';

// 타입스크립트
import { IOUProps } from '/src/type/iou';
import { AccountType } from '/src/type/account';
import { UserType } from '/src/type/user';
import { getAccountList } from '/src/api/account';
import { getUserList } from '/src/api/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankListState } from '/src/recoil/account';
import { creditorUserPhoneState, useIOUCheckState, useIOUState } from '/src/recoil/iou';
import { NameState } from '/src/recoil/auth';

// 모달용 알림창
import ConfirmContext from '/src/context/confirm/ConfirmContext';

function Transfer() {
    //recoil
    const [IOU, setIOU] = useIOUState();
    const [IOUCheck, setIOUCheck] = useIOUCheckState();

    // 내 이름
    const [name, setName] = useRecoilState<string>(NameState);
    const [creditorPhone, setCreditorPhone] = useRecoilState<string>(creditorUserPhoneState);

    const [friendInfo, setFriendInfo] = useState<string>('');
    const [transferDate, setTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [autoTransferDate, setAutoTransferDate] = useState<Date | null>(null); // Date 타입으로 상태 변경
    const [amountInfo, setAmountInfo] = useState<string>('0');
    const [interest, setInterest] = useState<string>('0');
    const [totalAmount, setTotalAmount] = useState<string>('0');
    const yourRef = useRef(null);
    // 자동이체 체크박스 상태
    // const [autoTransfer, setAutoTransfer] = useState<boolean>(false);

    // 라우터
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoBack = () => {navigate(-1);};

    //작성 취소 버튼 클릭시 활성
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // 다이얼로그 상태 추가

    // 내 계좌 목록
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [myAccountInfo, setMyAccountInfo] = useState<string>('');
    const [myAccountInfoCode, setMyAccountInfoCode] = useState<string>('');

    // Recoil에서 정의한 BankListState 상태를 가져옵니다.
    const bankList = useRecoilValue(BankListState);

    // 은행 코드에 해당하는 은행 이름을 찾는 함수
    const findBankNameByCode = (bankCode) => {
        const bank = bankList.find((bank) => bank?.code?.includes(bankCode));
        return bank ? bank.bankName : '';
    };
    const selectedBankCode = myAccountInfoCode;
    const bankName = findBankNameByCode(selectedBankCode);

    // 유저 목록
    const [users, setUsers] = useState<UserType[]>([]);
    // 유저이름(폰번호 뒷자리)
    const [userInfo, setUserInfo] = useState<string>('');
    // 빌리는 상대pk
    const [friendPk, setFriendPk] = useState<number>(0);

    const handleCancelClick = () => {
        openConfirm()
        // setIsCancelDialogOpen(true);
    };

    // const handleConfirmCancel = () => {
    //     setIsCancelDialogOpen(false);
    // };

    const handleFriendInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInfo(event.target.value);
    };
    const handleMyAccountInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMyAccountInfo(event.target.value);
    };
    const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalAmount(event.target.value);
    };
    const handleTransferDateChange = (date: Date | null) => {
        setTransferDate(date);
    };

    const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, '');
        setInterest(inputValue);
    };
    const calculateTotalAmount = () => {
        // 이자율과 빌릴 금액 숫자로 변환
        const interestRate = parseFloat(interest);
        const loanAmount = parseInt(amountInfo.replace(/,/g, ''));
        // 이자 계산
        const interestAmount = (interestRate / 100) * loanAmount;
        // 총 상환 금액 계산 (빌릴 금액 + 이자)
        const totalAmount = loanAmount + interestAmount;
        setTotalAmount(totalAmount.toFixed(0));
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [interest, amountInfo]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.value === "") {
        setAmountInfo("0")
      }
      else {
        const inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        setAmountInfo(inputValue);
      }
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
            if (response?.data.length > 0) {
              const selectedAcount = response?.data.find((account,index) => account.accountMainYn === true);
              if (selectedAcount) {
                  setMyAccountInfo(selectedAcount.accountNum);
                  setMyAccountInfoCode(selectedAcount.accountBankCode);}}
        } 
        catch (error) {
            console.log(error);
        }
    };
    // 유저 조회
    const axiosUserList = async (): Promise<void> => {
        try {
            if(!friendInfo){return}
            const response = await getUserList(friendInfo);
            setUsers(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const myAccountInfoCombined = `${bankName} ${myAccountInfo}`;

    // 차용증 생성
    const recoilPostIOU = async () => {
        const iouData: IOUProps = {
            creditorUser: friendPk, // 채권자 사용자 ID
            contractDebtorAcNum: myAccountInfoCombined,
            contractMaturityDate: transferDate ? transferDate.toISOString().split('T')[0] : '', // Date 객체를 문자열로 변환
            contractAutoTranYn: false,
            contractAutoDate: '',
            contractAmt: amountInfo,
            contractInterestRate: interest,
            contractDueAmt: totalAmount,
        };

        const iouCheckData = {
            contractAmtCheck: amountInfo,
            contractMaturityDateCheck: transferDate ? transferDate.toISOString().split('T')[0] : '',
            contractInterestRateCheck: interest,
            creditorUserNameCheck: friendInfo,
            debtorUserNameCheck: name,
            contractStartDateCheck: new Date().toISOString().split('T')[0],
        };

        try {
            // Recoil 상태 업데이트
            await setIOU(iouData);
            await setIOUCheck(iouCheckData);

            navigate('/ioucheck');
            console.log('차용증이 임시 생성되었습니다.');
        } catch (error) {
            console.error('차용증 임시 생성에 실패했습니다.', error);
        }
    };

    //useEffect
    useEffect(() => {
        axiosAccountList()
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            const selectedUser = users.find((user) => user.userName === friendInfo);
            if (selectedUser) {
                const userCellNo = selectedUser.userCellNo;
                setCreditorPhone(userCellNo)
                const lastFourDigits = userCellNo.slice(-4);
                setUserInfo(`${selectedUser.userName} (${lastFourDigits})`);
                setFriendPk(selectedUser.userPk);
            }
        }
    }, [users, friendInfo]);


    // ConFirm 모달 창
    const { confirm: confirmComp } = useContext(ConfirmContext);

    const onConfirmClick = async (text: string) => {
      const result = await confirmComp(text);
      return result;
    };

    const openConfirm = async () => {
      const nextAction = await onConfirmClick("작성을 취소하시겠습니까?");
      if (nextAction) {
        handleGoBack()
      }
      return;
    };

    return (
        <CenteredContainer>
            <Header headerTitle="차용증 작성"></Header>

            <TranInputDiv>
                <TranInputTitle>지인 선택</TranInputTitle>
                <InputDiv style={{ marginBottom: '1rem' }}>
                    <Input 
                      value={friendInfo} 
                      $size="88%,40px" 
                      $active  
                      onChange={handleFriendInfoChange} />
                    <ButtonBox>
                        <Image src={magnifyingGlass} alt="magnifyingGlass" onClick={axiosUserList}></Image>
                    </ButtonBox>
                </InputDiv>
                <InputDiv style={{ marginBottom: '0.5rem' }}>
                  <select
                      value={friendInfo}
                      onChange={handleFriendInfoChange}
                      style={{
                        padding:"0px 1% 0px 1%",
                        width: '94%', 
                        height: '45px', 
                        borderRadius: '10px', 
                        border: '3px solid #BDBDBD', 
                        fontSize: "16px"}}>
                      {users.map((user) => (
                          <option key={user.userPk} value={userInfo}>
                              {userInfo}
                          </option>))}
                  </select>
                </InputDiv>
            </TranInputDiv>

            <TranInputDiv>
                <TranInputTitle>돈 받을 계좌</TranInputTitle>
                <InputDiv>
                  <select
                      value={myAccountInfo}
                      onChange={handleMyAccountInfoChange}
                      style={{
                        padding:"0px 1% 0px 1%",
                        width: '94%', 
                        height: '45px', 
                        borderRadius: '10px', 
                        border: '3px solid #BDBDBD',
                        fontSize: "16px" }}>
                      {accounts.map((account) => (
                          <option key={account.accountId} value={account.accountNum}>
                              {account.accountNum}
                          </option>
                      ))}
                  </select>
                </InputDiv>
            </TranInputDiv>
            <TranInputDiv>
                <TranInputTitle>돈 갚을 날짜</TranInputTitle>
                <DatePicker
                    selected={transferDate}
                    onChange={handleTransferDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                        <ButtonInput
                            ref={yourRef}
                            value={transferDate ? transferDate.toISOString() : ''}
                            $active
                            $size="88%,40px"
                            $buttonImage={calendar}/>}/>
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
                        style={{
                          
                          margin: '7px 0px 0px 5px' }}
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
                <Button 
                    style={{lineHeight : "50px"}}
                    $basicGrayBtn $size="48%, 45px" onClick={handleCancelClick}>
                    작성취소
                </Button>
                <Button 
                    style={{lineHeight : "50px"}}
                    $basicGreenBtn $size="48%, 45px" onClick={recoilPostIOU}>
                    작성완료
                </Button>
            </ButtonContainer>
            {/* {isCancelDialogOpen && <ConfirmBox onCancel={handleConfirmCancel} onConfirm={() => navigate(-1)} />} */}
        </CenteredContainer>
    );
}

export default Transfer;
