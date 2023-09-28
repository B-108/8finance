import { Content, Contentbox, DetailBox, TitleBox } from "./TransactionHistory.style"
import Box from "/src/components/Common/Box"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Text from "/src/components/Common/Text"
import Header from "/src/components/Header/Header"
import { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom"

//API
import { getTransActionHistory } from "/src/api/transaciton"

//타입스크립트
import { TransactionHistoryType } from "/src/type/transaction"


function TransactionHistory () {

  //거래 내역 상세 조회
  const location = useLocation();
  const [history, setHistory] = useState<TransactionHistoryType[]>([]);
  
  const axiosHistory = async (): Promise<void> => {
      try {
          const response = await getTransActionHistory(location.state);
          setHistory(response?.data);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      axiosHistory();
  }, []);


  return (
    <CenteredContainer>
      <Header
        headerTitle="거래내역"></Header>

      <TitleBox>
        <Text
          $title>전체 거래내역</Text>
        <Text
          $smallTitle>Total : 0</Text>
      </TitleBox>

    {history.map((item) => (
        <Box
        $detailBox
        $size="92%,150px">
        <DetailBox>
          <Contentbox>
            <Content></Content>
            <Content
              $SizeUp
              $Green>{item.tranWd} ={">"} {item.tranDp}</Content>
          </Contentbox>
            
          <Contentbox>
            <Content>거래시간</Content>
            <Content>{item.tranDate}</Content>
          </Contentbox>  

          <Contentbox>
            <Content>거래내용</Content>
            <Content>{item.tranContent}</Content>
          </Contentbox>

          <Contentbox>
            <Content>이체금액</Content>
            <Content
              $Green>{item.tranAmt}</Content>
          </Contentbox>

          <Contentbox>
            <Content>입금계좌</Content>
            <Content>{"("}{item.tranDpBankCode}{")"}{item.tranDpAcNum}</Content>
          </Contentbox>

          <Contentbox>
            <Content>출금계좌</Content>
            <Content>{"("}{item.tranWdBankCode}{")"}{item.tranWdAcNum}</Content>
          </Contentbox>
        </DetailBox>
      </Box>
      ))}      
{/* <Box
        $detailBox
        $size="92%,150px">
        <DetailBox>
          <Contentbox>
            <Content></Content>
            <Content
              $SizeUp
              $Green>정현우 ={">"} 이경원</Content>
          </Contentbox>
            
          <Contentbox>
            <Content>거래시간</Content>
            <Content>2023.09.06 11:12:39</Content>
          </Contentbox>  

          <Contentbox>
            <Content>거래내용</Content>
            <Content>금액 입금</Content>
          </Contentbox>

          <Contentbox>
            <Content>이체금액</Content>
            <Content
              $Green>70,000원</Content>
          </Contentbox>

          <Contentbox>
            <Content>입금계좌</Content>
            <Content>(NH농협)215-4854-2551-21</Content>
          </Contentbox>

          <Contentbox>
            <Content>출금계좌</Content>
            <Content>(기업)506-065112-01-017</Content>
          </Contentbox>
        </DetailBox>
      </Box> */}
    </CenteredContainer>
  )
}
export default TransactionHistory

