import React, { useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useRecoilValue } from 'recoil'; // Recoil에서 상태값을 읽어오기 위해 추가
import { contractState } from 'src/recoil/iou';

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
    UserBox,
    UserInfo,
    UserName,
    UserPhone,
    UserType,
    WatermarkContainer,
    WatermarkImage,
    WatermarkText,
} from './IOU.style';

// 이미지
import logo from '/src/assets/logo.png';

// pdf 다운로드 라이브러리
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getIOU } from '/src/api/iou';


//navigate
import { useLocation } from 'react-router-dom';

function IOUPage() {
    // Recoil 상태에서 데이터 읽어오기
    const [contract, setContract] = useRecoilState(contractState);
    const contentRef = useRef<HTMLDivElement>(null!);

    const currentDate = new Date().toISOString().split('T')[0];

    const location  = useLocation()
    // API 요청을 수행하여 데이터 가져오기
    const axiosIOU = async (): Promise<void> => {
        try {
            const response = await getIOU(location.state.contractId);
            setContract(response?.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axiosIOU();
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행됨

    // handleDownload 및 기타 기능 함수 정의
    const handleDownload = async () => {
        console.log('다운로드');

        try {
            // HTML을 Canvas로 변환
            const canvas = await html2canvas(contentRef.current, {
                allowTaint: true,
            });

            // Canvas에서 PDF를 생성
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 페이지 크기
            pdf.save('iou.pdf'); // PDF 파일로 저장
        } catch (error) {
            console.error('다운로드 오류:', error);
        }
    };

    return (
        <CenteredContainer>
            <Header headerTitle="차용증"></Header>
            <IOUContainer ref={contentRef}>
                <WatermarkContainer>
                    <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                </WatermarkContainer>

                <IOUContent>
                    <Title>차 용 증</Title>
                    <div style={{ width: '100%', height: '225px' }}>
                        <Amount>￦ {contract?.contractAmt} (원)</Amount>
                        <hr />
                        <Content>
                            위 금액을 채무자({contract?.debtorUser.userName})가 채권자(
                            {contract?.creditorUser.userName})로부터 {contract?.contractStartDate}일 틀림없이
                            빌렸습니다.
                        </Content>
                        <Content>
                            채무자({contract?.debtorUser.userName})는 위 금액을 연 이자 {contract?.contractInterestRate}
                            %로 하여 {contract?.contractMaturityDate}일까지 채권자(
                            {contract?.creditorUser.userName})에게 갚겠습니다.
                        </Content>
                    </div>
                    <Dates>날짜: {currentDate} 일</Dates>
                    <hr />

                    <UserBox>
                        <UserType>채권자</UserType>
                        <UserInfo>
                            <UserName>이름 : 최싸피</UserName>
                            <UserPhone>전화번호 : 010-0000-0000</UserPhone>
                        </UserInfo>
                    </UserBox>

                    <UserBox>
                        <UserType>채무자</UserType>
                        <UserInfo>
                            <UserName>이름 : 김싸피</UserName>
                            <UserPhone>전화번호 : 010-0000-0000</UserPhone>
                        </UserInfo>
                    </UserBox>
                </IOUContent>

                <WatermarkText>
                    *본 문서는 Billage에서 발행한 차용증이며,
                    <br />
                    사전에 채권자, 채무자의 상호 동의를 거친 후 작성된 것임을 알려드립니다.
                </WatermarkText>
            </IOUContainer>

            <hr />
            <Button $basicGreenBtn $size="94%,43px" $Green onClick={handleDownload}>
                다운로드
            </Button>
            <hr />
        </CenteredContainer>
    );
}

export default IOUPage;
