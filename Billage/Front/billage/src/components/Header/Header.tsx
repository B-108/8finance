import { useEffect, useState } from "react"
import { Container, LeftSection, Title } from "./Header.style"
import Image from "../Common/Image"
import alramBell from "src/assets/alramBell.svg"
import backIcon from "src/assets/backIcon.svg"
import { useNavigate } from "react-router-dom"
import Button from "../Common/Button"

interface HeaderProps {
  headerTitle: string;
}

function Header ({headerTitle} : HeaderProps) {
  const [noDisplayImg, setNoDisplayImg] = useState(false)

  const navigate = useNavigate()
  const moveLogin = () => {navigate(`/`)}
  const moveNotifications = () => {navigate(`/notifications`)}
  const handleGoBack = () => {navigate(-1);};

  const chooseImgDisplay = () =>{
    if (headerTitle === "Billage") {
      setNoDisplayImg(true)
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    moveLogin()
  }

  useEffect(() => {
    chooseImgDisplay()
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
      <Image 
        src={alramBell} 
        alt="alramBell"
        width="20px"
        onClick={moveNotifications}></Image>
    </Container>
  )
}

export default Header