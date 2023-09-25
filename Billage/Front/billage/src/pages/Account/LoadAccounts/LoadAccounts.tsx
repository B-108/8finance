import { useState } from 'react';

//스타일 컴포넌트
import { AccountImage, AccountNumber, Accounts, AccountsContainer, BankName, Text } from './LoadAccounts.style';

//공용 컴포넌트
import CenteredContainer from '/src/components/Common/CenterAlign';
import Header from '/src/components/Header/Header';

//이미지
import NH from '/src/assets/NH.svg';
import KB from '/src/assets/KB.svg';
import Button from '/src/components/Common/Button';

function LoadAccounts() {
    const [isAccountClicked, setIsAccountClicked] = useState(false);

    const handleAccountClick = () => {
        setIsAccountClicked(!isAccountClicked); // 클릭 시 테두리 색 변경
    };
    return (
        <>
            <CenteredContainer>
                <Header headerTitle="계좌 선택"></Header>
                <Text>등록할 계좌를 선택해주세요.</Text>
                <AccountsContainer>
                    <Accounts onClick={handleAccountClick} $isClicked={isAccountClicked}>
                        <AccountImage src={NH} alt="NH" />
                        <div>
                            <BankName>농협은행</BankName>
                            <AccountNumber>123-456-7890</AccountNumber>
                        </div>
                    </Accounts>
                    <Accounts onClick={handleAccountClick} $isClicked={isAccountClicked}>
                        <AccountImage src={KB} alt="KB" />
                        <div>
                            <BankName>농협은행</BankName>
                            <AccountNumber>123-456-7890</AccountNumber>
                        </div>
                    </Accounts>
                </AccountsContainer>
                <ButtonContainer></ButtonContainer>
            </CenteredContainer>
        </>
    );
}

export default LoadAccounts;

const ButtonContainer = () => {
    return (
        <div
            style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                position: 'absolute',
                bottom: '20px',
            }}
        >
            <Button $basicGrayBtn $size="100%, 50px" style={{ margin: '10px' }}>
                돌아가기
            </Button>
            <Button $basicGreenBtn $size="100%, 50px" style={{ margin: '10px' }}>
                등록
            </Button>
        </div>
    );
};
