import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"

// 재사용 컴포넌트
import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import Button from "/src/components/Common/Button"
import CenteredContainer from "/src/components/Common/CenterAlign"
import TransactionItem from "/src/components/TransactionLIst/TransactionItem/TransactionItem"

// 스타일 컴포넌트
import { 
  ButtonBox, 
  TitleBox, 
  TransActionContainer} from "./TransactionList.style"

// API
import { 
  getBorrowList, 
  getLendList } from "/src/api/transaciton"

// 타입스크립트
import { TransactionType } from "/src/type/transaction"

function TransactionList() {
  const [toggle, setToggle] = useState(true)
  const [list, setList] = useState<TransactionType[]>([]) 
    const navigate = useNavigate();

    const axiosTransActionList =async (): Promise<void> => {
        try{
            if (toggle) {
                const response = await getBorrowList()
                setList(response?.data)
                console.log('빌린목록 조회',response?.data) 
            }
            else{
                const response = await getLendList()
                setList(response?.data)
                console.log('빌려준 목록 조회', response?.data)            
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        axiosTransActionList()
      }, [toggle])

    const handleBorrowedClick = () => {
        setToggle(true);
      };
    
    const handleLentClick = () => {
      setToggle(false);
    };
    
    const moveToDetail = (contractId: number, creditoruser: string, debtoruser: string) => {
        navigate(`/transaction/detail/${contractId}`,
        { state: { contractId, toggle, creditoruser, debtoruser } });
    }

    return(
      <CenteredContainer>
        <Header headerTitle="거래목록"/>
          <TitleBox>
            <Text 
              $title>어떤 거래야?</Text>

            <ButtonBox>
              <Button
                $transActionToggle
                $size='45%,'
                $Toggle={toggle}
                onClick={handleBorrowedClick}>빌린목록</Button>
              <Button
                $transActionToggle
                $size='52%,'
                $Toggle={!toggle}
                onClick={handleLentClick}>빌려준목록</Button>
            </ButtonBox>
          </TitleBox>

        <TransActionContainer>
        {list?.map((item, index) => (
            <div 
              key={index} 
              style={{
              width : '94%'}} 
              onClick={() =>
              moveToDetail(item.contractId, item.creditorUser.userName, item.debtorUser.userName)}>
              <TransactionItem key={index} item={item} toggle={toggle} />
            </div>
        ))}
        </TransActionContainer>

          {/* {[1,2,3,4].map((item) => (
              <TransactionItem toggle={toggle} key={item}/>
          ))} */}
      </CenteredContainer>
    )
}

export default TransactionList