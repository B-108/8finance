import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 재사용 컴포넌트
import CenteredContainer from '../components/Common/CenterAlign';
import Image from '../components/Common/Image';

// 이미지
import loading from '/src/assets/loading.gif'
import logo from '/src/assets/logo.png'
import Header from '../components/Header/Header';
import Footer from '../components/Common/Footer';

function Loading() {
    // 라우터
    const navigate = useNavigate()
    const moveMain = () => {navigate(`/main`)}

    useEffect(()=> {
      setTimeout(() => {
        window.location.reload();
        moveMain()
      }, 1000);
    },[])

    return (
      <>
        <CenteredContainer
          $center>
            {/* <Header
              headerTitle="Billage"
              ></Header> */}
            <Image
              // style={{marginTop:"190px"}}
              src={loading} 
              alt="로고" 
              width="190px"></Image>
        </CenteredContainer>
        {/* <Footer/> */}
      </>
    );
}

export default Loading;
