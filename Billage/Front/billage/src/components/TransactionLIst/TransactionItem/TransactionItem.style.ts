import styled from "styled-components";
import theme from "/src/themes";

export const TransActionBox = styled.div`
  display: flex; 
  width: 99%;
  height: 110px;
  margin: 6px 0%;
  border: 3px solid transparent;
  border-radius: ${theme.radius.S_10};
  background-image: linear-gradient(#fff, #fff),
  ${theme.color.mix.border};
  background-origin: border-box;
  background-clip: content-box, border-box;
`

export const NonTransActionBox = styled.div`
  display: flex; 
  width: 99%;
  height: 110px;
  margin: 6px 0%;
  border: 3px solid transparent;
  border-radius: ${theme.radius.S_10};
  background-image: linear-gradient(#fff, #fff),
  ${theme.color.mix.background};
  background-origin: border-box;
  background-clip: content-box, border-box;
`