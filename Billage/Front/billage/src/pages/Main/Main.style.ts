import styled from "styled-components";
import theme from "/src/themes";

export const AlarmHeader = styled.div`
  display: flex;
  /* border: 1px solid pink; */
`

export const AlarmDate = styled.div`
  font-size: 15px;
  margin: 5px 0px 5px 10px ;
  /* border: 1px solid blue; */
`

export const AlarmContent = styled.div`
  font-size: 18px;
  /* border: 1px solid blue; */
`

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 4%;
  border-bottom: 2px solid white;
  height: 190px;
  /* border: 1px solid red; */
`

export const TextUp = styled.div`
  position: absolute;
  top: 120px;
  color: white;
  font-size: ${theme.fontSize.L_24};
`

export const TextDown = styled.div`
  position: absolute;
  top: 155px;
  color: white;
  font-size: ${theme.fontSize.M_20};
`

export const DDay = styled.div`
  position: absolute;
  font-size: 40px;
  color: black;
`

export const SignBox = styled.div`
  color: ${theme.color.white};
  font-size: ${theme.fontSize.S_14};
  background-color: ${theme.color.green[100]};
  height: 17px;
  border-radius: ${theme.radius.XS_5};
  padding: 2% 2.5% 2% 2.5%;
  margin: 5% 15% 0px 0px;
  /* border: 1px solid red; */
`

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0px 4%;
`
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  height: 60px;
`
export const Remain = styled.div`
  color: white;
  font-size: ${theme.fontSize.DF_16};
  height: 20px;
`

export const SendBtn = styled.button`
  position: relative;
  background-color: white;
  color: ${theme.color.green[50]};
  font-weight: 800;
  font-size: ${theme.fontSize.DF_16};
  margin-left: auto;
  height: 37px;
  width: 100px;
  border: 0px;
  border-radius: 10px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
`

export const LeftSection = styled.div`
  display: flex;
  border: 1px solid blue;
`

export const TransactionBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 98%;
  height: 70px;
  display: flex;
`

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  width: 94%;
  height: 30px;
  font-size: 10px;
`
