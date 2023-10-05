import React from 'react'

import styled, {css} from "styled-components"
import theme from '/src/themes';

interface BoxProps {
    children?: React.ReactNode;
    onClick?: () => void;
    
    type?: '';

    // 사이즈 지정
    $size? : string;

    // 상자 종류
    $alarmBox? : boolean;
    $mainTransaction? : boolean;
    $transaction? : boolean;
    $detailBox? : boolean;
    $goDetailTransaction? : boolean;
}

const StyledBox = styled.div<BoxProps>`
    font-size: ${theme.fontSize.DF_16};
    width: ${(props) => props.$size?.split(',')[0]};
    height: ${(props) => props.$size?.split(',')[1]};
    
    // 메인에서 alarm창을 위한 box
    ${(props) =>
        props.$alarmBox && 
        css`
          display: flex;
          padding: 5px 3% 5px 3%;
          margin: 0px 0px 20px 0px;
          flex-direction: column;
          border-radius: ${theme.radius.S_10};
          box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
        `
    }

    // greanGradient 사용 예시
    // border-image: ${theme.color.mix.border};
    // border-image-slice: 1;

    // 메인에서 거래 카드형식
    ${(props) =>
        props.$mainTransaction && 
        css`
          display: flex;
          flex-direction: column;
          border-radius: ${theme.radius.M_15};
          background: ${theme.color.mix.background};
        `
    }

    // 메인에서 거래 관련 box
    ${(props) =>
        props.$transaction && 
        css`
            display: flex;
            margin: 15px 0px 0px 0px;
            padding: 3% 0% 3% 2%;
            border-radius: ${theme.radius.DF_8};
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.25);
        `
    }

    // 거래내역 상세 box
    ${(props) =>
        props.$detailBox && 
        css`
            display: flex;
            margin: 15px 0px 5px 0px;
            padding: 10px 4% 4px 4%;
            border-radius: ${theme.radius.S_10};
            box-shadow: 2px 2px 14px 0px rgba(0, 0, 0, 0.25);
        `
    }

    // 거래내역 확인하러 가는 box
    ${(props) =>
        props.$goDetailTransaction && 
        css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: ${theme.radius.S_10};
            border: 2px solid ${theme.color.green[0]};
            padding: 0% 3% 0% 9%;
        `
    }

`

const Box = (props:BoxProps) => {
    return <StyledBox {...props}></StyledBox>
}

export default Box