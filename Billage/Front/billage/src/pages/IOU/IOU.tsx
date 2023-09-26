import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

// 공용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';

// 스타일 컴포넌트
import {
    Amount,
    Content,
    Dates,
    IOUContainer,
    IOUContent,
    Title,
    WatermarkContainer,
    WatermarkImage,
    WatermarkText,
} from './IOU.style';

//이미지
import logo from '/src/assets/logo.png'

// 타입스크립트
import { IOUProps } from '/src/type/iou';
import { getIOU, postIOU } from '/src/api/iou';

function IOUPage() {
    const [creditor, setCreditor] = useState<string>(''); //채권자
    const [debtor, setDebtor] = useState<string>(''); // 채무자
    const [amount, setAmount] = useState<string>(''); //금액
    const [startDate, setStartDate] = useState<string>(''); //빌린 날짜
    const [endDate, setEndDate] = useState<string>(''); // 갚을 날짜
    const [interest, setInterest] = useState<string>(''); //이자율
    const [creditorPhone, setCreditorPhone] = useState<string>(''); // 채권자 폰 번호
    const [debtorPhone, setDebtorPhone] = useState<string>(''); // 채무자 폰 번호
    const [iou, setIOU] = useState<string>(''); // 차용증


    const handleDownload = () => {
        console.log('다운로드');
    };

    const axiosGetIOU = async () => {
        
        // 차용증 생성 요청API.
        try {
            const response = await getIOU();
            console.log('차용증 조회 성공',response);
        } catch (error) {
            console.error('차용증 조회 실패', error);
        }
    };
    
    return (
        <>
            <CenteredContainer $center>
                <Header headerTitle="차용증"></Header>
                <IOUContainer>
                    <WatermarkContainer>
                        <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                        <WatermarkText>
                            *본 문서는 Billage에서 발행한 차용증이며, 사전에 채권자, 채무자의 상호 동의를 거친 후 작성된
                            것임을 알려드립니다.
                        </WatermarkText>
                    </WatermarkContainer>
                    <IOUContent>
                        <Title>차 용 증</Title>
                        <div style={{ width: '90%', height: '35vh' }}>
                            <Amount>\ {amount} 원</Amount>
                            <hr />
                            <Content>
                             위 금액을 채무자({debtor})가 채권자({creditor})로부터 {startDate}일 틀림없이 빌렸습니다.
                            </Content>
                            <Content>
                                채무자({debtor})는 위 금액을 연 이자 {interest}%로 하여 {endDate}일까지 채권자(
                                {creditor})에게 갚겠습니다.
                            </Content>
                        </div>
                        <Dates>날짜: {startDate} 일</Dates>
                        <hr />
                        <div style={{ justifyContent: 'space-around', marginTop: 'auto' }}>
                            <div style={{ width: '50px', height: '50px', display: 'flex' }}>채권자</div>
                            <div style={{ display: 'flex' }}>
                                이름 : {creditor}최싸피
                                <br />
                                010 - 2256 - 9845{creditorPhone}
                            </div>
                            <div style={{ width: '50px', height: '50px', display: 'flex' }}>채무자</div>
                            <div style={{ display: 'flex' }}>
                                이름 : {debtor}이싸피
                                <br />
                                010 - 2256 - 9845{debtorPhone}
                            </div>
                        </div>
                    </IOUContent>
                </IOUContainer>
                <hr />
                <Button $basicGreenBtn $size="100%,43px" $Green onClick={handleDownload}>
                    다운로드
                </Button>
                <hr />
            </CenteredContainer>
        </>
    );
}

export default IOUPage;
