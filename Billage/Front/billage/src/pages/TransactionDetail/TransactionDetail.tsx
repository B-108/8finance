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
import { useNavigate, useLocation } from "react-router-dom"

//API
import { getTransActionDetail } from "/src/api/transaciton"

//타입스크립트
import { TransactionDetailType } from "/src/type/transaction"


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
        <>
            <div style={{ margin: '0px 2%' }}>
                <Header headerTitle="거래상세내용"></Header>
                <Text $title>{state.toggle ? '빌린' : '빌려준'} 거래</Text>

                <div style={{ display: 'flex', margin: '3% 0px' }}>
                    <Image src={handshake} alt="악수"></Image>
                    <Text $smallTitle>{state.toggle ? state.creditoruser : state.debtoruser}님과의 거래!</Text>
                </div>

                <Text $description>상대방과 거래 시 작성한 상세 내용관 돈이 오고간 내역을 확인 할 수 있어요!</Text>
                <hr />

                <FlexDiv $margin="3% 0%">
                    <Text $smallTitle>상세정보</Text>
                    <Button
                        $smallGreenBtn
                        onClick={() => {
                            moveToIOU(state.contractId);
                        }}
                    >
                        차용증
                    </Button>
                </FlexDiv>

                <FlexDiv $margin="3% 0%">
                    <div style={{ display: 'flex' }}>
                        <Image src={clock} alt="빌린날짜"></Image>
                        <Text>{state.toggle ? '빌린' : '빌려준'} 날짜</Text>
                    </div>
                    <Text>{detail?.contractStartDate}</Text>
                </FlexDiv>
                <FlexDiv $margin="3% 0%">
                    <div style={{ display: 'flex' }}>
                        <Image src={clock} alt="갚는날짜"></Image>
                        <Text>{state.toggle ? '갚는' : '받는'} 날짜</Text>
                    </div>
                    <Text>{detail?.contractMaturityDate}</Text>
                </FlexDiv>
                <FlexDiv $margin="3% 0%">
                    <div style={{ display: 'flex' }}>
                        <Image src={calendar} alt="빌린금액"></Image>
                        <Text>{state.toggle ? '빌린' : '빌려준'} 금액</Text>
                    </div>
                    <Text>{detail?.contractAmt}원</Text>
                </FlexDiv>
                <FlexDiv $margin="3% 0%">
                    <div style={{ display: 'flex' }}>
                        <Image src={calendar} alt="이자"></Image>
                        <Text>이자</Text>
                    </div>
                    <Text>{detail?.contractInterestRate}%</Text>
                </FlexDiv>
                <FlexDiv $margin="3% 0%">
                    <div style={{ display: 'flex' }}>
                        <Image src={total} alt="갚을금액"></Image>
                        <Text>{state.toggle ? '갚을' : '받을'} 금액</Text>
                    </div>
                    <Text>{totalRepaymentCash}원</Text>
                </FlexDiv>

                <hr />
                <FlexDiv $alignItems="center" $textAlign="center" $margin="5% 0">
                    <div style={{ flex: 8 }}>
                        <ProgressBar
                            progress={Math.round(100 - (Number(detail?.repaymentCash) / totalRepaymentCash) * 100)}
                        />
                    </div>
                    <div style={{ flex: 2.5, borderRadius: '10px', backgroundColor: '#EAEAEA' }}>
                        <Text $smallContent>남은금액</Text>
                        <Text>￦{Number(detail?.repaymentCash)}</Text>
                    </div>
                </FlexDiv>

                <Button
                    $basicGreenBtn
                    $size="100%, 40px"
                    onClick={() => {
                        if (state.toggle) {
                            moveToSendMoney();
                        }}}
                    >{state.toggle ? '돈 보내기' : '돈 달라하기'}
                </Button>

                <hr />

                <Text $smallTitle>거래내역</Text>
                <Box $transaction onClick={() => {moveTransactionHistory(location.state.contractId)}}>
                    거래내역 확인하러 가기.
                </Box>
            </div>
        </>
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