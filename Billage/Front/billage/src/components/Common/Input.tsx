import React, {ChangeEvent} from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface InputProps {
    children?: React.ReactNode;
    onClick?: () => void;

    value? : string  | number | Date;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    
    disabled?: boolean;    
    type?: 'phone' | 'number' | 'money' | 'name' | 'day' | 'interest';

    // 사이즈 설정
    $size ?: string

    // 활성 상태
    $active ?: boolean;

    // 간편 비밀번호
    $simplepassword ?: boolean
}

const StyledInput = styled.input<InputProps>`
    // 기본값
    width: auto;
    height: auto;
    border : 1px solid black;
    padding-left : 15px;
    font-size: ${theme.fontSize.DF_16};
    border-radius: ${theme.radius.S_10};
    line-height: ${(props) => props.$size?.split(',')[1]};
    
    // 사이즈 설정
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};

    // 회원 관련 입력
    ${(props) =>
        props.$active && 
        css`
            border : 3px solid ${theme.color.gray[70]};
            font-size: ${theme.fontSize.DF_16};
            border-radius: ${theme.radius.S_10};
            
            &:focus {
                outline: 1px solid ${theme.color.green[0]};
            }
        `
    }

    // 간편 비밀번호 입력
    ${(props) =>
        props.$simplepassword && 
        css`
            border : 1px solid ${theme.color.gray[100]}; 
            background-color: ${theme.color.gray[100]};
            font-size: ${theme.fontSize.DF_16};
            border-radius: 100%;
            
            &:focus {
                outline: 1px solid ${theme.color.green[0]};
                background-color: ${theme.color.green[0]};
            }
        `
    }
`

const Input = (props:InputProps) => {
    return <StyledInput {...props}></StyledInput>
}

export default Input

export const InputHeader = styled.div`
  width: fit-content;
  font-size: ${theme.fontSize.XS_12};
  color: #757575;
  margin-bottom: 45px;
  background-color: ${theme.color.white};
  position: absolute;
  left: 10%;
`;

export const InputDiv = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;