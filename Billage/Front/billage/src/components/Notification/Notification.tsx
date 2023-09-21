import React from 'react';
import styled from 'styled-components';
import Image from '../Common/Image';
import receiveMoney from '/src/assets/receiveMoney.svg';
import CenteredContainer from '../Common/CenterAlign';

interface TextProps {
    children?: React.ReactNode;
    disabled?: boolean;

    // 사이즈 설정
    $size?: string;

    // 마진 지정
    $margin?: boolean;
}

const StyledText = styled.span<TextProps>`
    ${(props) =>
        props.$margin &&
        `
        margin: 0%;
    `}
    display: block; // 블록 요소로 변경
    text-align: center;
    vertical-align: bottom; // 텍스트를 아래로 정렬
`;
const Text = (props: TextProps) => {
    return <StyledText {...props}> {props.children} </StyledText>;
};
const NotificationContainer = styled.div`
    width: 100%;
    background-color: #68bfae;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    margin-left: 10px;
    /* 추가: 텍스트를 오른쪽 아래로 정렬합니다.; */
    align-items: flex-end;
`;

const NotificationText = styled.span<TextProps>`
    margin: 0;
    font-size: 14px;
`;

const DateText = styled.span<TextProps>`
    color: #999;
    font-size: 12px;
    align-items: flex-end;
`;

function Notification() {
    return (
        <CenteredContainer>
            <NotificationContainer>
                <IconContainer>
                    <Image src={receiveMoney} alt="home" width="35px" />
                </IconContainer>
                <TextContainer>
                    <NotificationText>~님이 ~원을 갚았습니다.</NotificationText>
                    <DateText>오늘</DateText>
                </TextContainer>
            </NotificationContainer>
        </CenteredContainer>
    );
}

export default Notification;
