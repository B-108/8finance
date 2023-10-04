import { 
  useEffect, 
  useState, 
  useContext,
  useCallback } from "react"
import { useNavigate } from "react-router-dom"

// 재사용 컴포넌트
import Box from "/src/components/Common/Box"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Image from "/src/components/Common/Image"
import Text from "/src/components/Common/Text"
import Header from "/src/components/Header/Header"
import Footer from "/src/components/Common/Footer"
import DonutChart from "/src/components/Common/DonutChart"

// 스타일 컴포넌트
import { 
  AlarmContent, 
  AlarmDate, 
  AlarmHeader, 
  BottomSection, 
  Content, 
  ContentBox, 
  Remain, 
  SendBtn, 
  SignBox, 
  TextBox, 
  TextDown, 
  TextUp, 
  TopSection, 
  TransactionBox } from "./Main.style"

// 이미지
import alarmBell2 from "/src/assets/alarmBell2.svg"
import wallet from "/src/assets/wallet.svg"
import Document from "/src/assets/DocumentList.svg"
import Dollar from "/src/assets/dollar.svg"

// 라이브러리
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

// 타입스크립트
import { TransactionType } from "/src/type/transaction"
import { NotificationType } from "/src/type/noti"

// API
import { 
  getBorrowList, 
  getLendList } from "/src/api/transaciton"

// 리코일
import { PhoneState } from "/src/recoil/auth"
import { useRecoilState } from "recoil"
import { getNotifiCation } from "/src/api/noti"


function Main(){
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [transList, setTransList] = useState<TransactionType[]>([])
  const [noti, setNoti] = useState<NotificationType>()

  // 라우터
  const navigate = useNavigate()
  const moveTransfer = () => {navigate(`/transfer`)}
  const moveTransactionList = () => {navigate(`/transactionlist`)}
  const moveNotifications = () => {navigate(`/notifications`)}
  const moveToSendMoney = (data: TransactionType) => {
    console.log(data)
    navigate(`/sendmoney`, { state: {data} });
  };

  const axiosAllTransActionList = async () => {
    try {
      const Borrow = await getBorrowList()
      const Lend = await getLendList()
      const response = await [...Borrow?.data, ...Lend?.data]
      await setTransList(response.filter((data) => (data.contractState === 1)))
    }
    catch(error){
      console.log(error)
    }
  }

  // 알람목록조회
  const axiosNotifiCation = async (): Promise<void> => {
    try {
      const response =  await getNotifiCation()
      const reversedData = response?.data.reverse()
      const filteredData = reversedData.filter((item,index) => item.noticeState === 0);
      setNoti(filteredData);
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axiosNotifiCation()
    axiosAllTransActionList()
  }, [])

  return(
    <>
      <CenteredContainer>
        <Header
          headerTitle="Billage"
          ></Header>
        
        <Text
          $title
          $size="94%,50px">확인 하지 않은 알림!</Text>

        <Box
          onClick={moveNotifications}
          $alarmBox
          $size="88%,80px">
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
          $size="94%,50px">나의거래</Text>

        <div style={{width:"100%"}}>
          <Splide
            options={{
              focus  : 'center',
              rewind: true,
              arrows : false,
              gap   : '5%',
              padding: '12%',}}
              aria-label="My Favorite Images"> 
            {transList.length > 0 ? (
              <>
                {transList && transList.map((transAction,index) => (
                transAction.contractState === 1 ? (
                  <SplideSlide key={index}>
                    {transAction.debtorUser.userCellNo === phone ? (
                      <Box
                        $mainTransaction
                        $size="100%,270px">
                        <TopSection>
                          <SignBox>빌린 돈</SignBox>
                          <TextUp>'{transAction.creditorUser.userName}'</TextUp>
                          <TextDown>님에게 빌렸어요!</TextDown>
                          <DonutChart 
                            Return={transAction.repaymentCash}
                            Money={transAction.contractAmt}
                            Interest={transAction.interestRate}/>
                        </TopSection>

                        <BottomSection>
                          <Image
                            src={Dollar}
                            alt="Dollar"
                            width="20px"></Image>
                          <TextBox>
                            <Remain>남은금액</Remain>
                            <Remain>{transAction.repaymentCash.toLocaleString()}</Remain>
                          </TextBox>
                          <SendBtn onClick={() => moveToSendMoney(transAction)}>돈 돌려주기</SendBtn>
                        </BottomSection>
                      </Box>
                      ) : (
                      <Box
                        $mainTransaction
                        $size="100%,270px">
                        <TopSection>
                          <SignBox>빌려준 돈</SignBox>
                          <TextUp>'{transAction.debtorUser.userName}'</TextUp>
                          <TextDown>님에게 빌려줬어요!</TextDown>
                          <DonutChart
                            Return={transAction.repaymentCash}
                            Money={transAction.contractAmt}
                            Interest={transAction.interestRate}/>
                        </TopSection>

                        <BottomSection>
                          <Image
                            src={Dollar}
                            alt="Dollar"
                            width="20px"></Image>
                          <TextBox>
                            <Remain>남은금액</Remain>
                            <Remain>{transAction.repaymentCash.toLocaleString()}</Remain>
                          </TextBox>
                          <SendBtn>돈 달라하기</SendBtn>
                        </BottomSection>
                      </Box>
                      )
                    }
                  </SplideSlide>
                ) : ("")
              ))} 
              </>
            ) : (
              <SplideSlide>
                <Box
                  $mainTransaction
                  $size="100%,270px">
                  <TopSection>
                    <SignBox>빌린 돈</SignBox>
                    <TextUp>지인에게</TextUp>
                    <TextDown>부담없이 빌리세요!</TextDown>
                  </TopSection>

                  <BottomSection>
                    <Image
                      src={Dollar}
                      alt="Dollar"
                      width="20px"></Image>
                    <TextBox>
                      <Remain>남은금액</Remain>
                      <Remain>0</Remain>
                    </TextBox>
                    <SendBtn>돈 돌려주기</SendBtn>
                  </BottomSection>
                </Box>
              </SplideSlide>
            )}
          </Splide>
        </div>

        <TransactionBox>
          <Box
            onClick={moveTransfer}
            $transaction
            $size="45%,60px">
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
            $size="45%,60px">
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