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

// 날짜 및 시간을 원하는 형식으로 포맷팅하는 함수
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 표시
  const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 표시
  const hours = String(date.getHours()).padStart(2, '0'); // 시간을 두 자리로 표시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 두 자리로 표시
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 초를 두 자리로 표시

  // "년-월-일 시간:분:초" 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  return (
    <CenteredContainer>
      <Header
        headerTitle="거래내역"></Header>

      <TitleBox>
        <Text
          $title>전체 거래내역</Text>
        <Text
          $smallTitle>Total : {history.length}</Text>
      </TitleBox>

    {history.map((item,index) => (
        <Box
        key={index}
        $detailBox
        $size="86%,150px">
        <DetailBox>
          <Contentbox>
            <Content></Content>
            <Content
              $SizeUp
              $Green>{item.tranWd} ={">"} {item.tranDp}</Content>
          </Contentbox>
          <br />

          <Contentbox>
            <Content>거래시간</Content>
            <Content>{formatDate(item.tranDate)}</Content>
          </Contentbox>  
          
          <Contentbox>
            <Content>이체금액</Content>
            <Content
              $Green>{item.tranAmt.toLocaleString()}원</Content>
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
    </CenteredContainer>
  )
}
export default TransactionHistory

