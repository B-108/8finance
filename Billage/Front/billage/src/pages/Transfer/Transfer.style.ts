import styled from 'styled-components';
import theme from '/src/themes';

export const InputDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
`;

export const InputTitle = styled.div`
    font-size: ${theme.fontSize.DF_16};
    margin: 0px;
    font-weight: 800;
`;

export const StyledCheckbox = styled.input`
    font-size: 16px;
`;