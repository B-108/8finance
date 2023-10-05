import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// 스타일 컴포넌트
import { 
  Container, 
  LeftSection, 
  NotiCount, 
  RightSection, 
  Title } from "./Header.style"

// 재사용 컴포넌트
import Image from "../Common/Image"
import Button from "../Common/Button"

// 이미지
import alramBell from "src/assets/alramBell.svg"
import backIcon from "src/assets/backIcon.svg"

// API
import { getNotifiCation } from "/src/api/noti"

// 타입스크립트
import { NotificationType } from "/src/type/noti"

interface HeaderProps {
  headerTitle: string;
}

function Header ({headerTitle} : HeaderProps) {
  const [noDisplayImg, setNoDisplayImg] = useState(false)
  const [noti, setNoti] = useState<NotificationType[]>([])

  const navigate = useNavigate()
  const moveNotifications = () => {navigate(`/notifications`)}
  const handleGoBack = () => {navigate(-1);};

  const chooseImgDisplay = () =>{
    if (headerTitle === "Billage") {
      setNoDisplayImg(true)
    }
  }

  // 알람목록조회
  const axiosNotifiCation = async (): Promise<void> => {
    try {
      const response =  await getNotifiCation()
      const filteredData = response?.data.filter((item,index) => item.noticeState === 0);
      setNoti(filteredData);
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    chooseImgDisplay()
    axiosNotifiCation()
  },[])

  return(
    <Container>
      <LeftSection>
        <Image
          src={backIcon}
          alt="backIcon"
          width="10px"
          $noDisplay = {noDisplayImg}
          onClick={handleGoBack}></Image>

        <Title
          $noDisplay = {noDisplayImg}>{headerTitle}</Title>
      </LeftSection>
      <RightSection>
        <Image 
          src={alramBell} 
          alt="alramBell"
          width="23px"
          onClick={moveNotifications}></Image>
        <NotiCount $IsClick={noti.length}/>
      </RightSection>
    </Container>
  )
}

export default Header