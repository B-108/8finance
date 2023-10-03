import { useState } from 'react';

// 재사용 컴포넌트
import Header from '/src/components/Header/Header';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Image from '/src/components/Common/Image';

// 스타일 컴포넌트
import { 
  Content, 
  Date, 
  LeftSection, 
  NotiBox, 
  NotiContainer } from './Notifications.style';

// 이미지
import alramClock from '/src/assets/alramClock.svg'

const dummy = [
  "정싸피님이 빌린돈을 갚았습니다.",
  "정싸피님이 빌린돈을 갚았습니다.",
  "정싸피님이 빌린돈을 갚았습니다.",
]

function Notifications() {
    return (
        <CenteredContainer>
            <Header
                headerTitle="알림"></Header>
            <NotiContainer>
              {dummy.map((noti,index) => (
                <NotiBox 
                  key={index}>
                  <LeftSection>
                    <Image
                      src={alramClock}
                      alt="alarmBell"
                      width='11%'></Image>

                    <Content>
                      {noti}</Content>
                  </LeftSection>

                  <Date>
                    오늘</Date>
                </NotiBox>
              ))}
            </NotiContainer>
        </CenteredContainer>
    );
}

export default Notifications;
