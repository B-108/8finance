// 공통 Button 컴포넌트
import React from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface ButtonProps {
    children?: React.ReactNode;
    // styles?: string;
    onClick?: () => void;

    disabled?: boolean;    
    // type?: 'submit' | 'button' | 'reset';

    // 버튼 종류
    $bigGreenBtn ?: boolean
    $bigGrayBtn ?: boolean
    $smallButton ?: boolean

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
    font-size: ${theme.fontSize.DF};
    border-radius: ${theme.fontSize.DF}

    // greanGradient 사용 예시
    // border-image: ${theme.color.mix.border};
    // border-image-slice: 1;

    // 초록색 큰/중간 사이즈 버튼
    ${(props) =>
        props.$basicGreenBtn && 
        css`
            font-size: ${theme.fontSize.M};
            border-radius: ${theme.radius.L};
            background-color: ${theme.color.green[0]};;
        `
    }

    // 회색 큰/중간 사이즈 버튼
    ${(props) =>
        props.$modalGrayBtn && 
        css`
            font-size: ${theme.fontSize.M};
            border-radius: ${theme.radius.L};
            background-color: ${theme.color.gray[40]};;
        `
    }

    // 초록색 작은 사이즈 버튼 (모달용/승인용)
    ${(props) =>
        props.$modalGreenBtn && 
        css`
            font-size: ${theme.fontSize.DF};
            border-radius: ${theme.radius.M};
            background-color: ${theme.color.green[0]};;
        `
    }

    // 회색 작은 사이즈 버튼 (모달용)
    ${(props) =>
        props.$basicGrayBtn && 
        css`
            font-size: ${theme.fontSize.DF};
            border-radius: ${theme.radius.M};
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




    // // disabled가 아닐때(활성화), hover
    // &:not(:disabled):hover {

    // }

    // // 비활성화
    // &:disabled {

    // }