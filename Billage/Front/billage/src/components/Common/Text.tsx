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
    $title? : boolean;
    $smallTitle? : boolean;
    $smallContent? : boolean;
    $smallestContent? : boolean;

}

const StyledText = styled.div<TextProps>`
    font-size: ${theme.fontSize.DF_16};
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};
    justify-content: space-around;
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

    // title : 각 요소의 제목
    ${(props) =>
        props.$title && 
        css`
          font-size: ${theme.fontSize.L_24};
          font-weight: 800;
        `
    }

    // 메인페이지 거래 관련 버튼 제목
    ${(props) =>
        props.$smallTitle && 
        css`
          font-size: ${theme.fontSize.M_20};
          font-weight: 800;
        `
    }
    // 작은 글씨 내용
    ${(props) =>
        props.$smallContent && 
        css`
          font-size: ${theme.fontSize.XS_12};
          font-weight: 800;
        `
    }
    // 가장 작은 글씨 내용
    ${(props) =>
        props.$smallestContent && 
        css`
          font-size: ${theme.fontSize.XXS_10};
          font-weight: 800;
        `
    }

    // 
`

const Text = (props:TextProps) => {
    return <StyledText {...props}></StyledText>
}

export default Text