import { startTransition, useEffect, useState } from "react";
import adminUserService from "../../../service/admin-user.service";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    roleId: "role-3",
    status: "Active",
  });

  const loadUsers = async () => {
    const res = await adminUserService.getUsers();
    return res.data.result;
  };

  const loadRoles = async () => {
    const res = await adminUserService.getRoles();
    return res.data;
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      const [usersData, rolesData] = await Promise.all([
        loadUsers(),
        loadRoles(),
      ]);

      if (!isMounted) return;

      startTransition(() => {
        setUsers(usersData);
        setRoles(rolesData);
      });
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = users.filter((user) => {
    const keyword = searchTerm.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.phone.includes(keyword)
    );
  });

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    await adminUserService.createUser(newCustomer);
    const usersData = await loadUsers();
    setUsers(usersData);

    setNewCustomer({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      roleId: "role-3",
      status: "Active",
    });

    setIsAddModalOpen(false);
  };

  const handleToggleStatus = async (customerId) => {
    await adminUserService.toggleUserStatus(customerId);
    const usersData = await loadUsers();
    setUsers(usersData);
  };

  const handleOpenEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleEditCustomerChange = (e) => {
    const { name, value } = e.target;

    setEditingCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    if (!editingCustomer) return;

    await adminUserService.updateUser(editingCustomer.id, editingCustomer);
    const usersData = await loadUsers();
    setUsers(usersData);

    setIsEditModalOpen(false);
    setEditingCustomer(null);
  };

  const handleOpenDeleteModal = (customer) => {
    setDeletingCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!deletingCustomer) return;

    await adminUserService.deleteUser(deletingCustomer.id);
    const usersData = await loadUsers();
    setUsers(usersData);

    setIsDeleteModalOpen(false);
    setDeletingCustomer(null);
  };

  return (
    <div className="-mt-7 space-y-4 pt-1">
      <div>
        <h1 className="text-base font-semibold text-slate-800">
          Customer Management
        </h1>
        <p className="mt-0 text-xs text-slate-500">
          Manage customer accounts in admin panel
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Customer List
          </h2>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email or phone"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-amber-500"
            />

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
            >
              Add Customer
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  ID
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Full Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Email
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Phone
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Role
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {user.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`rounded-lg px-3 py-1 ${
                            user.status === "Active"
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          }`}
                        >
                          {user.status === "Active" ? "Lock" : "Unlock"}
                        </button>

                        <button
                          onClick={() => handleOpenDeleteModal(user)}
                          className="rounded-lg bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Add Customer
              </h2>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={newCustomer.fullName}
                  onChange={handleNewCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleNewCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleNewCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleNewCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    name="roleId"
                    value={newCustomer.roleId}
                    onChange={handleNewCustomerChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newCustomer.status}
                    onChange={handleNewCustomerChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Locked">Locked</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Edit Customer
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingCustomer(null);
                }}
                className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editingCustomer.fullName}
                  onChange={handleEditCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editingCustomer.email}
                  onChange={handleEditCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editingCustomer.phone}
                  onChange={handleEditCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editingCustomer.address || ""}
                  onChange={handleEditCustomerChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    name="roleId"
                    value={editingCustomer.roleId}
                    onChange={handleEditCustomerChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editingCustomer.status}
                    onChange={handleEditCustomerChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-amber-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Locked">Locked</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCustomer(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && deletingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">
              Delete Customer
            </h2>

            <p className="mt-4 text-sm text-slate-600">
              Are you sure you want to delete customer{" "}
              <span className="font-semibold text-slate-800">
                {deletingCustomer.fullName}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingCustomer(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteCustomer}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
