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

function IOUPage() {
    // Recoil 상태에서 데이터 읽어오기
    const [contract, setContract] = useRecoilState(contractState);
    const contentRef = useRef<HTMLDivElement>(null!);

    const currentDate = new Date().toISOString().split('T')[0];

    // API 요청을 수행하여 데이터 가져오기
    const axiosIOU = async (): Promise<void> => {
        try {
            const response = await getIOU();
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
        <>
            <CenteredContainer $center>
                <Header headerTitle="차용증"></Header>
                <div ref={contentRef}>
                    <IOUContainer>
                        <WatermarkContainer>
                            <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                            <WatermarkText>
                                *본 문서는 Billage에서 발행한 차용증이며, 사전에 채권자, 채무자의 상호 동의를 거친 후
                                작성된 것임을 알려드립니다.
                            </WatermarkText>
                        </WatermarkContainer>
                        <IOUContent>
                            <Title>차 용 증</Title>
                            <div style={{ width: '90%', height: '40vh' }}>
                                <Amount>￦ {contract.contractAmt} 원</Amount>
                                <hr />
                                <Content>
                                    위 금액을 채무자({contract.debtorUser})가 채권자({contract.creditorUser})로부터{' '}
                                    {contract.contractStartDate}일 틀림없이 빌렸습니다.
                                </Content>
                                <Content>
                                    채무자({contract.debtorUser})는 위 금액을 연 이자 {contract.contractInterestRate}%로
                                    하여 {contract.contractMaturityDate}일까지 채권자(
                                    {contract.creditorUser})에게 갚겠습니다.
                                </Content>
                            </div>
                            <Dates>날짜: {currentDate} 일</Dates>
                            <hr />
                            <div style={{ justifyContent: 'space-around', marginTop: 'auto' }}>
                                <div style={{ width: '50px', height: '50px', display: 'flex' }}>
                                    채권자 <br />
                                    이름 : {contract.creditorUser}
                                </div>
                                <hr />
                                <div style={{ width: '50px', height: '50px', display: 'flex' }}>
                                    채무자 <br />
                                    이름 : {contract.debtorUser}
                                </div>
                            </div>
                        </IOUContent>
                    </IOUContainer>
                    <hr />
                </div>
                <Button $basicGreenBtn $size="100%,43px" $Green onClick={handleDownload}>
                    다운로드
                </Button>
                <hr />
            </CenteredContainer>
        </>
    );
}

export default IOUPage;
