import { useEffect, useState } from "react";
import notificationService from "../../../service/notification.service";

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    await notificationService.markAsRead(id);
    const data = await notificationService.getNotifications();
    setNotifications(data);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 pt-32 pb-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-serif text-slate-900">Notifications</h1>
        <p className="mt-3 text-slate-600">
          Review your latest customer notifications.
        </p>

        <div className="mt-8 space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.isRead
                        ? "bg-slate-100 text-slate-600"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.isRead ? "Read" : "Unread"}
                  </span>

                  {!item.isRead ? (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                    >
                      Mark as read
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
