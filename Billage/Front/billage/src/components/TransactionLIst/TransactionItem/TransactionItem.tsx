import Text from "/src/components/Common/Text";
import ProgressBar from '../../Common/ProgressBar';
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
      <div 
        style={{
          margin: '6px 0%', 
          padding: "2% 3% 2% 2%",
          display: 'flex', 
          border: '3px solid #6E960D', 
          borderRadius: 15 ,
          width: '88%'}}>
        <div 
          id="left" 
          style={{ 
            flex: '8.5', 
            display:'flex', 
            flexDirection: 'column'}}>
          <div style={{
              height: "32px",
              marginBottom : '15%'}}>
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
            textAlign:'center'}}>
            <div style={{
              marginBottom: '15%', 
              marginTop:'3%'}}>
              <Text $smallestContent>
                  {toggle ? '빌린금액' : '빌려준 금액'}</Text>
              <Text $smallContent>
                  ￦{item.contractAmt}</Text> 
            </div>
            <div style={{
              borderRadius: '10px', 
              backgroundColor : '#EAEAEA' }}>
              <Text $smallContent>
                  남은금액</Text>
              <Text>
                  ￦{item.repaymentCash}</Text>
            </div>
        </div>
      </div>
    )
}

export default TransactionItem