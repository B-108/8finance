import styled, { css } from 'styled-components';
import fontSize from '/src/themes/fontSize';
import color from '/src/themes/color';
import theme from '/src/themes';

export const BankContainer = styled.div`
    display: flex;
    flex-direction: column; /* 수직으로 배치 */
    align-items: center;
    width: 100%;
`;

export const Banks = styled.div<{ $isClicked: boolean }>`
    width: 91%;
    height: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-left : 3%;
    border: 2px solid ${theme.color.gray[70]};
    border-radius: 10px;

    ${(props) =>
      props.$isClicked &&
      css`
          border: 3px solid;
          border-image: ${theme.color.mix.border};
          border-image-slice: 1;
      `}
    `;

// 은행 이름 스타일 정의
export const BankName = styled.div`
    font-size: ${theme.fontSize.M_20};
    margin-left: 10px;
`;

// 계좌 번호 스타일 정의
export const AccountNumber = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin-left: 4px;
`;

export const BtnContainter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 94%;
`