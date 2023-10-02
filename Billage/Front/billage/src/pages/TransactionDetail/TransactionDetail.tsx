import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"

// 재사용 컴포넌트
import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import handshake from '/src/assets/transaction.svg'
import Image from "/src/components/Common/Image"
import Button from "/src/components/Common/Button"
import ProgressBar from "/src/components/Common/ProgressBar"
import Box from "/src/components/Common/Box";
import FlexDiv from "/src/components/Common/SpaceBetweenFlexBox"

// 이미지
import calendar2 from "/src/assets/calendar2.svg"
import clock from "/src/assets/alramClock.svg"
import won from "/src/assets/won.svg"
import percent from "/src/assets/percent.svg"
import total from "/src/assets/receiveMoney.svg"
import arrowRightGreen from "/src/assets/arrowRightGreen.svg"

//API
import { getTransActionDetail } from "/src/api/transaciton"

//타입스크립트
import { TransactionDetailType } from "/src/type/transaction"
import CenteredContainer from "/src/components/Common/CenterAlign"
import { TitleContainer } from "./TransactionDetail.style"


function TADetail() {
    //거래 상세 조회
    const [detail, setDetail] = useState<TransactionDetailType>();
    const axiosDetail = async (): Promise<void> => {
        try {
            const response = await getTransActionDetail(location.state.contractId);
            setDetail(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axiosDetail();
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state
    console.log(state)
    console.log(detail)
    const moveTransactionHistory = (contractId: number) => {
        navigate(`/transaction/history/${contractId}`, {state: contractId});
    };
    const moveToIOU = (contractId: number) => {
        navigate(`/transaction/detail/${contractId}/iou`, { state: { contractId } });
    };
     const moveToSendMoney = () => {
        navigate(`/sendmoney`, { state: { detail, state} });
    };

    const totalRepaymentCash =
        Number(detail?.contractAmt) + (Number(detail?.contractAmt) * Number(detail?.contractInterestRate)) / 100;

    return (
        <CenteredContainer>
          <Header 
            headerTitle="거래상세내용"></Header>

          <TitleContainer>
            <Text
              $size="92%"
              $title>{state.toggle ? '빌린' : '빌려준'} 거래</Text>

            <div 
              style={{
                display: 'flex',
                width:"92%"}}>
                <Image 
                  src={handshake} 
                  alt="악수"></Image>
                <Text
                  style={{marginLeft:"10px"}}
                  $smallTitle>{state.toggle ? state.creditoruser : state.debtoruser}님과의 거래!</Text>
            </div>

            <Text 
              $size="94%,45px"
              $description>상대방과 거래 시 작성한 상세 내용관 돈이 오고간 내역을 확인 할 수 있어요!</Text>
          </TitleContainer>

          <FlexDiv 
              // style={{border : "1px solid red"}}
              $margin="15px 0px 5px 0px">
              <Text $smallTitle>상세정보</Text>
              <Button
                  style= {{fontSize:"14px"}}
                  $smallGreenBtn
                  $size="70px,28px"
                  onClick={() => {
                      moveToIOU(state.contractId);}}>
                  차용증
              </Button>
          </FlexDiv>

          <FlexDiv $margin="1.5% 0%">
              <div style={{ display: 'flex' }}>
                  <Image 
                    src={calendar2} 
                    alt="빌린날짜"
                    width="20px"></Image>
                  <Text
                    style={{
                    marginLeft:"6px"}}
                    $transactionContent
                    >{state.toggle ? '빌린' : '빌려준'} 날짜</Text>
              </div>
              <Text>{detail?.contractStartDate}</Text>
          </FlexDiv>
          <FlexDiv $margin="1.5% 0%">
              <div style={{ display: 'flex' }}>
                  <Image 
                    src={clock} 
                    alt="갚는날짜"
                    width="20px"></Image>
                  <Text
                    style={{marginLeft:"6px"}}
                    $transactionContent>
                    {state.toggle ? '갚는' : '받는'} 날짜</Text>
              </div>
              <Text
                $transactionContent>
                {detail?.contractMaturityDate}</Text>
          </FlexDiv>
          <FlexDiv $margin="1.5% 0%">
              <div style={{ display: 'flex' }}>
                  <Image 
                    src={won} 
                    alt="빌린금액"
                    width="19px"></Image>
                  <Text
                    style={{marginLeft:"6px"}}
                    $transactionContent>
                    {state.toggle ? '빌린' : '빌려준'} 금액</Text>
              </div>
              <Text
                $transactionContent>
                {detail?.contractAmt}원</Text>
          </FlexDiv>
          <FlexDiv $margin="1.5% 0%">
              <div style={{ 
                  
                  display: 'flex' }}>
                  <Image 
                    src={percent} 
                    alt="이자"
                    width="20px"></Image>
                  <Text
                    style={{marginLeft:"6px"}}
                    $transactionContent>
                    이자</Text>
              </div>
              <Text
                $transactionContent>
                {detail?.contractInterestRate}%</Text>
          </FlexDiv>
          <FlexDiv 
              style={{
                height:"35px",
                borderBottom: "1px solid #BDBDBD"}}
              $alignItems="start"
              $margin="1.5% 0px 10px 0px">
              <div style={{ 
                display: 'flex',
                }}>
                  <Image 
                    src={total} 
                    alt="갚을금액"
                    width="19px"></Image>
                  <Text
                    style={{marginLeft:"6px"}}
                    $transactionContent>
                    {state.toggle ? '갚을' : '받을'} 금액</Text>
              </div>
              <Text
                $transactionContent>
                {totalRepaymentCash}원</Text>
          </FlexDiv>


          <FlexDiv 
            $alignItems="end" 
            $textAlign="center" 
            $margin="3% 0">
              <div style={{ 
                marginBottom:"12px",
                flex: 8 }}>
                <ProgressBar
                  progress={Math.round(100 - (Number(detail?.repaymentCash) / totalRepaymentCash) * 100)}/>
              </div>
              <div style={{ 
                flex: 2.5,
                height:"60px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                borderRadius: '10px', 
                backgroundColor: '#EAEAEA' }}>
                  <Text 
                    style={{marginBottom:"7px"}}
                    $smallContent>남은금액</Text>
                  <Text>{Number(detail?.repaymentCash)}</Text>
              </div>
          </FlexDiv>

          <Button
              style = {{marginBottom:"20px"}}
              $basicGreenBtn
              $size="94%,40px"
              onClick={() => {
                  if (state.toggle) {
                      moveToSendMoney()}}}
              >{state.toggle ? '돈 보내기' : '돈 달라하기'}
          </Button>

          <div style={{
            borderTop: "1px solid #BDBDBD",
            width: "92%",
            height:"15px"
          }}></div>

          <Text 
            $size='92%,40px'
            $smallTitle>거래내역</Text>
          <Box
            $size='80%,40px'
            $goDetailTransaction
            onClick={() => {moveTransactionHistory(location.state.contractId)}}>
              거래내역 확인하러 가기.
              <Image
                src={arrowRightGreen}
                alt="arrowRightGreen"></Image>
          </Box>
        </CenteredContainer>
    );
}

export default TADetail

            {/* 삭제 ㄴㄴㄴㄴㄴㄴㄴ */}
            {/* {
            borrowlist.map((list, index) =>(
                <FlexDiv 
                  key={index}
                  $margin="3% 0%">
                    <div style={{display: 'flex'}}>
                        <Image src={image[index]} alt={list}></Image>
                        <Text>{list}</Text>
                    </div>
                    <Text>{borrowdetail[index]}</Text>
                </FlexDiv>
            )
            )} */}