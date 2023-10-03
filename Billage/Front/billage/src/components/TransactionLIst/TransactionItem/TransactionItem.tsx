// 재사용 컴포넌트
import Text from "/src/components/Common/Text";
import ProgressBar from '../../Common/ProgressBar';

// 스타일 컴포넌트
import { TransActionBox } from "./TransactionItem.style";

// 타입스크립트
import { TransactionType } from '/src/type/transaction';

interface TransactionItemProps {
    item: TransactionType;
    toggle: boolean;
  }

  function TransactionItem({ item, toggle }: TransactionItemProps) {

    // const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //       if (progress < 75) {
    //         setProgress(progress + 25);
    //       }
    //     }, 1000);
    
    //     return () => clearInterval(timer);
    //   }, [progress]);

    return(
      <TransActionBox>
      <div 
        style={{
          padding: "2% 3% 2% 2%",
          display: 'flex', 
          width: '95%'}}>
        <div 
          id="left" 
          style={{ 
            flex: '8.5',
            height:"100px",
            display:'flex',
            flexDirection: 'column'}}>
          <div style={{
              margin:"3px 0px 17% 3px",
              height: "40px",}}>
            <Text>{toggle? item.creditorUser.userName : item.debtorUser.userName}님과의 거래에요!</Text>
          </div>
          <div style={{
              marginLeft:"5%"}}>
            <ProgressBar
              progress={((item.contractAmt - item.repaymentCash)/item.contractAmt)*100}/>
          </div>
        </div>
        
        <div 
          id="right"
          style={{
            flex: '3.5',
            height:"95px", 
            textAlign:'center'}}>
            <div style={{
              marginBottom: '8%', 
              marginTop:'5%'}}>
              <Text 
                  $smallestContent>
                  {toggle ? '빌린금액' : '빌려준 금액'}</Text>
              <Text $smallContent>
                  {item.contractAmt}</Text> 
            </div>
            <div style={{
              padding:"8px 0px",
              borderRadius: '10px', 
              backgroundColor : '#EAEAEA' }}>
              <Text $smallContent>
                  남은금액</Text>
              <Text>
                  {item.repaymentCash}</Text>
            </div>
        </div>
      </div>
      </TransActionBox>
    )
}

export default TransactionItem