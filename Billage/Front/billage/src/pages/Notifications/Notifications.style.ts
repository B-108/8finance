import styled from "styled-components";
import theme from "/src/themes";

export const NotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 94%;
`

export const LeftSection = styled.div`
  display: flex;
`

export const Check = styled.div<{ $IsClick : number }>`
  visibility: ${(props) => (props.$IsClick ? "hidden" : "visible")};
  background-color: ${theme.color.green[0]};
  border-radius: 100%;
  width: 7px;
  height: 7px;
`

export const NotiBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.color.gray[70]};
  margin: 3px 0px 0px 0px;
  height: 55px;
`

export const ContentBox = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${theme.fontSize.S_14};
  margin: 0px 0px 0px 3px;
  height: 40px;
`

export const Noti = styled.div`
  margin-bottom: 3px;
`

export const DateBox = styled.div`
  color: ${theme.color.gray[40]};
  font-size: ${theme.fontSize.XXS_10};
`