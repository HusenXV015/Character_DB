import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import LoginPage from "../views/Loginpage";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import Detail from "../views/Details";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
import DetailMoogle from "../views/DetailsMoogle";
import Register from "../views/Registers";

const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register url={url} />,
  },
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/charaters/:id",
        element: <Detail url={url} />,
      },
      {
        path: "/charaters/add",
        element: <AddPage url={url} />,
      },
      {
        path: "/charaters/edit/:id",
        element: <EditPage url={url} />,
      },
      {
        path: "/moogle-characters/:id",
        element: <DetailMoogle />,
      },
    ],
  },
]);

export default router;
