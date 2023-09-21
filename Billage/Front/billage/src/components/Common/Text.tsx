import React, {ChangeEvent} from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface TextProps {
    children?: React.ReactNode;
    onClick?: () => void;

    value? : string  | number | Date;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    
    type?: 'simplepassword';

    // Text 종류
    $PinText? : boolean;
    $mainlogo? : boolean;
    $description? : boolean;

}

const StyledText = styled.div<TextProps>`
    font-size: ${theme.fontSize.DF_16};
    
    // 간편 비밀번호 Title Text
    ${(props) =>
        props.$PinText && 
        css`
          font-size: ${theme.fontSize.XL_28};
          font-weight: 800;
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