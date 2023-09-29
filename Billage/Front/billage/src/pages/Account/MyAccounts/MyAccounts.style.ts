import styled, { css } from 'styled-components';
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

export const Account = styled.div<{ $isClicked: boolean }>`
  position: relative;
  width: 97%;
  height: 250px;
  margin-bottom: 10px;
  border: 3px solid transparent;
  border-radius: ${theme.radius.S_10};
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.25);
  
    ${(props) =>
        props.$isClicked &&
        css`
          border-image-source: ${theme.color.mix.border};
          border-image-slice: 1;
    `}
`

export const AccountNUm = styled.div`
  position: absolute;
  bottom: 0px;
  left: 5px;
`

export const AccountImg = styled.img`
    width: 100%;

`;
