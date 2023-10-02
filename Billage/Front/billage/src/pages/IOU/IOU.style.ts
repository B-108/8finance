import styled from 'styled-components';
import theme from '/src/themes';
import Image from '/src/components/Common/Image';

export const WatermarkContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

export const WatermarkImage = styled(Image)`
    opacity: 0.3; /* 이미지의 투명도 조절 */
`;

export const WatermarkText = styled.div`
    font-size: ${theme.fontSize.XXS_10};
    text-align: center;
    opacity: 0.3;
    width: 100%;
    padding-bottom: 10px;
`;

export const IOUContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 94%;
    height: 600px;
    border: 1px solid black;
    position: relative;
`;

export const IOUContent = styled.div`
    padding: 0px 15px 0px 15px;
    z-index: 1;
`;

export const Title = styled.p`
    font-size: ${theme.fontSize.L_24};
    margin: 20px 0px 20px 0px;
    text-align: center;
`;

export const Amount = styled.div`
    font-size: ${theme.fontSize.M_20};
    margin: 10px 0px 10px 0px;
`;

export const Content = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin: 15px 0px 10px 0px;
`;

export const Dates = styled.div`
    font-size: ${theme.fontSize.XS_12};
    margin: 0px 0px 15px 0px;
    text-align: center;
`;

export const UserBox = styled.div`
  display: flex;
  font-size: ${theme.fontSize.XS_12};
  height: 45px;
  padding: 7px 0px;
`

export const UserType = styled.div`
  padding: 0px 30px 0px 7px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const UserName = styled.div``

export const UserPhone = styled.div``