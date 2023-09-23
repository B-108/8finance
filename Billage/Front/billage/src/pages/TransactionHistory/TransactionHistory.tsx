import { useState, useEffect } from 'react';
import ProgressBar from '../../components/Common/ProgressBar';
import Text from "/src/components/Common/Text";
interface HistoryProps {
    toggle: boolean;
  }

  function History({ toggle }: HistoryProps) {

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
                        <Text $smallestText>
                            {toggle ? '빌린금액' : '빌려준 금액'}
                        </Text>
                        <Text $smallText>
                            ￦500.000
                        </Text>
                    </div>
                    <div style={{borderRadius: '10px', backgroundColor : '#EAEAEA' }}>
                        <Text $smallText>
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