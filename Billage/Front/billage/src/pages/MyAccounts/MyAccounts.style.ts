import styled from 'styled-components';
import fontSize from '/src/themes/fontSize';
import color from '/src/themes/color';
import theme from '/src/themes';
import Image from '/src/components/Common/Image';
import colorCreditCard from '/src/assets/colorCreditCard.svg';
import rightArrow from '/src/assets/rightArrow.svg';

export const TextDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 10px;
    font-weight: bold;
    font-size: ${fontSize.S_14};
    color: ${color.gray[100]};
`;
export const RegistButton = styled.button`
    display: flex;
    align-items: center;
    margin: 10px;
    width: 98%;
    height: 40px;
    font-weight: bold;
    border: 3px solid ${theme.color.green[0]};
    font-size: ${theme.fontSize.DF_16};
    border-radius: ${theme.radius.S_10};
    padding-left: 40px; /* 이미지와 텍스트 사이 여백을 조정해주세요 */
    padding-right: 10px; /* 이미지와 텍스트 사이 여백을 조정해주세요 */
    background: url(${colorCreditCard}) no-repeat left center, url(${rightArrow}) no-repeat right center; /* 이미지 경로를 설정해주세요 */
    background-size: 30px auto, 15px auto; /* 이미지 크기를 조정해주세요 */
`;

export const AccountsContainer = styled.div`
    width: 98%;
    display: flex;
    flex-direction: column; /* 수직으로 배치 */
    justify-content: center;
    align-items: center;
`;

export const Accounts = styled.img`
    width: 98%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 이미지를 가로, 세로 비율 유지하며 컨테이너에 맞춥니다. */
    margin-bottom: 10px; /* Account 간격 조절 */
`;
