import { useEffect, useState } from "react"
import { Container, LeftSection, Title } from "./Header.style"
import Image from "../Common/Image"
import alramBell from "src/assets/alramBell.svg"
import backIcon from "src/assets/backIcon.svg"

interface HeaderProps {
  headerTitle: string;
}

function Header ({headerTitle} : HeaderProps) {
  const [noDisplayImg, setNoDisplayImg] = useState(false)

  const chooseImgDisplay = () =>{
    if (headerTitle === "Billage") {
      setNoDisplayImg(true)
    }
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
          width="10%"
          $noDisplay = {noDisplayImg}></Image>

        <Title
          $noDisplay = {noDisplayImg}>{headerTitle}</Title>
      </LeftSection>

      <Image 
        src={alramBell} 
        alt="alramBell"
        width="7%"></Image>
    </Container>
  )
}

export default Header