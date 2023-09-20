import { createBrowserRouter } from "react-router-dom";
import Home from "/src/pages/Home";
import Login from "src/pages/Login/Login";
import SignUp from "src/pages/SignUp/SignUp";
import ErrorComponent from "src/pages/ErrorComponent";
import NotFound from "src/pages/NotFound";
import Root from "src/App";
import IOU from "src/pages/IOU/IOU";
<<<<<<< HEAD
import TransactionList from '/src/pages/TransactionList/TransactionList';

=======
import FindPW from "src/pages/FindPassword/FindPassword";
>>>>>>> 7a8080f7e04313204722318ab41e9cf9b575f6f3
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
                path: '/iou',
                element: <IOU />,
                errorElement: <ErrorComponent />,
            },
            {
<<<<<<< HEAD
                path: '/transactionlist',
                element: <TransactionList />,
=======
                path: "/findpassword",
                element: <FindPW />,
>>>>>>> 7a8080f7e04313204722318ab41e9cf9b575f6f3
                errorElement: <ErrorComponent />,
            },
        ],
        errorElement: <NotFound />,
    },
]);

export default router;