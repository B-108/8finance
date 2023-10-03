import styled from "styled-components";
import theme from "/src/themes";


export const TitleBox = styled.div`
  display: flex;
  width: 94%;
  height: 60px;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 15px;
  border-bottom: 1px solid gray;
`

export const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
`

export const Contentbox = styled.div`
  display: flex;
  width: 100%;
  height: 17%;
  justify-content: space-between;
`

export const Content = styled.div<{ $SizeUp?: boolean; $Green?: boolean }>`
  font-size: ${theme.fontSize.S_14};
  font-size: ${(props) => (props.$SizeUp ? theme.fontSize.DF_16 : "")};
  font-weight: ${(props) => (props.$SizeUp ? 800 : "")};;
  color : ${(props) => (props.$Green ? theme.color.green[0] : "")}
`
