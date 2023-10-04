// 재사용 컴포넌트
import Text from "/src/components/Common/Text";
import ProgressBar from '../../Common/ProgressBar';

// 스타일 컴포넌트
import { TransActionBox, NonTransActionBox } from "./TransactionItem.style";

// 타입스크립트
import { TransactionType } from '/src/type/transaction';

interface TransactionItemProps {
    item: TransactionType;
    toggle: boolean;
  }

  function TransactionItem({ item, toggle }: TransactionItemProps) {
    const contractState = item.contractState
    const totalprice = (item.interestRate * item.contractAmt)/ 100 + item.contractAmt
    
    return(
      contractState === 1 ?(
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
              progress={100 - ((item.repaymentCash/totalprice)* 100)}/>
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
                  {item.contractAmt.toLocaleString()}</Text> 
            </div>
            <div style={{
              padding:"8px 0px",
              borderRadius: '10px', 
              backgroundColor : '#EAEAEA' }}>
              <Text $smallContent>
                  남은금액</Text>
              <Text>
                  {item.repaymentCash.toLocaleString()}</Text>
            </div>
        </div>
      </div>
      </TransActionBox>
      ) : (
        <NonTransActionBox>
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
              <Text>{toggle && contractState === 0 ? `${item.creditorUser.userName}님의 답장을 기다리고 있어요!`
              : !toggle && contractState === 0 ? `${item.debtorUser.userName}님이 돈을 빌려달래요!`
              : toggle && contractState === 9 ? `${item.creditorUser.userName}님과의 완료된 거래에요!`
              : `${item.debtorUser.userName}님과의 완료된 거래에요`
            }</Text>
            </div>
            <div style={{
                marginLeft:"5%"}}>
              <ProgressBar
                progress={100 - ((item.repaymentCash/totalprice)* 100)}/>
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
                    {item.contractAmt.toLocaleString()}</Text> 
              </div>
              <div style={{
                padding:"8px 0px",
                borderRadius: '10px', 
                backgroundColor : '#EAEAEA' }}>
                <Text $smallContent>
                    남은금액</Text>
                <Text>
                    {item.repaymentCash.toLocaleString()}</Text>
              </div>
          </div>
        </div>
        </NonTransActionBox>
      )
    )
}

export default TransactionItem