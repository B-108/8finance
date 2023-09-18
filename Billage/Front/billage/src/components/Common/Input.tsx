import React from 'react'

import styled, {css} from "styled-components"

interface InputProps {
    children?: React.ReactNode;
    // styles?: string;
    onClick?: () => void;

    disabled?: boolean;    
    type?: 'phone' | 'number' | 'money' | 'name' | 'day' | 'interest';

    // 별개 스타일링
    // 너비
    $fullWidth ?: boolean


    // 폰트 굵게
    $isBold ?: boolean

    // 색상 지정
    $maincolor ?:boolean
    $black ?:boolean
    $grey ?: boolean
    $transparent ?: boolean
}

const StyledInput = styled.input<InputProps>`
    width: auto;
    border : none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;

    // disabled가 아닐때(활성화), hover
    &:not(:disabled):hover {

    }

    // 비활성화
    &:disabled {

    }

    // 꽉 찬 버튼
    ${(props) =>
        props.$fullWidth && 
        css`
            width:100%;
        `
    }
 
    // 폰트 굵게
    ${(props) =>
    props.$isBold &&
    css`
        font-weight: bold;
    `}

    // 색상 지정
    // 투명한 버튼(배경색과 동일하게)
    ${(props) =>
        props.$transparent &&
        css`
            background-color: transparent;
            border: 1px solid #000000;
        `
    }

    // 메인컬러(연두색)
    ${(props) =>
        props.$maincolor &&
        css`
            background-color: #93C90F;
            border: 1px solid #93C90F;
            color: #FFFFFF;
            &:not(:disabled):hover {
                opacity: 0.8;
            }
        `   
    }
    // 검은색
    ${(props) =>
        props.$black &&
        css`
            background-color: #000000;
            border: 1px solid #000000;
            color: #FFFFFF;
            &:not(:disabled):hover {
                opacity: 0.8;
            }
        `   
    }

    // 회색
    ${(props) =>
        props.$grey &&
        css`
            background-color: #C8C8C8;
            border: 1px solid #C8C8C8;
            color: #FFFFFF;
            &:not(:disabled):hover {
                opacity: 0.8;
            }
        `   
    }

`

const Input = (props:InputProps) => {
    return <StyledInput {...props}> {props.children} </StyledInput>
}

export default Input