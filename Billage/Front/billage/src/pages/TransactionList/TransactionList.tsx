import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import Button from "/src/components/Common/Button"
import {useState} from 'react'
import History from "../TransactionHistory/TransactionHistory"
import CenteredContainer from "/src/components/Common/CenterAlign"
function TransactionList() {
    const [toggle, setToggle] = useState(true)

    const handleBorrowedClick = () => {
        setToggle(true);
      };
    
      const handleLentClick = () => {
        setToggle(false);
      };

    return(
        <>
        <CenteredContainer>
            <Header headerTitle="거래목록"/>

            <div style={{display: 'flex', width:'98%', justifyContent:"space-between"}}>
                <Text $PinText>어떤 거래야?</Text>

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
            {[1,2,3,4].map((item) => (
                <History toggle={toggle} key={item}/>
            ))}
            </CenteredContainer>
        </>
    )
}

export default TransactionList