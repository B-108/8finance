import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 10%;
  /* border: 1px solid red; */
`

export const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 50%;
`

export const Title = styled.h2<{ $noDisplay:boolean }>`
  width: 90%;
  height: 50%;
  padding: ${(props) => props.$noDisplay ? "0px" : "0px 0px 0px 7px"}

`