import styled, { css } from 'styled-components';
import fontSize from '/src/themes/fontSize';
import color from '/src/themes/color';
import theme from '/src/themes';

export const Text = styled.div`
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 20px;
    font-weight: bold;
    font-size: ${fontSize.S_14};
    color: ${color.gray[100]};
`;

export const AccountsContainer = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column; /* 수직으로 배치 */
    justify-content: center;
    align-items: center;
`;

// Accounts 컴포넌트 내부에 이미지, 은행 이름, 계좌 번호 추가
export const Accounts = styled.div<{ $isClicked: boolean }>`
    width: 98%;
    height: 80px;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid;
    border-radius: 20px;
    background-color: white;
    position: relative; /* 자식 요소 위치 지정하기 위해 부모 요소에 relative 지정 */

    &:active,
    &:focus {
        border: 3px solid;
        border-image: ${theme.color.mix.border};
        border-image-slice: 1;
    }

    ${(props) =>
        props.$isClicked &&
        css`
            border: 2px solid;
            border-image: ${theme.color.mix.border};
            border-image-slice: 1;
        `}
`;

// 이미지 스타일 정의
export const AccountImage = styled.img`
    width: 60px; /* 이미지의 너비 조절 */
    height: 60px; /* 이미지의 높이 조절 */
    object-fit: contain;
    margin-right: 10px; /* 이미지와 텍스트 사이 여백 조절 */
`;

// 은행 이름 스타일 정의
export const BankName = styled.div`
    font-weight: bold;
    font-size: ${fontSize.S_14};
    margin-bottom: 5px;
`;

// 계좌 번호 스타일 정의
export const AccountNumber = styled.div`
    font-size: ${fontSize.S_14};
    color: ${color.gray[70]};
`;
