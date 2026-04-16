import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import App from "../App";
import MainLayout from "../layouts/main";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/admin";
import AdminDashboardPage from "../pages/admin/dashboard";
import AdminUsersPage from "../pages/admin/users";
import AdminReportsPage from "../pages/admin/reports";
import AdminRoomsPage from "../pages/admin/rooms";
import AdminServicesPage from "../pages/admin/services";
import AdminBookingsPage from "../pages/admin/bookings";

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
        {
          element: <AdminLayout />,
          children: [
            {
              path: "/admin",
              element: <AdminDashboardPage />,
            },
            // ... children
            // {
            //   path,
            //   element
            // }
          ],
        },
        {
          path: "/admin/users",
          element: <AdminUsersPage />,
        },
        {
          path: "/admin/reports",
          element: <AdminReportsPage />,
        },
        {
          path: "/admin/rooms",
          element: <AdminRoomsPage />,
        },
        {
          path: "/admin/services",
          element: <AdminServicesPage />,
        },
        {
          path: "/admin/bookings",
          element: <AdminBookingsPage />,
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
      ],
    },
    // ** Manager layout
  ]);
}
