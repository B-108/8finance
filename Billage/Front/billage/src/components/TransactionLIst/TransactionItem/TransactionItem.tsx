import { useState, useEffect } from 'react';
import Text from "/src/components/Common/Text";
import ProgressBar from '../../Common/ProgressBar';
interface HistoryProps {
    toggle: boolean;
  }

  function TransactionItem({ toggle }: HistoryProps) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          if (progress < 75) {
            setProgress(progress + 25);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [progress]);
 

    return(
            <div style={{margin: '3% 0%', display: 'flex', border: '3px solid #6E960D', borderRadius: 15 ,width: '90%'}}>
                
                <div id="left" style={{ flex: '8.5', display:'flex', flexDirection: 'column', marginLeft: '3%'}}>
                    <div style={{marginBottom : '15%'}}>
                        <Text>000님과의 거래에요!</Text>
                    </div>
                    <ProgressBar progress={progress} />
                </div>
                
                <div id="right"style={{flex: '3.5', textAlign:'center'}}>
                    <div style={{marginBottom: '15%', marginTop:'3%'}}>
                        <Text $smallestContent>
                            {toggle ? '빌린금액' : '빌려준 금액'}
                        </Text>
                        <Text $smallContent>
                            ￦500.000
                        </Text> 
                    </div>
                    <div style={{borderRadius: '10px', backgroundColor : '#EAEAEA' }}>
                        <Text $smallContent>
                            남은금액
                        </Text>
                        <Text>
                            ￦260.000
                        </Text>
                    </div>
                </div>
            </div>
    )
}

export default TransactionItem