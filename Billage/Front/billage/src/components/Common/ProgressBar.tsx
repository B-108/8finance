import React from 'react';
import styled from 'styled-components';
import theme from '/src/themes';
import Money from "/src/assets/flyingMoney.svg"

interface ProgressBarProps {
  progress: number;
}

const ProgressBarContainer = styled.div`
  width: 90%;
  height: 10px;
  background-color: #ccc;
  position: relative;
`;

const ProgressBarWrapper = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  transition: width 0.3s ease-in-out;
  background-color: ${theme.color.green[0]};
`;


const ProgressBarFill = styled.div`
  background-color: ${theme.color.green[0]};

  &::before {
    content: url(${Money});
    width: 15px;
    height: 15px;
    position: absolute;
    right: 0;
    transform: translateX(50%);
    top: -120%;
    transform: translateY(-100%);
  }
`;

const ProgressBarMarker = styled.div<{ progress: number }>`
  content: '';
  width: 10px;
  height: 10px;
  background-color: ${theme.color.green[50]};
  border-radius: 50%;
  position: absolute;
  transform: translateX(-50%);
  left: ${(props) => props.progress}%;
  top: 50%; /* 세로 중앙 정렬을 위해 추가 */
  transform: translateX(-50%) translateY(-50%); /* 가로 세로 중앙 정렬을 위해 추가 */
`;

const ProgressText = styled.div<{ progress: number }>`
  position: absolute;
  left: 10px;
  top: -40px; /* 원하는 위치에 텍스트 상자를 배치 */
  transform: translateX(-50%);
  background-color: ${theme.color.black};
  color : ${theme.color.white};
  padding: 2px 2px; 
  border-radius: 5px;
  font-size : ${theme.fontSize.XXS_10};
`;



const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarWrapper progress={progress}>
        <ProgressBarFill />
        <ProgressText progress={progress}>{progress}</ProgressText>
      </ProgressBarWrapper>
      <ProgressBarMarker progress={0} />
      <ProgressBarMarker progress={25} />
      <ProgressBarMarker progress={50} />
      <ProgressBarMarker progress={75} />
      <ProgressBarMarker progress={100} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;