import styled from 'styled-components';
import theme from '/src/themes';

export const IOUContainer = styled.div`
    width: 100%;
    height: 100%;
    border-color: #000000;
    border-style: solid;
`;

export const IOUContent = styled.div`
    padding: 20px;
`;

export const Title = styled.p`
    font-size: ${theme.fontSize.L_24};
    margin: 30px;
    text-align: center;
`;

export const Amount = styled.div`
    font-size: ${theme.fontSize.M_20};
    margin: 10px;
`;

export const Content = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin: 10px;
`;

export const Dates = styled.div`
    font-size: ${theme.fontSize.S_14};
    margin: 10px;
    text-align: center;
`;
