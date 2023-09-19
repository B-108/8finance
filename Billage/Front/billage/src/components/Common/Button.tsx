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

    // 버튼 사이즈 
    $bigButton ?: boolean
    $middleButton ?: boolean
    $smallButton ?: boolean

    // 스페셜 버튼
    $listButton ?: boolean
    $IOUButton ?: boolean
    $moneyButton ?: boolean

    // 색상 지정
    $Green ?:boolean
    $Gray ?:boolean
}

const StyledButton = styled.button<ButtonProps>`
    width: auto;
    border : none;
    color: white;
    font-size: 16px;
    border-radius: 20px;


    // greanGradient 사용 예시
    /* border-image: ${theme.color.greenGradient};
    border-image-slice: 1; */


    // 큰 버튼
    ${(props) =>
        props.$bigButton && 
        css`
            width: 90%;
            height: 48px;
        `
    }

    // 중간 버튼
    ${(props) =>
        props.$middleButton && 
        css`
            width: 45%;
            height: 48px;
        `
    }
    
    // 작은 버튼
    ${(props) =>
        props.$smallButton && 
        css`
            width: 15%;
            height: 36px;
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