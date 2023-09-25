import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import handshake from '/src/assets/transaction.svg'
import Image from "/src/components/Common/Image"
import Button from "/src/components/Common/Button"
import calendar from "/src/assets/calendar.svg"
import clock from "/src/assets/alramClock.svg"
import total from "/src/assets/receiveMoney.svg"
import ProgressBar from "/src/components/Common/ProgressBar"
import { useState, useEffect } from 'react';
import Box from "/src/components/Common/Box";
import FlexDiv from "/src/components/Common/SpaceBetweenFlexBox"
import { useNavigate } from "react-router-dom"



function TADetail(){
    const image = [calendar, clock, calendar, clock, total]
    const borrowlist = ['빌린날짜', '갚는날짜', '빌린금액', '이자', '갚을금액']
    const lentlist = ['빌려준날짜', '갚는날짜', '빌려준금액', '이자', '받을금액']
    const borrowdetail = ['2023.08.20(일)', '2023.10.10(화)', 500000+'원', 10+'%', 500000*1.1+'원']
    const lentdetail = ['2023.08.20(일)', '2023.10.10(화)', 500000+'원', 10+'%', 500000*1.1+'원']

    const [progress, setProgress] = useState(0);
    
    const navigate = useNavigate()
    const moveTransactionHistory = () => {navigate(`/transactionhistory`)}

    useEffect(() => {
        const timer = setInterval(() => {
          if (progress < 75) {
            setProgress(progress + 25);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [progress]);


    return(
        <>
        <div style={{margin:'0px 2%'}}>
            <Header headerTitle="거래상세내용"></Header>
            <Text $title>빌린 거래</Text>

            <div style={{display : 'flex', margin: '3% 0px'}}>
                <Image src={handshake} alt="악수"></Image>
                <Text $smallTitle>000님과의 거래!</Text>
            </div>
            
            <Text $description>상대방과 거래 시 작성한 상세 내용관 돈이 오고간 내역을 확인 할 수 있어요!</Text>
            <hr/>
            
            <FlexDiv>
                <Text $smallTitle>상세정보</Text>
                <Button $smallGreenBtn>차용증</Button>
            </FlexDiv>

            {
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
            )}
            <hr />
            <FlexDiv $alignItems="center" $textAlign="center" $margin="5% 0">
                <div style={{flex : 8}}>
                    <ProgressBar progress={progress} />
                </div>
                <div style={{flex: 2.5 ,borderRadius: '10px', backgroundColor : '#EAEAEA' }}>
                    <Text $smallContent>
                        남은금액
                    </Text>
                    <Text>
                        ￦260.000
                    </Text>
                </div>
            </FlexDiv>

            <Button $basicGreenBtn $size="100%, 40px">돈 달라하기</Button>
            
            <hr />

            <Text $smallTitle>거래내역</Text>
            <Box 
              $transaction
              onClick={moveTransactionHistory}>총 4건의 거래내역이 있습니다.</Box>

            {/* 삭제 ㄴㄴㄴㄴㄴㄴㄴ */}
            {/* <div style={{display: 'flex', width:'100%', justifyContent:"space-between"}}>
                <div style={{display: 'flex'}}>
                <Image src={calendar} alt="빌린날자"></Image>
                <Text>빌린날짜</Text>
                </div>
                <Text>2023.08.20(일)</Text>
            </div>
            <div style={{display: 'flex', width:'100%', justifyContent:"space-between"}}>
                <div style={{display: 'flex'}}>
                <Image src={clock} alt="갚는날짜"></Image>
                <Text>갚는날짜</Text>
                </div>
                <Text>2023.10.10(화)</Text>
            </div>
            <div style={{display: 'flex', width:'100%', justifyContent:"space-between"}}>
                <div style={{display: 'flex'}}>
                <Image src={calendar} alt="빌린금액"></Image>
                <Text>빌린금액</Text>
                </div>
                <Text>500.000원</Text>
            </div>
            <div style={{display: 'flex', width:'100%', justifyContent:"space-between"}}>
                <div style={{display: 'flex'}}>
                <Image src={calendar} alt="이자"></Image>
                <Text>이자</Text>
                </div>
                <Text>10%</Text>
            </div>
            <div style={{display: 'flex', width:'100%', justifyContent:"space-between"}}>
                <div style={{display: 'flex'}}>
                <Image src={total} alt="갚을금액"></Image>
                <Text>갚을금액</Text>
                </div>
                <Text>550.000원</Text>
            </div> */}
            </div>
        </>
    )
}

export default TADetail
