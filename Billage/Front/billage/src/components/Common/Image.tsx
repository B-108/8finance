import React from 'react';
import styled, { css } from 'styled-components';

// 이미지 컴포넌트의 속성 정의
interface ImageProps {
    children?: React.ReactNode;
    onClick?: () => void;

    type?:
        | 'logo'
        | 'password'
        | 'alramBell'
        | 'receiveMoney'
        | 'Document'
        | 'DocumentList'
        | 'alramClock'
        | 'AccountEnroll'
        | 'transaction'
        | 'transactionList'
        | 'flyingMoney'
        | 'account'
        | 'wallet'
        | 'creditCard'
        | 'receiveMoney'
        | 'transaction'
        | 'NH'
        | 'KB';

    src: string;
    alt: string;
    $width?: string;
    $height?: string;

    // 추가적인 스타일링 옵션을 원하는 경우 여기에 추가
    $rounded?: boolean;
    $src?: boolean;

    // opacity:0.8; /* 80% 불투명도 */
    $opacity?: string;
}

// 스타일드 컴포넌트로 이미지 스타일링
const StyledImage = styled.img<ImageProps>`
    // 기본값
    max-width: auto;
    width: auto;
    height: auto;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    opacity: ${(props) => props.$opacity};

    // 추가적인 스타일링 옵션에 따른 스타일 적용

    // 모서리 둥글게
    ${(props) =>
        props.$rounded &&
        css`
            border-radius: 50%;
        `}
    ${(props) =>
        props.$opacity &&
        css`
            opacity: 0.5;
        `}
`;

// 이미지 컴포넌트 정의
const Image = (props: ImageProps) => {
    return <StyledImage {...props}>{props.children}</StyledImage>;
};

export default Image;
