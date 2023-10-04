import { useState, useEffect } from 'react';

// 재사용 컴포넌트
import Header from '/src/components/Header/Header';
import CenteredContainer from '/src/components/Common/CenterAlign';
import Image from '/src/components/Common/Image';

// 스타일 컴포넌트
import { 
  Check,
  ContentBox, 
  DateBox, 
  LeftSection, 
  Noti, 
  NotiBox, 
  NotiContainer } from './Notifications.style';

// 이미지
import rightarrow_bank from '/src/assets/rightarrow_bank.svg'
import won from "/src/assets/won.svg"
import total from "/src/assets/receiveMoney.svg"
import agree from "/src/assets/agree.svg"
import disagree from "/src/assets/disagree.svg"

// API
import { 
  getNotifiCation, 
  patchNotifiCation } from '/src/api/noti';

// 타입스크립트

// 리코일
import { useRecoilState } from 'recoil';
import { NotificationState } from '/src/recoil/noti';

function Notifications() {
    const [notifications, setNotifications] = useRecoilState(NotificationState)

    const TimeDisplay = (noticeSendDate) => {
      const currentTime = new Date();
      const targetTime = new Date(noticeSendDate);
      
      const timeDifference = currentTime - targetTime;
      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;
      
        if (timeDifference < minute) {
          return ('1분 전');
        } else if (timeDifference < hour) {
          const diffMinutes = Math.floor(timeDifference / minute);
          return(`${diffMinutes}분 전`);
        } else if (timeDifference < day) {
          const diffHours = Math.floor(timeDifference / hour);
          return(`${diffHours}시간 전`);
        } else if (timeDifference < day * 7) {
          const diffDays = Math.floor(timeDifference / day);
          return(`${diffDays}일 전`);
        } else {
          const year = targetTime.getFullYear();
          const month = targetTime.getMonth() + 1;
          const day = targetTime.getDate();
          const hours = targetTime.getHours();
          const minutes = targetTime.getMinutes();

          return(`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`);
          }
      }

    // 알람목록조회
    const axiosNotifiCation = async (): Promise<void> => {
      try {
        const response =  await getNotifiCation()
        console.log(response?.data)
        setNotifications(response?.data)
      }
      catch(error) {
        console.log(error)
      }
    }
    
    // 알림 확인
    const axiosNotiCheck = async (noticeId:number): Promise<void> => {
      try {
        await patchNotifiCation(noticeId)
        await axiosNotifiCation()
      }
      catch(error) {
        console.log(error)
      }
    }


    useEffect(()=>{
      axiosNotifiCation()
    },[])

    return (
        <CenteredContainer>
            <Header
                headerTitle="알림"></Header>
            <NotiContainer>
              {notifications.map((noti,index) => (
                <NotiBox
                  onClick={() => axiosNotiCheck(noti.noticeId)}
                  key={index}>
                  {noti.noticeType === 1 ? (
                    <LeftSection>
                      <Image
                        src={total}
                        alt="alarmBell"
                        width='24px'></Image>
                      <Check $IsClick={noti.noticeState}/>
                      <ContentBox>
                        <Noti>"{noti.noticeUserName}"님에게 {noti.noticeAmount}원을 빌려달라는 요청이 왔어요.</Noti>
                        <DateBox>{TimeDisplay(noti.noticeSendDate)}</DateBox>
                      </ContentBox>
                    </LeftSection>
                  ) : (
                  noti.noticeType === 2 ? (
                    <LeftSection>
                      <Image
                        src={agree}
                        alt="alarmBell"
                        width='24px'></Image>
                      <Check $IsClick={noti.noticeState}/>
                      <ContentBox>
                        <Noti>"{noti.noticeUserName}"님이 {noti.noticeAmount}원을 빌려줬어요!</Noti>
                        <DateBox>{TimeDisplay(noti.noticeSendDate)}</DateBox>
                      </ContentBox>
                    </LeftSection>
                  ) : (
                  noti.noticeType === 3 ? (
                    <LeftSection>
                      <Image
                        src={disagree}
                        alt="alarmBell"
                        width='24px'></Image>
                      <Check $IsClick={noti.noticeState}/>
                      <ContentBox>
                        <Noti>"{noti.noticeUserName}"님이 돈빌려주는 것을 거절했어요.</Noti>
                        <DateBox>{TimeDisplay(noti.noticeSendDate)}</DateBox>
                      </ContentBox>
                    </LeftSection>
                  ) : (
                    <LeftSection>
                      <Image
                        src={won}
                        alt="alarmBell"
                        width='24px'></Image>
                      <Check $IsClick={noti.noticeState}/>
                      <ContentBox>
                        <Noti>"{noti.noticeUserName}"님이 {noti.noticeAmount}원을 갚았어요!</Noti>
                        <DateBox>{TimeDisplay(noti.noticeSendDate)}</DateBox>
                      </ContentBox>
                    </LeftSection>
                      )))}
                  <Image
                    src={rightarrow_bank}
                    alt="rightArrow"
                    width='10px'></Image>
                </NotiBox>
              ))}
            </NotiContainer>
        </CenteredContainer>
    );
}

export default Notifications;
