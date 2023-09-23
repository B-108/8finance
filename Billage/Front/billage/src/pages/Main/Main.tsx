import Box from "/src/components/Common/Box"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Image from "/src/components/Common/Image"
import Text from "/src/components/Common/Text"
import Header from "/src/components/Header/Header"
import alarmBell2 from "/src/assets/alarmBell2.svg"
import wallet from "/src/assets/wallet.svg"
import Document from "/src/assets/DocumentList.svg"
import Footer from "/src/components/Common/Footer"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AlarmContent, AlarmDate, AlarmHeader, Content, ContentBox, TransactionBox } from "./Main.style"
import { useNavigate } from "react-router-dom"

function Main(){
  const navigate = useNavigate()
  const moveTransfer = () => {navigate(`/transfer`)}
  const moveTransactionList = () => {navigate(`/transactionlist`)}
  const moveNotifications = () => {navigate(`/notifications`)}

  return(
    <>
      <CenteredContainer>
        <Header
          headerTitle="Billage"
          ></Header>
        
        <Text
          $title
          $size="98%,50px">확인 하지 않은 알림!</Text>

        <Box
          onClick={moveNotifications}
          $alarmBox
          $size="89%,80px">
          <AlarmHeader>
            <Image
              src={alarmBell2}
              alt="alarmClock"
              width="7%"
            ></Image>
            <AlarmDate>2023.09.08</AlarmDate>
          </AlarmHeader>
          <AlarmContent>최싸피님에게 300,000원을 빌려달는 요청이 왔어요!</AlarmContent>
        </Box>

        <Text
          $title
          $size="98%,50px">나의거래</Text>

        <div style={{width:"106%"}}>
          <Splide
            options={ {
              focus  : 'center',
              rewind: true,
              arrows : false,
              gap   : '5%',
              padding: '12%',
            } }
            aria-label="My Favorite Images">
            <SplideSlide>
              <Box
                $mainTransaction
                $size="100%,270px">
              </Box>
            </SplideSlide>
            <SplideSlide>
              <Box
                $mainTransaction
                $size="100%,270px">
              </Box>
            </SplideSlide>
            <SplideSlide>
              <Box
                $mainTransaction
                $size="100%,270px">
              </Box>
            </SplideSlide>
          </Splide>
        </div>

        <TransactionBox>

          <Box
            onClick={moveTransfer}
            $transaction
            $size="46%,60px">
            <ContentBox>
              <Text
                $smallTitle
                $size="90%,30px">거래하기</Text>
              <Content>
                가까운 지인에게 부담없이 빌리세요
              </Content>
            </ContentBox>
            <Image
              src={wallet}
              alt="wallet"
              width="39%"></Image>
          </Box>

          <Box
            onClick={moveTransactionList}
            $transaction
            $size="46%,60px">
            <ContentBox>
              <Text
                $smallTitle
                $size="90%,30px">거래목록</Text>
              <Content>
                지인간의 돈거래 까먹지 마세요!
              </Content>
            </ContentBox>    
            <Image
              src={Document}
              alt="Document"
              width="33%"></Image>
          </Box>

        </TransactionBox>
      </CenteredContainer>
      <Footer/>
    </>
  )
}

export default Main