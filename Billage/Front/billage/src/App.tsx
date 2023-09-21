import { Outlet } from 'react-router-dom';

function App() {
    return <Outlet />;
}

function Root() {
    return <App />;
}

export default Root;
