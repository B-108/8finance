import { createBrowserRouter } from 'react-router-dom';
import Home from '/src/pages/Home';
import Login from 'src/pages/Login/Login';
import SignUp from 'src/pages/SignUp/SignUp';
import ErrorComponent from 'src/pages/ErrorComponent';
import NotFound from 'src/pages/NotFound';
import Root from 'src/App';
import IOU from 'src/pages/IOU/IOU';
import TransactionList from '/src/pages/TransactionList/TransactionList';
import FindPW from 'src/pages/FindPassword/FindPassword';
import ChangePW from 'src/pages/ChangePassword/ChangePassword';
import Main from './pages/Main/Main';
import Notifications from 'src/pages/Notifications/Notifications';
import PinRegister from './pages/Pin/PinRegister/PinRegister';
import PinCheck from './pages/Pin/PinCheck/PinCheck';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/login',
                element: <Login />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/signup',
                element: <SignUp />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/PinRegister',
                element: <PinRegister />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/PinCheck',
                element: <PinCheck />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/main',
                element: <Main />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/iou',
                element: <IOU />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transactionlist',
                element: <TransactionList />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/findpassword',
                element: <FindPW />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/changepassword',
                element: <ChangePW />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/notifications',
                element: <Notifications />,
                errorElement: <ErrorComponent />,
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default router;
