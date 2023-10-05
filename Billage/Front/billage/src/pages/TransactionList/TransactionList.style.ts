import styled from "styled-components";
import theme from "/src/themes";

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 15px 0px;
  width: 94%;
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 47%;
`

export const TransActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
  height: 800px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10%; 
    background: ${theme.color.green[0]};
    border-radius: 20px;
  }
`