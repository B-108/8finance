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

export const NotiBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  border-bottom: 1px solid ${theme.color.gray[70]};
`

export const Content = styled.div`
  color: ${theme.color.gray[100]};
  font-size: ${theme.fontSize.S_14};
  margin: 0px 0px 0px 10px;
  height: 30px;
`

export const Date = styled.div`
  color: ${theme.color.gray[40]};
  font-size: ${theme.fontSize.XS_12};
  line-height: 48px;
  height: 30px;
`