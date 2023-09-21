import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function TransactionList() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 여기에서 진행 상태를 업데이트하는 로직을 추가합니다.
        // 예를 들어, setTimeout을 사용하여 시간이 지남에 따라 진행 상태를 업데이트할 수 있습니다.
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 10);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [progress]);

    return (
        <div>
            <h1>Progress Bar Example</h1>
            <ProgressBar progress={progress} />
        </div>
    );
}

export default TransactionList;
