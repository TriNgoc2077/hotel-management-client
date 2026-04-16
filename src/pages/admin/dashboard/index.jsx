import { BedDouble, ClipboardList, Users, Wallet } from "lucide-react";

export default function AdminDashboardPage() {
  const dashboardCards = [
    {
      title: "Total Customers",
      value: "128",
      description: "Current registered customers",
      icon: Users,
    },
    {
      title: "Total Rooms",
      value: "48",
      description: "Rooms in hotel system",
      icon: BedDouble,
    },
    {
      title: "Bookings Today",
      value: "16",
      description: "New bookings created today",
      icon: ClipboardList,
    },
    {
      title: "Revenue Today",
      value: "$2,450",
      description: "Estimated revenue for today",
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-6 pt-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Overview of hotel management activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {card.title}
                  </p>
                  <h2
                    className="mt-2 text-3xl font-bold"
                    style={{ color: "#0f172a" }}
                  >
                    {card.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-slate-100 p-3">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Activities
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              New customer account registered
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              Room 205 updated to Available
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              Booking #BK1024 created successfully
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">
            Quick Summary
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <span>Available Rooms</span>
              <span className="font-semibold text-slate-800">21</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <span>Occupied Rooms</span>
              <span className="font-semibold text-slate-800">19</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <span>Pending Bookings</span>
              <span className="font-semibold text-slate-800">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
