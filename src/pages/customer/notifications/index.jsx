import { useEffect, useMemo, useState } from "react";
import { BellRing, CheckCheck } from "lucide-react";
import notificationService from "../../../service/notification.service";

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const data = await notificationService.getNotifications();
      if (!active) return;
      setNotifications(data);
      setLoading(false);
    };

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications],
  );

  const handleReadNotification = async (notificationId) => {
    await notificationService.markAsRead(notificationId);
    setNotifications((current) =>
      current.map((item) =>
        String(item.id) === String(notificationId) ? { ...item, is_read: true } : item,
      ),
    );
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] bg-slate-900 p-6 text-white shadow-sm md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Customer Module
            </p>
            <h1 className="mt-3 text-4xl font-serif">Notifications</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Track new bookings, check-in/check-out reminders, and account-related updates.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Unread</p>
            <p className="mt-2 text-3xl font-semibold text-white">{unreadCount}</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[32px] bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading notifications...
          </div>
        ) : null}

        {!loading && notifications.length === 0 ? (
          <div className="rounded-[32px] bg-white p-8 text-center text-slate-500 shadow-sm">
            No notifications yet.
          </div>
        ) : null}

        {!loading && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((item) => (
              <article
                key={item.id}
                className={`rounded-[28px] border p-5 shadow-sm transition ${
                  item.is_read
                    ? "border-slate-200 bg-white"
                    : "border-amber-200 bg-amber-50/60"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <BellRing size={18} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.message}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                        {new Date(item.created_at).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleReadNotification(item.id)}
                    disabled={item.is_read}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    <CheckCheck size={16} />
                    {item.is_read ? "Read" : "Mark as read"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
