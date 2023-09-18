import { createBrowserRouter } from "react-router-dom";
import Root from "./App";
import Home from "/src/pages/Home";
import ErrorComponent from "src/pages/ErrorComponent";
import NotFound from "src/pages/NotFound";

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