import { createBrowserRouter } from "react-router-dom";
import Home from "/src/pages/Home";
import Login from "src/pages/Login/Login";
import SignUp from "src/pages/SignUp/SignUp";
import ErrorComponent from "src/pages/ErrorComponent";
import NotFound from "src/pages/NotFound";
import Root from "src/App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorComponent />,
            },
            {
                path: "/signup",
                element: <SignUp />,
                errorElement: <ErrorComponent />,
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;