import styled, { css } from 'styled-components';
import color from '/src/themes/color';
import theme from '/src/themes';

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
`;

export const Accounts = styled.img<{ $isClicked: boolean }>`
    width: 99%;
    margin-bottom: 5px;
    border: 3px solid gray;
    border-radius: 40px;

    ${(props) =>
      props.$isClicked &&
      css`
        border-image: ${theme.color.mix.border};
        border-image-slice: 1;
    `}
`;
