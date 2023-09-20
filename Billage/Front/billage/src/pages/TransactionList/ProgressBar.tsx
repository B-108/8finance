import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
    overflow: hidden;
`;

const ProgressBarFiller = styled.div`
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease-in-out;
`;

const ProgressBar = ({ progress }) => {
    return (
        <ProgressBarContainer>
            <ProgressBarFiller progress={progress}></ProgressBarFiller>
        </ProgressBarContainer>
    );
};

export default ProgressBar;
