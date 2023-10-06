import styled from "styled-components"
import theme from "/src/themes";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  height: 65px;
  padding-bottom: 5px;
`

export const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  height: 80px;
  line-height: 80px;
  width: 50%;
`;

export const Title = styled.div<{ $noDisplay:boolean }>`
  display: flex;
  width: 90%;
  height: 80px;
  line-height: 84px;
  font-weight: 800;
  font-family: 'LINESeedKR-Bd';
  font-size: ${theme.fontSize.M_20};
  padding: ${(props) => props.$noDisplay ? "0px" : "0px 0px 0px 7px"};
`

  export const RightSection = styled.div`
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    width: 50%;
  `

  export const NotiCount = styled.div<{ $IsClick : number }>`
    position: absolute;
    background-color: red;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    top: 0px;
    right: 0px;

    visibility: ${(props) => (props.$IsClick ? "visible" : "hidden")};
  `