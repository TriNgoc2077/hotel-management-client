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

import CustomerRoomsPage from "../pages/customer/rooms";
import CustomerRoomDetailsPage from "../pages/customer/room-details";
import CustomerBookingsPage from "../pages/customer/bookings";
import CustomerProfilePage from "../pages/customer/profile";
import CustomerNotificationsPage from "../pages/customer/notifications";

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
          path: "/customer/rooms",
          element: <CustomerRoomsPage />,
        },
        {
          path: "/customer/rooms/:roomId",
          element: <CustomerRoomDetailsPage />,
        },
        {
          path: "/customer/bookings",
          element: <CustomerBookingsPage />,
        },
        {
          path: "/customer/profile",
          element: <CustomerProfilePage />,
        },
        {
          path: "/customer/notifications",
          element: <CustomerNotificationsPage />,
        },
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
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboardPage />,
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
      ],
    },
  ]);
}
