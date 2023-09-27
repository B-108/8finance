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
import Transfer from './pages/Transfer/Transfer';
import TADetail from './pages/TransactionDetail/TransactionDetail';
import TransactionHistory from './pages/TransactionHistory/TransactionHistory';
import SendMoney from './pages/SendMoney/SendMoney';
import MyAccounts from './pages/Account/MyAccounts/MyAccounts';
import PinEnter from './pages/Pin/PinEnter/PinEnter';
import AccountEnroll from './pages/Account/AccountEnroll/AccountEnroll';
import LoadAccounts from './pages/Account/LoadAccounts/LoadAccounts';
import LoadBanks from './pages/Account/LoadBanks/LoadBanks';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            // {
            //     path: '',
            //     element: <Home />,
            //     errorElement: <ErrorComponent />,
            // },
            {
                path: '',
                element: <Login />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/signup',
                element: <SignUp />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/pincheck',
                element: <PinCheck />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/pinenter/:routeAction',
                element: <PinEnter />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/pinenter/:routeAction',
                element: <PinEnter />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/pinregister',
                element: <PinRegister />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/incheck',
                element: <PinCheck />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/main',
                element: <Main />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transfer',
                element: <Transfer />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transactionlist',
                element: <TransactionList />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transaction/detail/:id',
                element: <TADetail />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transaction/detail/:id/iou',
                element: <IOU />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/transactionhistory',
                element: <TransactionHistory />,
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
            {
                path: '/sendmoney',
                element: <SendMoney />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/myaccounts',
                element: <MyAccounts />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/accountenroll',
                element: <AccountEnroll />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/loadaccounts',
                element: <LoadAccounts />,
                errorElement: <ErrorComponent />,
            },
            {
                path: '/loadbanks',
                element: <LoadBanks />,
                errorElement: <ErrorComponent />,
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default router;
