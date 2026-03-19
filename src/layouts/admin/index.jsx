import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin</h2>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="hover:bg-gray-700 p-2 rounded">
            Users
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
