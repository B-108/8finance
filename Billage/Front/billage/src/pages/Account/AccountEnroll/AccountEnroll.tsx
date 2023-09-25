import React, { useState } from 'react';
import { Text } from './AccountEnroll.style';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Footer from '/src/components/Common/Footer';
import Header from '/src/components/Header/Header';
import Input, { ButtonBox, InputAuthHeader, InputDiv } from '/src/components/Common/Input';
import Button from '/src/components/Common/Button';
import { useRecoilState } from 'recoil';
import { PhoneState } from '/src/recoil/auth';
import fontSize from '/src/themes/fontSize';
import theme from '/src/themes';
import styled from 'styled-components';

function AccountEnroll() {
    const [phone, setPhone] = useRecoilState<string>(PhoneState);
    const MAX_LENGTH = 20;

    //체크박스
    const [isChecked, setIsChecked] = useState(false);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > MAX_LENGTH) {
            event.target.value = event.target.value.slice(0, MAX_LENGTH);
        }
        setPhone(event.target.value.split(' ').join(''));
        console.log(phone);
    };

    return (
        <>
            <CenteredContainer>
                <Header headerTitle="계좌 등록"></Header>
                <Text>계좌를 불러올 은행을 선택해주세요.</Text>
                <AgreementDiv>
                    마이데이터를 통해 사용자의 계좌 정보를 불러오는 데에 동의 합니다.
                    <Checkbox type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                </AgreementDiv>
                <hr />
                <InputDiv style={{ marginBottom: '1rem' }}>
                    <InputAuthHeader>핸드폰번호</InputAuthHeader>
                    <Input type="phone" value={phone} $size="98%,40px" $active onChange={handlePhoneChange} />
                    <ButtonBox>
                        <Button $smallGreenBtn $size="26%,30px">
                            전송
                        </Button>
                    </ButtonBox>
                </InputDiv>
                <hr />
                <InputDiv style={{ marginBottom: '1rem' }}>
                    <InputAuthHeader>인증번호</InputAuthHeader>
                    <Input type="phone" value={phone} $size="98%,40px" $active onChange={handlePhoneChange} />

                    <ButtonBox>
                        <Button $smallGreenBtn $size="26%,30px">
                            인증
                        </Button>
                    </ButtonBox>
                </InputDiv>
                <hr />
                <Button $basicGreenBtn $size="100%, 50px">
                    계좌 불러오기
                </Button>
            </CenteredContainer>
            <Footer></Footer>
        </>
    );
}

export default AccountEnroll;

const AgreementDiv = styled.div`
    display: flex;
    align-items: center;
    width: 96%;
    max-width: 100%;
    max-height: 100%;
    font-weight: bold;
    font-size: ${fontSize.S_14};
    object-fit: contain;
    margin-bottom: 10px;
    padding: 10px;
    border: 3px solid;
    border-image: ${theme.color.mix.border};
    border-image-slice: 1;
    border-radius: ${theme.radius.L_20};
`;

const Checkbox = styled.input`
    margin-left: 10px;
    width: 25px; /* 너비 조절 */
    height: 25px; /* 높이 조절 */
`;
