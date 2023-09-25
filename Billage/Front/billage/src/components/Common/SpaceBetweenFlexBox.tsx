import styled from "styled-components";
import React from "react";

interface FlexDivProps {
  $margin?: string;
  $textAlign?: string;
  $alignItems?: string;
  children?: React.ReactNode;

}

const StyledFlexDiv = styled.div<FlexDivProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: ${(props) => props.$margin};
  text-align: ${(props) => props.$textAlign};
  align-items: ${(props) => props.$alignItems};
`;

const FlexDiv: React.FC<FlexDivProps> = (props) => {
  return <StyledFlexDiv {...props}></StyledFlexDiv>;
};

export default FlexDiv;
