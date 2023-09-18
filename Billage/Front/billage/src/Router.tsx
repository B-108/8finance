import { createBrowserRouter } from "react-router-dom";
import Root from "./App";
import ErrorComponent from "pages/ErrorComponent";
import NotFound from "pages/NotFound";
import Home from "pages/Home";

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
        ],
        errorElement: <NotFound />
    }
])

export default router;