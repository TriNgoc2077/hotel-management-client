import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgot-password";
import App from "../App";
import MainLayout from "../layouts/main";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/admin";
import AccountLayout from "../layouts/account";

import AdminDashboardPage from "../pages/admin/dashboard";
import AdminUsersPage from "../pages/admin/users";
import AdminReportsPage from "../pages/admin/reports";
import AdminRoomsPage from "../pages/admin/rooms";
import AdminServicesPage from "../pages/admin/services";
import AdminBookingsPage from "../pages/admin/bookings";

import CustomerRoomsPage from "../pages/account/rooms";
import CustomerRoomDetailsPage from "../pages/account/room-details";
import CustomerBookingsPage from "../pages/account/bookings";
import CustomerProfilePage from "../pages/account/profile";
import CustomerNotificationsPage from "../pages/account/notifications";

import BookPage from "../pages/book";
import AmenitiesPage from "../pages/amenities";
import CommunityPage from "../pages/community";

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
          path: "/rooms",
          element: <CustomerRoomsPage />,
        },
        {
          path: "/rooms/:roomId",
          element: <CustomerRoomDetailsPage />,
        },
        {
          path: "/book",
          element: <BookPage />,
        },
        {
          path: "/amenities",
          element: <AmenitiesPage />,
        },
        {
          path: "/community",
          element: <CommunityPage />,
        },
        {
          path: "/account",
          element: <AccountLayout />,
          children: [
            {
              path: "bookings",
              element: <CustomerBookingsPage />,
            },
            {
              path: "profile",
              element: <CustomerProfilePage />,
            },
            {
              path: "notifications",
              element: <CustomerNotificationsPage />,
            },
          ],
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
