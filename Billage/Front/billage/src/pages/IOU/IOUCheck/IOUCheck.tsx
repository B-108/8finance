import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

// 공용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';

// 스타일 컴포넌트
import {
    AgreementDiv,
    Amount,
    Checkbox,
    Content,
    Dates,
    IOUContainer,
    IOUContent,
    Title,
    UserBox,
    UserInfo,
    UserName,
    UserPhone,
    UserType,
    WatermarkContainer,
    WatermarkImage,
    WatermarkText,
} from './IOUCheck.style';

// 이미지
import logo from '/src/assets/logo.png';

//navigate
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonContainer } from './IOUCheck.style';

//recoil
import { useRecoilState } from 'recoil';
import { IOUCheckState, IOUState, creditorUserPhoneState } from '/src/recoil/iou';
import { PhoneState } from '/src/recoil/auth';
import { IOUProps } from '/src/type/iou';
import { postIOU } from '/src/api/iou';
import AlertSimpleContext from '/src/context/alertSimple/AlertSimpleContext';
import ConfirmBox from '/src/components/Common/YesOrNo';
import ConfirmContext from '/src/context/confirm/ConfirmContext';
import AlertContext from '/src/context/alert/AlertContext';

function IOUCheck() {
    const [isChecked, setIsChecked] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null!);
    const currentDate = new Date().toISOString().split('T')[0];
    const [creditorPhone, setCreditorPhone] = useRecoilState<string>(creditorUserPhoneState);

    const [phone, setPhone] = useRecoilState<string>(PhoneState);

    // ConFirm 모달 창
    const { confirm: confirmComp } = useContext(ConfirmContext);

    const onConfirmClick = async (text: string) => {
        const result = await confirmComp(text);
        console.log('custom', result);
        return result;
    };

    const openConfirm = async () => {
        const nextAction = await onConfirmClick('요청을 취소하시겠습니까?');
        if (nextAction) {
            navigate(-1);
        }
        return;
    };
    //작성 취소 버튼 클릭시 활성
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // 다이얼로그 상태 추가

    const handleCancelClick = () => {
        setIsCancelDialogOpen(true);
    };
    const handleConfirmCancel = () => {
        setIsCancelDialogOpen(false);
    };

    const navigate = useNavigate();
    const moveMain = async () => {
        if (!isChecked) {
            onAlertSimpleClick('필수 동의 항목을 확인하세요!');
            return;
        }
        const Certain = await axiosPostIOU();
        if (Certain && isChecked) {
            onAlertClick("요청을 완료했어요")
            navigate(`/`);
        }
    };

    // Recoil 상태에서 데이터 읽어오기
    const [iouCheck] = useRecoilState(IOUCheckState);
    const {
        contractAmtCheck, // 빌린 금액
        contractMaturityDateCheck, // 돈 갚을 날짜
        contractInterestRateCheck, // 이자율
        creditorUserNameCheck, // 채권자 이름
        debtorUserNameCheck, // 채무자 이름
        contractStartDateCheck, // 빌리는 날짜
    } = iouCheck;

    // console.log(iouCheck);

    const [contract] = useRecoilState(IOUState);
    const {
        creditorUser,
        contractDebtorAcNum,
        contractMaturityDate,
        contractAutoTranYn,
        contractAutoDate,
        contractAmt,
        contractInterestRate,
        contractDueAmt,
    } = contract;
    // console.log('차용증', contract);

    // 차용증 생성
    const axiosPostIOU = async () => {
        const iouData: IOUProps = {
            creditorUser: creditorUser, // 채권자 사용자 ID
            contractDebtorAcNum: contractDebtorAcNum,
            contractMaturityDate: contractMaturityDate,
            contractAutoTranYn: contractAutoTranYn,
            contractAutoDate: contractAutoDate,
            contractAmt: contractAmt,
            contractInterestRate: contractInterestRate,
            contractDueAmt: contractDueAmt,
        };
        console.log('차용증', iouData);

        // 차용증 생성 요청API.
        try {
            const response = await postIOU(iouData);
            if (response === 200) {
                onAlertSimpleClick('차용증을 생성했습니다.');
                return true;
            }
        } catch (error) {
            onAlertSimpleClick('차용증 생성에 실패했습니다.');
            console.log(error);
        }
    };
    
    const { alert: alertSimpleComp } = useContext(AlertSimpleContext);

    const onAlertSimpleClick = async (text: string) => {
        const result = await alertSimpleComp(text);
    };


    // Alert 창
    const [isEnd, setIsEnd] = useState(false);

    const HandleIsEnd = useCallback(() => {
      setIsEnd(!isEnd);
    }, [isEnd]);

    const { alert: alertComp } = useContext(AlertContext);
    
    const onAlertClick = async (text: string) => {
      const result = await alertComp(text);
      console.log("custom", result);
      HandleIsEnd();
    };

    return (
        <CenteredContainer>
            <Header headerTitle="거래하기"></Header>
            <IOUContainer ref={contentRef}>
                <WatermarkContainer>
                    <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                </WatermarkContainer>

                <IOUContent>
                    <Title>차 용 증</Title>
                    <div style={{ width: '100%', height: '225px' }}>
                        <Amount>￦ {contractAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (원)</Amount>
                        <hr />
                        <Content>
                            위 금액을 채무자({debtorUserNameCheck})가 채권자({creditorUserNameCheck}) 로부터{' '}
                            {contractStartDateCheck}일 틀림없이 빌렸습니다.
                        </Content>
                        <Content>
                            채무자({debtorUserNameCheck})는 위 금액을 이자 {contractInterestRateCheck}%로 하여{' '}
                            {contractMaturityDate}일까지 채권자({creditorUserNameCheck}) 에게 갚겠습니다.
                        </Content>
                    </div>
                    <Dates>{currentDate}</Dates>
                    <hr />

                    <UserBox>
                        <UserType>채권자</UserType>
                        <UserInfo>
                            <UserName>이름 : {creditorUserNameCheck}</UserName>
                            <UserPhone>전화번호 : {creditorPhone}</UserPhone>
                        </UserInfo>
                    </UserBox>

                    <UserBox>
                        <UserType>채무자</UserType>
                        <UserInfo>
                            <UserName>이름 : {debtorUserNameCheck}</UserName>
                            <UserPhone>전화번호 : {phone}</UserPhone>
                        </UserInfo>
                    </UserBox>
                </IOUContent>

                <WatermarkText>
                    *본 문서는 Billage에서 발행한 차용증이며,
                    <br />
                    사전에 채권자, 채무자의 상호 동의를 거친 후 작성된 것임을 알려드립니다.
                </WatermarkText>
            </IOUContainer>

            <AgreementDiv>
                <Checkbox type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />위 정보가
                정확한지 확인 했어요 (필수)
            </AgreementDiv>

            <ButtonContainer>
                <Button
                    $basicGrayBtn
                    $size="48%,45px"
                    onClick={() => {
                        openConfirm();
                    }}
                >
                    요청취소
                </Button>
                <Button $basicGreenBtn $size="48%,45px" onClick={moveMain}>
                    요청하기
                </Button>
            </ButtonContainer>
        </CenteredContainer>
    );
}

export default IOUCheck;
