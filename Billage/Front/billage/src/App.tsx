import { useEffect } from "react"
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../firebase';

// 알림용 컴포넌트들
import AlertDialog from "./components/Util/Alert/AlertDialog";
import ConfirmDialog from "./components/Util/Confirm/ConfirmDialog";
import PromptDialog from "./components/Util/Prompt/PromptDialog";
import AlertSimpleDialog from "./components/Util/AlertSimple/AlertSimpleDialog";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  font-family: 'LINESeedKR-Rg';
`

function App() {
    return <Outlet />;
}

function Root() {  
  return(
    <Container>
      <AlertDialog>
        <AlertSimpleDialog>
          <ConfirmDialog>
            <PromptDialog>
              <App />
            </PromptDialog>
          </ConfirmDialog>
        </AlertSimpleDialog>
      </AlertDialog>
    </Container>
    ) 
  }

export default Root;
