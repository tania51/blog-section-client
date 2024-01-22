import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Login from "./login";
import Register from "./Register";
import Home from "./Home";
import PrivateRouter from "./../src/provider/PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
      path: "/blog",
      element: <PrivateRouter><App></App></PrivateRouter>
    }
  ]);

export default router;