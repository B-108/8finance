import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  
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
