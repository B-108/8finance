import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import React from 'react'


// 재사용 컴포넌트
import Image from './Image'

// 이미지
import home from '/src/assets/homeButton.svg'
import account from '/src/assets/creditCard.svg'
import Logout from '/src/assets/logout.svg'

interface TextProps {
    children?: React.ReactNode;
    disabled?: boolean;    

    // 사이즈 설정
    $size ?: string

    // 마진 지정
    $margin ?:boolean
}

const StyledText = styled.span<TextProps>`
  ${(props) =>
    props.$margin &&
    `
        margin: 0%;
    `}
    display: block; // 블록 요소로 변경
    text-align : center;
    vertical-align: bottom; // 텍스트를 아래로 정렬
`;

const Text = (props:TextProps) => {
    return <StyledText {...props}> {props.children} </StyledText>
}

const FooterContainer = styled.div`
  display: flex;
  height: 65px;
  /* height: 7vh; */
  justify-content: space-around;
  align-items: end; 
  margin-top: auto;
  background-color: white;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1); // 그림자 스타일 추가

  @media only screen and (max-width: 5000px) {
    width: 400px;
  }
  @media only screen and (max-width: 400px) {
    width: 99%;
  }
`;

function Footer(){
  // 라우터
  const navigate = useNavigate()
  const moveLogin = () => {navigate(`/`)}
  const moveMain = () => {navigate(`/main`)}
  const moveAccounts = () => {navigate(`/myaccounts`)}
  

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    moveLogin()
  }

  return (
    <FooterContainer>
      <div style={{
        width: '100%', 
        display: 'flex', 
        height:"55px",
        justifyContent: 'space-around'}}>
        <div style={{
          display:"flex",
          width:"70px",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"center"}}
          onClick={logout}> 
          <Image 
            src={Logout} 
            alt="Logout" 
            width="30px"></Image>
          <Text>로그아웃</Text>
        </div>
        <div style={{
          display:"flex",
          width:"70px",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"center"}}
          onClick={moveMain}>
          <Image 
            src={home} 
            alt="home" 
            width="30px"></Image>
          <Text>홈</Text>
        </div>
        <div style={{
          display:"flex",
          width:"70px",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"center"}}
          onClick={moveAccounts}>
          <Image 
            src={account} 
            alt="account" 
            width="30px"></Image>
          <Text>계좌</Text>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer