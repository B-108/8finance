import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';
import Button from '/src/components/Common/Button';
import IOU from '/src/components/IOU/IOU';

function IOUPage() {
    const handleDownload = () => {
        console.log('다운로드');
    };
    return (
        <>
            <CenteredContainer $center>
                <Header headerTitle="차용증"></Header>
                <IOU></IOU>
                <hr />
                <Button $basicGreenBtn $size="100%,43px" $Green onClick={handleDownload}>
                    다운로드
                </Button>
                <hr />
            </CenteredContainer>
        </>
    );
}

export default IOUPage;
