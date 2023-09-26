import styled from "styled-components"
import theme from "/src/themes";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  height: 80px;
`

export const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 50%;
`;

export const Title = styled.div<{ $noDisplay:boolean }>`
  display: flex;
  align-items: center;
  width: 90%;
  height: 50%;
  font-weight: 800;
  font-size: ${theme.fontSize.M_20};
  padding: ${(props) => props.$noDisplay ? "0px" : "0px 0px 0px 7px"};
`