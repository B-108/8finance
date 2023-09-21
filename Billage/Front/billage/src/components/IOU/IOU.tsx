import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Amount, Content, Dates, IOUContainer, IOUContent, Title } from './IOU.style';
import Image from '../Common/Image';
import logo from '/src/assets/logo.png';
import styled from 'styled-components';

function IOU() {
    const [debtor, setDebtor] = useState<string>('');
    const [creditor, setCreditor] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [money, setMoney] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [interest, setInterest] = useState<string>('');

    return (
        <IOUContainer>
            <WatermarkContainer>
                <Image src={logo} alt="logo" width="150px"></Image>
                <WatermarkText>Watermark Text</WatermarkText>
            </WatermarkContainer>
            <IOUContent>
                <Title>차 용 증</Title>
                <Amount>\ {money} 원</Amount>
                <Content>
                    위 금액을 채무자{debtor}가 채권자{creditor}로부터 {startDate}일 틀림없이 빌렸습니다.
                </Content>
                <hr />

                <Content>
                    채무자{debtor}는 위 금액을 연 이자{interest}로 하여 {endDate}일까지 채권자{creditor}에게 갚겠습니다.
                </Content>

                <Dates>날짜: {startDate} 일</Dates>
            </IOUContent>
        </IOUContainer>
    );
}

export default IOU;

const WatermarkContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WatermarkText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px; /* 워터마크 텍스트의 크기 조절 */
    opacity: 0.3; /* 워터마크 텍스트의 투명도 조절 */
    pointer-events: none; /* 클릭 이벤트 무시 */
`;
