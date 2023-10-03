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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 96%;
  height: 225px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.25);
  border-radius: ${theme.radius.S_10};

    ${(props) =>
        props.$isClicked &&
        css`
          border: 4px solid ${theme.color.green[0]};
          border-radius: ${theme.radius.S_10};
          /* background-image: linear-gradient(#fff, #fff),
          ${theme.color.mix.border};
          background-origin: border-box;
          background-clip: content-box, border-box; */
    `}
`

export const Test = styled.div`
  position: absolute;
  width: 90%;
  height: 200px;
  z-index: 999;
`

export const AccountImg = styled.img`
    width: 90%;
    height: 200px;
`

export const AccountNUm = styled.div`
  position: absolute;
  bottom: 0px;
  left: 10px;
`


