import Header from "/src/components/Header/Header"
import Text from "/src/components/Common/Text"
import Button from "/src/components/Common/Button"
import {useState} from 'react'

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
            <Header headerTitle="거래목록"/>

            <div style={{display: 'flex', justifyContent:"space-evenly"}}>
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
        </>
    )
}

export default TransactionList


// import React, { useState, useEffect } from 'react';
// import ProgressBar from './ProgressBar';

// function TransactionList() {
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         // 여기에서 진행 상태를 업데이트하는 로직을 추가합니다.
//         // 예를 들어, setTimeout을 사용하여 시간이 지남에 따라 진행 상태를 업데이트할 수 있습니다.
//         const interval = setInterval(() => {
//             if (progress < 100) {
//                 setProgress(progress + 10);
//             } else {
//                 clearInterval(interval);
//             }
//         }, 1000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, [progress]);

//     return (
//         <div>
//             <h1>Progress Bar Example</h1>
//             <ProgressBar progress={progress} />
//         </div>
//     );
// }

// export default TransactionList;
