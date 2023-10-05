// 공통 Button 컴포넌트
import React from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;

    disabled?: boolean;

    // 사이즈 설정
    $size?: string;

    // 버튼 종류
    $basicGreenBtn?: boolean;
    $basicGrayBtn?: boolean;
    $smallGreenBtn?: boolean;
    $smallGrayBtn?: boolean;
    $smallBlackBtn?: boolean;
    $registerBtn?: boolean;
    $transActionToggle? :boolean;

    // 토글상태
    $Toggle? : boolean;

    // 색상 지정
    $Green?: boolean;
    $Gray?: boolean;

    // 위치 선정
    $absolute?: string;


}

const StyledButton = styled.button<ButtonProps>`
    width: auto;
    height: auto;
    border: none;
    color: white;
    padding: 0%;
    text-align: center;
    font-size: ${theme.fontSize.DF_16};
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};
    line-height: ${(props) => props.$size?.split(',')[1]};
    position: ${(props) => props.$absolute};
    font-family: 'LINESeedKR-Rg';

    // 초록색 큰/중간 사이즈 버튼
    ${(props) =>
        props.$basicGreenBtn &&
        css` 
            font-size: ${theme.fontSize.M_20};
            border-radius: ${theme.radius.L_20};
            background-color: ${theme.color.green[0]};
        `}

    ${(props) =>
        props.$basicGrayBtn &&
        css` 
            font-size: ${theme.fontSize.M_20};
            border-radius: ${theme.radius.L_20};
            background-color: ${theme.color.gray[70]};
        `}

    // 초록색 작은 사이즈 버튼 (모달용/전송용)
    ${(props) =>
        props.$smallGreenBtn &&
        css`
            font-size: ${theme.fontSize.DF_16};
            border-radius: ${theme.radius.DF_8};
            background-color: ${theme.color.green[0]};
        `}

    // 회색 작은 사이즈 버튼 (모달용)
    ${(props) =>
        props.$smallGrayBtn &&
        css`
            font-size: ${theme.fontSize.DF_16};
            border-radius: ${theme.radius.DF_8};
            background-color: ${theme.color.gray[40]};
        `}

    // 검은색 작은 사이즈 버튼 (빌릴금액)
    ${(props) =>
        props.$smallBlackBtn &&
        css`
            height: 22px;
            font-size: ${theme.fontSize.S_14};
            border-radius: ${theme.radius.M_15};
            background-color: ${theme.color.black};
        `}

    // 계좌 등록 버튼
    ${(props) =>
        props.$registerBtn &&
        css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.color.black};
          font-weight: 800;
          font-size: ${theme.fontSize.DF_16};
          border-radius: ${theme.radius.S_10};
          border: 3px solid ${theme.color.green[0]};
          background-color: ${theme.color.white};
          margin: 20px 0px 10px 0px;
        `}

    // 거래내역 toggle 버튼
    ${(props) =>
        props.$transActionToggle &&
        css` 
            color : ${theme.color.gray[100]};
            font-size: ${theme.fontSize.S_14};
            border-radius: ${theme.radius.M_15};
            border: 1px solid ${theme.color.gray[100]};
            background-color: transparent;
        `}

    // toggle 된 상태
    ${(props) =>
        props.$Toggle &&
        css`
            color: ${theme.color.white};
            font-size: ${theme.fontSize.S_14};
            border-radius: ${theme.radius.M_15};
            background-color: ${theme.color.black};
        `}

    // 초록색 
    ${(props) =>
        props.$Green &&
        css`
            background-color: ${theme.color.green[0]};
        `}

    // 회색 
    ${(props) =>
        props.$Gray &&
        css`
            background-color: ${theme.color.gray[70]};
        `}
`;

const Button = (props:ButtonProps) => {
    return <StyledButton {...props}> {props.children} </StyledButton>
}

export default Button