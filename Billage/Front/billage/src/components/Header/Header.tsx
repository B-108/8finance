import Image from "../Common/Image"
import alramBell from "src/assets/alramBell.svg"
import { Container, Title } from "./Header.style"

function Header () {
  return(
    <Container>
      <Title>Billage</Title>
      <Image 
        src={alramBell} 
        alt="alramBell"
        width="7%"
        ></Image>
    </Container>
  )
}

export default Header