import styled, { css } from 'styled-components';
import color from '/src/themes/color';

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 120px;
  padding: 0px 0px 0px 10px;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 30px;
  padding: 0px 5px 0px 0px;
  `

export const AccountsBox = styled.div`
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
`;

export const Accounts = styled.img<{ $isClicked: boolean }>`
    width: 100%;
    margin-bottom: 7px;
    border-radius: 20px;

    &:active,
    &:focus {
        border: 2px solid ${color.green[100]}; // 클릭 또는 포커스 시 테두리 색상 변경
    }

    ${(props) =>
        props.$isClicked &&
        css`
            border: 2px solid ${color.green[100]}; // 계좌 클릭 시 테두리 색상 변경
        `}
`;
