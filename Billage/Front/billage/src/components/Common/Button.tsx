// 공통 Button 컴포넌트
import React from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;

    disabled?: boolean;    

    // 사이즈 설정
    $size ?: string

    // 버튼 종류
    $basicGreenBtn ?: boolean
    $basicGrayBtn ?: boolean
    $smallGreenBtn ?: boolean
    $smallGrayBtn ?: boolean

    $listButton ?: boolean
    $IOUButton ?: boolean
    $moneyButton ?: boolean

    // 색상 지정
    $Green ?:boolean
    $Gray ?:boolean
}

const StyledButton = styled.button<ButtonProps>`
    width: auto;
    height: auto;
    border : none;
    color: white;
    padding: 0%;
    padding-left : 15px;
    font-size: ${theme.fontSize.DF_16};
    border-radius: ${theme.fontSize.DF_16};
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};
    line-height: ${(props) => props.$size?.split(',')[1]};

    // greanGradient 사용 예시
    // border-image: ${theme.color.mix.border};
    // border-image-slice: 1;

    // 초록색 큰/중간 사이즈 버튼
    ${(props) =>
        props.$basicGreenBtn && 
        css`
            font-size: ${theme.fontSize.M_20};
            border-radius: ${theme.radius.L_20};
            background-color: ${theme.color.green[0]};;
        `
    }

    // 회색 큰/중간 사이즈 버튼
    ${(props) =>
        props.$basicGrayBtn && 
        css`
            font-size: ${theme.fontSize.M_20};
            border-radius: ${theme.radius.L_20};
            background-color: ${theme.color.gray[40]};;
        `
    }

    // 초록색 작은 사이즈 버튼 (모달용/전송용)
    ${(props) =>
        props.$smallGreenBtn && 
        css`
            font-size: ${theme.fontSize.DF_16};
            border-radius: ${theme.radius.M_15};
            background-color: ${theme.color.green[0]};;
        `
    }

    // 회색 작은 사이즈 버튼 (모달용)
    ${(props) =>
        props.$smallGrayBtn && 
        css`
            font-size: ${theme.fontSize.DF_16};
            border-radius: ${theme.radius.M_15};
            background-color: ${theme.color.gray[40]};;
        `
    }

    // 초록색 
    ${(props) =>
        props.$Green && 
        css`
            background-color:  ${theme.color.green[0]};
        `
    }

    // 회색 
    ${(props) =>
        props.$Gray && 
        css`
            background-color:  ${theme.color.gray[70]};
        `
    }
`

const Button = (props:ButtonProps) => {
    return <StyledButton {...props}> {props.children} </StyledButton>
}

export default Button