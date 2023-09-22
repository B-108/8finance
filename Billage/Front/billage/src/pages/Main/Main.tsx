import Box from "/src/components/Common/Box"
import CenteredContainer from "/src/components/Common/CenterAlign"
import Image from "/src/components/Common/Image"
import Text from "/src/components/Common/Text"
import Header from "/src/components/Header/Header"
import alarmBell2 from "/src/assets/alarmBell2.svg"
import { AlarmContent, AlarmDate, AlarmHeader } from "./Main.style"
import Footer from "/src/components/Common/Footer"

// import Input from "/src/components/Common/Input"
function Main(){
    return(
        <>
            <CenteredContainer>
                <Header
                    headerTitle="Billage"
                    ></Header>
                
                <Text
                    $title
                    $size="98%,50px">확인 하지 않은 알림!</Text>

                <Box
                    $alarmBox
                    $size="93%,80px">
                    <AlarmHeader>
                        <Image
                            src={alarmBell2}
                            alt="alarmClock"
                            width="7%"
                        ></Image>
                        <AlarmDate>2023.09.08</AlarmDate>
                    </AlarmHeader>
                    <AlarmContent>최싸피님에게 300,000원을 빌려달는 요청이 왔어요!</AlarmContent>
                </Box>

                <Text
                    $title
                    $size="98%,50px">나의거래</Text>

                <Box
                    $mainTransaction
                    $size="285px,270px">

                </Box>
            
            </CenteredContainer>
            <Footer/>
        </>
    )
}

export default Main