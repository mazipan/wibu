import {
  createBrowserRouter,
} from "react-router-dom";
import DefaultLayout from "./layouts/default.layout";
import ErrorPage from "./pages/errors";
import Homepage from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ]
  },
]);

export default router;
