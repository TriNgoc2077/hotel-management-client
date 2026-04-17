import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-56 min-h-screen bg-gray-800 text-white p-4 pt-25">
        <h2 className="text-lg font-bold mb-4">Admin</h2>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="hover:bg-gray-700 p-2 rounded">
            Users
          </NavLink>
          <NavLink
            to="/admin/reports"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Reports
          </NavLink>
          <NavLink to="/admin/rooms" className="hover:bg-gray-700 p-2 rounded">
            Rooms
          </NavLink>
          <NavLink
            to="/admin/services"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Services
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Bookings
          </NavLink>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="h-14 bg-gray-100 flex items-center justify-between px-4 border-b">
          <span>Admin Panel</span>
          <span>👤</span>
        </div>

        {/* Page */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
