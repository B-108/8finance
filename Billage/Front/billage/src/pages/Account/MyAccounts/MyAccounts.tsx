import React, { useState } from 'react';
import { Accounts, AccountsContainer, RegistButton, TextDiv } from './MyAccounts.style';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Footer from '/src/components/Common/Footer';
import Header from '/src/components/Header/Header';
import sampleAccount from '/src/assets/sampleAccount.svg';
import sampleAccount2 from '/src/assets/sampleAccount2.svg';

function MyAccounts() {
    const [isAccountClicked, setIsAccountClicked] = useState(false);

    const handleAccountClick = () => {
        setIsAccountClicked(true); // 클릭 시 테두리 색 변경
        setTimeout(() => {
            setIsAccountClicked(false); // 3초 후에 테두리 색 원래대로 복구
        }, 3000); // 3초 동안 유지
    };

    return (
        <>
            <CenteredContainer>
                <Header headerTitle="내 계좌"></Header>
                <TextDiv>카드를 꾸욱 눌러서 주 계좌를 설정해 보세요!</TextDiv>
                <RegistButton>계좌 등록</RegistButton>
                <AccountsContainer>
                    <Accounts
                        src={sampleAccount}
                        onClick={handleAccountClick}
                        $isClicked={isAccountClicked} // 계좌 클릭 여부 상태 전달
                    ></Accounts>
                    <Accounts
                        src={sampleAccount2}
                        onClick={handleAccountClick}
                        $isClicked={isAccountClicked} // 계좌 클릭 여부 상태 전달
                    ></Accounts>
                </AccountsContainer>
            </CenteredContainer>
            <Footer/>
        </>
    );
}

export default MyAccounts;
