import styled, { css } from 'styled-components';
import fontSize from '/src/themes/fontSize';
import color from '/src/themes/color';

export const Text = styled.div`
    display: flex;
    justify-content: space-between;
    width: 98%;
    margin: 20px;
    font-weight: bold;
    font-size: ${fontSize.S_14};
    color: ${color.gray[100]};
`;
