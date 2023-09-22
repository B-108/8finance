import React, {ChangeEvent} from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface TextProps {
    children?: React.ReactNode;
    onClick?: () => void;

    value? : string  | number | Date;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    
    type?: 'simplepassword';

    // 사이즈 설정
    $size ?: string

    // Text 종류
    $pinText? : boolean;
    $mainText? : boolean;
    $description? : boolean;

}

const StyledText = styled.div<TextProps>`
    font-size: ${theme.fontSize.DF_16};
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};
    
    // 간편 비밀번호 Title Text
    ${(props) =>
        props.$pinText && 
        css`
          font-weight: 800;
          font-size: ${theme.fontSize.XL_28};
        `
    }

    // 메인페이지 Title Text
    ${(props) =>
        props.$mainText && 
        css`
          font-weight: 800;
          font-size: ${theme.fontSize.XL_28};
          margin:10px 0px 20px 0px;
          text-align: center;
        `
    }

    // 간단 설명란 Text
    ${(props) =>
        props.$description && 
        css`
          font-size: ${theme.fontSize.S_14};
        `
    }
`

const Text = (props:TextProps) => {
    return <StyledText {...props}></StyledText>
}

export default Text