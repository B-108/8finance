import { useEffect } from "react"
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  font-family: 'LINESeedKR-Bd';
`

function App() {
    return <Outlet />;
}

function Root() {  
  return(
    <Container>
      <App />
    </Container>
    ) 
  }

export default Root;
