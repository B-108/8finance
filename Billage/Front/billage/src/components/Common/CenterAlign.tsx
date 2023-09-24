import React, {ChangeEvent} from 'react'
import styled from "styled-components"

interface InputContainer {
    children?: React.ReactNode;
    onClick?: () => void;

    value? : string  | number | Date;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    
    // 세로 가운데 정렬 여부
    $center ?: boolean;
}

export const Container = styled.div<InputContainer>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 1% 0px 1%;
    background-color: white;
    justify-content: ${(props) => props.$center ? "center" : ""};
    height: 93vh; /* 화면 높이의 100% */
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
    width: 0.5em; /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent; /* 스크롤바 색상 */
    }

    @media only screen and (max-width: 5000px) {
    width: 400px;
    }
    @media only screen and (max-width: 400px) {
    width: 96%;
    }
`;

const CenteredContainer = (props:InputContainer) => {
    return <Container {...props}></Container>
}

export default CenteredContainer