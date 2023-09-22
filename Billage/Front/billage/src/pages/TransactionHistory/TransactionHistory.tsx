import { useState, useEffect } from 'react';
import ProgressBar from '/src/pages/TransactionList/ProgressBar';
import Text from "/src/components/Common/Text";

interface HistoryProps {
    toggle: boolean;
  }

  function History({ toggle }: HistoryProps) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 50) {
                setProgress(progress + 10);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [progress]);
 

    return(
            <div style={{margin: '3% 0%', display: 'flex', border: '3px solid #6E960D', borderRadius: 15 ,width: '90%'}}>
                
                <div id="left" style={{ flex: '8.5', display:'flex', flexDirection: 'column'}}>
                    <p style={{marginBottom: '10%'}}>000님과의 거래에요!</p>
                    <ProgressBar progress={progress} />
                </div>
                
                <div id="right"style={{flex: '3.5', textAlign:'center'}}>
                    <div style={{marginBottom: '15%', marginTop:'3%'}}>
                        <Text $description>
                            {toggle ? '빌린금액' : '빌려준 금액'}
                        </Text>
                        <Text>
                            ￦500.000
                        </Text>
                    </div>
                    <div style={{borderRadius: '10px', backgroundColor : '#EAEAEA' }}>
                        <Text $description>
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

export default History