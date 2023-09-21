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
    margin: 0px 3%;
    justify-content: ${(props) => props.$center ? "center" : ""};
    height: 93vh; /* 화면 높이의 100% */
`;

const CenteredContainer = (props:InputContainer) => {
    return <Container {...props}></Container>
}

export default CenteredContainer