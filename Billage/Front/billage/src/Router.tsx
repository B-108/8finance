import { createBrowserRouter } from "react-router-dom";
import Root from "@src/App";
import MainPage from "@pages/Main/Main";

// import ErrorComponent from "./components/ErrorComponent";
// import NotFound from "./pages/NotFound"
// import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <MainPage />,
                // errorElement: <ErrorComponent />,
            },
        ],
        // errorElement: <NotFound />
    }
])

export default router;