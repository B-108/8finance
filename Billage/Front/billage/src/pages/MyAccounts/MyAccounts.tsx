import { Accounts, AccountsContainer, RegistButton, TextDiv } from './MyAccounts.style';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Footer from '/src/components/Common/Footer';
import Header from '/src/components/Header/Header';
import sampleAccount from '/src/assets/sampleAccount.svg';
import sampleAccount2 from '/src/assets/sampleAccount2.svg';

function MyAccounts() {
    return (
        <>
            <CenteredContainer>
                <Header headerTitle="내 계좌"></Header>
                <TextDiv>카드를 꾸욱 눌러서 주 계좌를 설정해 보세요!</TextDiv>
                <RegistButton>계좌 등록</RegistButton>
                <AccountsContainer>
                    <Accounts src={sampleAccount}></Accounts>
                    <Accounts src={sampleAccount2}></Accounts>
                    {/* <Accounts src={sampleAccount2}></Accounts> */}
                </AccountsContainer>
                <Footer></Footer>
            </CenteredContainer>
        </>
    );
}

export default MyAccounts;
