import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import App from "../App";
import MainLayout from "../layouts/main";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/admin";

export default function AppRoutes() {
  return useRoutes([
    // ** Main layout
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        // * Public route
        {
          element: <PublicRoute />,
          children: [
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

        // * Private route
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        // ... children
        // {
        //   path,
        //   element
        // }
      ]
    }
    // ** Manager layout
  ]);
}
