import { 
  useState, 
  useEffect,
  useContext, 
  useCallback } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트 재사용
import Button from "/src/components/Common/Button"
import Image from "/src/components/Common/Image";
import theme from "/src/themes";
import CenteredContainer from "/src/components/Common/CenterAlign";
import Text from "/src/components/Common/Text";

// 스타일 컴포넌트
import Input, { 
  InputDiv, 
  InputHeader } from "/src/components/Common/Input"

// 이미지
import logo from 'src/assets/logo.png'

// 리코일
import { 
  NameState, 
  PhoneState } from "/src/recoil/auth";
import { useRecoilState } from "recoil";
import { token } from "firebase";

// API
import { getPhoneCheck } from "/src/api/auth";

// 알림 모달
import AlertSimpleContext from "/src/context/alertSimple/AlertSimpleContext";

// 타입스크립트

function Login(){
  const [name, setName] = useRecoilState<string>(NameState);
  const [phone, setPhone] = useRecoilState<string>(PhoneState);
  const [isEnd, setIsEnd] = useState(false);

  
  const MAX_LENGTH = 20;

  // 라우터
  const navigate = useNavigate()
  const moveSignUp = () => {navigate(`/signup`)}

  const movePinEnter = async () => {
    if (!phone) {
      onAlertSimpleClick("핸드폰 번호를 입력해주세요.")
      return
    }

    const response = await axiosPhoneCheck()

    if( !response ) { 
      onAlertSimpleClick("회원이 아닙니다. 핸드폰번호를 확인해주세요.")
      return 
    }
    else {
      setName(response) 
      navigate('/pinenter/login') }
  }

  const moveMain = () => {
    if(localStorage.getItem('access_token')){
      navigate(`/main`)
    }
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아니면 입력 못 받도록
    if(isNaN(Number(event.target.value))) {return}

    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setPhone(event.target.value.split(' ').join(''));
  };

  const sendNotification = () => {
    console.log('알림버튼')
    console.log(token)
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const title = '알림입니다~';
        const options = {
          actions: [
            {
              action: '첫번째 액션',
              title: '첫번째 제목',
            },
            {
              action: '두번째 액션',
              title: '두번째 제목',
            },
          ],
        };

        registration.showNotification(title, options);
      });
    }
  };

  // 회원 인증 요청
  const axiosPhoneCheck = async (): Promise<object|undefined>  => {
    try {
      const response = await getPhoneCheck(phone)
      return response?.data.userName
    }
    catch(error) {
      console.log(error)
    }
  }
  
  // SimpleAlert 창
  const HandleIsEnd = useCallback(() => {
    setIsEnd(!isEnd);
  }, [isEnd]);

  const { alert: alertSimpleComp } = useContext(AlertSimpleContext);
  
  const onAlertSimpleClick = async (text: string) => {
    const result = await alertSimpleComp(text);
    console.log("custom", result);
    HandleIsEnd();
  };

  useEffect(() => {
    moveMain()
  },[])

  return(
    <CenteredContainer $center>

        <Image src={logo} alt="로고" width="120px"></Image>

        <Text
            $mainText
            $size="60%,">Billage에 오신걸 환영합니다!</Text>

        <InputDiv style={{marginBottom : '1rem'}}>
            <InputHeader>핸드폰 번호</InputHeader>
            <Input
                type="phone"
                value={phone}
                $size="86%,40px"
                $active
                onChange={handlePhoneChange}/>
        </InputDiv>
    
        <Button    
            $basicGreenBtn 
            $size="91%,43px" 
            $Green onClick={movePinEnter}
            >로그인</Button>
        
        <div style={{ 
          fontSize: theme.fontSize.XS_12, 
          color:theme.color.gray[55], 
          marginTop: '1rem'}}>
            <span onClick={moveSignUp} >회원가입</span>
            <span> | </span>
            <span>간편 비밀번호 찾기</span>
        </div>
    <Button onClick={sendNotification}>알림</Button>
    </CenteredContainer>
  )
}

export default Login