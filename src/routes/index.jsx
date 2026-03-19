import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import App from "../App";
import MainLayout from "../layouts/main";

export default function AppRoutes() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
      ],
    },
  ]);
}
