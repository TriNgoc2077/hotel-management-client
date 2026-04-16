import { useEffect, useState } from "react";
import adminUserService from "../../../service/admin-user.service";

export default function AdminReportsPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await adminUserService.getUsers();
      setUsers(res.data.result);
    };

    loadUsers();
  }, []);

  const totalCustomers = users.length;
  const activeCustomers = users.filter(
    (user) => user.status === "Active"
  ).length;
  const lockedCustomers = users.filter(
    (user) => user.status === "Locked"
  ).length;
  const customerRoleCount = users.filter(
    (user) => user.role === "Customer"
  ).length;
  const employeeRoleCount = users.filter(
    (user) => user.role === "Staff"
  ).length;
  const adminRoleCount = users.filter((user) => user.role === "Admin").length;

  const summaryCards = [
    {
      title: "Total Customers",
      value: totalCustomers,
    },
    {
      title: "Active Customers",
      value: activeCustomers,
    },
    {
      title: "Locked Customers",
      value: lockedCustomers,
    },
    {
      title: "Admin Accounts",
      value: adminRoleCount,
    },
  ];

  const roleSummary = [
    {
      role: "Customer",
      total: customerRoleCount,
    },
    {
      role: "Staff",
      total: employeeRoleCount,
    },
    {
      role: "Admin",
      total: adminRoleCount,
    },
  ];

  return (
    <div className="space-y-6 pt-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reports</h1>
        <p className="mt-2 text-slate-500">
          Overview and summary of customer management data
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-700">{card.title}</p>
            <h2
              className="mt-3 text-3xl font-bold"
              style={{ color: "#0f172a" }}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Role Summary</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleSummary.map((item) => (
                  <tr key={item.role} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {item.role}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            Customer Status Summary
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Active Customers</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeCustomers}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm text-red-700">Locked Customers</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {lockedCustomers}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">
          Customer Detail Report
        </h2>

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
                  Role
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No report data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
