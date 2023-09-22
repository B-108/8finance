import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Image from '../Common/Image';
import logo from '/src/assets/logo.png';
import styled from 'styled-components';
import theme from '/src/themes';

function IOU() {
    const [debtor, setDebtor] = useState<string>('');
    const [creditor, setCreditor] = useState<string>('');
    const [money, setMoney] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    return (
        <IOUContainer>
            <WatermarkContainer>
                <WatermarkImage src={logo} alt="logo" width="150px"></WatermarkImage>
                <WatermarkText>
                    *본 문서는 Billage에서 발행한 차용증이며, 사전에 채권자, 채무자의 상호 동의를 거친 후 작성된 것임을
                    알려드립니다.
                </WatermarkText>
            </WatermarkContainer>
            <IOUContent>
                <Title>차 용 증</Title>
                <div style={{ width: '90%', height: '40vh' }}>
                    <Amount>\ {money} 원</Amount>
                    <hr />
                    <Content>
                        위 금액을 채무자{debtor}가 채권자{creditor}로부터 {startDate}일 틀림없이 빌렸습니다.
                    </Content>
                    <hr />
                    <Content>
                        채무자{debtor}는 위 금액을 연 이자{interest}로 하여 {endDate}일까지 채권자{creditor}에게
                        갚겠습니다.
                    </Content>
                </div>
                <hr />
                <Dates>날짜: {startDate} 일</Dates>
                <hr />
                <div style={{ justifyContent: 'space-around', marginTop: 'auto' }}>
                    <div style={{ width: '50px', height: '50px', display: 'flex' }}>채권자</div>
                    <div style={{ display: 'flex' }}>
                        이름 : {creditor}최싸피
                        <br />
                        010 - 2256 - 9845
                    </div>
                    <div style={{ width: '50px', height: '50px', display: 'flex' }}>채무자</div>
                    <div style={{ display: 'flex' }}>
                        이름 : {debtor}이싸피
                        <br />
                        010 - 2256 - 9845
                    </div>
                </div>
            </IOUContent>
        </IOUContainer>
    );
}

export default IOU;

const WatermarkContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

const WatermarkImage = styled(Image)`
    opacity: 0.3; /* 이미지의 투명도 조절 */
`;

const WatermarkText = styled.div`
    position: absolute;
    margin: 10px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${theme.fontSize.XXS_10};
    opacity: 0.3;
    /* 텍스트의 높이와 여백 조절 */
    height: auto; /* 자동 높이 설정 */
    max-height: 100%; /* 최대 높이 설정 */
    overflow: hidden; /* 넘치는 부분 감추기 */
    white-space: normal; /* 줄 바꿈을 허용 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 생략 부호(...)로 표시 */
    display: inline-block; /* 인라인 블록 요소로 설정 */
    width: 60%; /* 가로 길이 100%로 설정 */
`;

export const IOUContainer = styled.div`
    width: 100%;
    height: 100%;
    border-color: #000000;
    border-style: solid;
    position: relative;
`;

export const IOUContent = styled.div`
    padding: 20px;
    z-index: 1;
`;

export const Title = styled.p`
    font-size: ${theme.fontSize.L_24};
    margin: 30px;
    text-align: center;
`;

export const Amount = styled.div`
    font-size: ${theme.fontSize.M_20};
    margin: 10px;
`;

export const Content = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin: 10px;
`;

export const Dates = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin: 10px;
    text-align: center;
`;
