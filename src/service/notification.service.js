const STORAGE_KEY = "customer_notifications";

const sampleNotifications = [
  {
    id: "notification-1",
    title: "Booking Confirmed",
    message: "Your booking has been created successfully.",
    isRead: false,
  },
  {
    id: "notification-2",
    title: "Check-in Reminder",
    message: "Remember to complete your check-in before arrival.",
    isRead: false,
  },
];

const readNotifications = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleNotifications));
    return sampleNotifications;
  }

  return JSON.parse(raw);
};

const writeNotifications = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const notificationService = {
  async getNotifications() {
    return readNotifications();
  },

  async addNotification(payload) {
    const current = readNotifications();

    const next = [
      {
        id: `notification-${Date.now()}`,
        title: payload.title,
        message: payload.message,
        isRead: false,
      },
      ...current,
    ];

    writeNotifications(next);
    return next;
  },

  async markAsRead(id) {
    const current = readNotifications();

    const next = current.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            isRead: true,
          }
        : item
    );

    writeNotifications(next);
    return next;
  },
};

export default notificationService;
