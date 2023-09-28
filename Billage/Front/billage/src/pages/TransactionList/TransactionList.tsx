import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import Button from "/src/components/Common/Button"
import {useState, useEffect} from 'react'
import CenteredContainer from "/src/components/Common/CenterAlign"
import TransactionItem from "/src/components/TransactionLIst/TransactionItem/TransactionItem"
import { useNavigate } from "react-router-dom"
//API
import { getBorrowList, getLendList } from "/src/api/transaciton"
//타입스크립트
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
        <>
        <CenteredContainer>
            <Header headerTitle="거래목록"/>

            <div style={{display: 'flex', width:'98%', justifyContent:"space-between"}}>
                <Text $title>어떤 거래야?</Text>

                <div style={{display:'flex', alignItems:'center', justifyItems:'center'}}>
                        <Button
                            $smallGrayBtn
                            onClick={handleBorrowedClick}
                            $Gray={toggle} 
                        >
                        빌린목록</Button>
                        <Button
                            $smallGrayBtn
                            onClick={handleLentClick}
                            $Green={!toggle} 
                        >
                        빌려준목록</Button>
                </div>
            </div>
            {list?.map((item, index) => (
                <div style={{width : '95%'}} onClick={() =>
                 moveToDetail(item.contractId, item.creditorUser.userName, item.debtorUser.userName)}>
                <TransactionItem key={index} item={item} toggle={toggle} />
                </div>
          ))}
            {/* {[1,2,3,4].map((item) => (
                <TransactionItem toggle={toggle} key={item}/>
            ))} */}
            </CenteredContainer>
        </>
    )
}

export default TransactionList