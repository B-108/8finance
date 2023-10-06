import styled from "styled-components";
import theme from "/src/themes";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.color.gray[70]};
  width: 92%;
  height: 135px;
`