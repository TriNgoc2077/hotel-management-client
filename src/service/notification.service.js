import notificationsMock from "../mocks/notifications.json";

const STORAGE_KEY = "le_ninh_notifications";

const readNotifications = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notificationsMock));
    return notificationsMock;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return notificationsMock;
  }
};

const writeNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

const notificationService = {
  async getNotifications() {
    return readNotifications();
  },

  async pushNotification(payload) {
    const nextNotification = {
      id: payload.id || `notif-${Date.now()}`,
      user_id: payload.userId || "user-3",
      title: payload.title,
      message: payload.message,
      is_read: false,
      created_at: payload.createdAt || new Date().toISOString(),
    };

    const next = [nextNotification, ...readNotifications()];
    writeNotifications(next);
    return nextNotification;
  },

  async markAsRead(id) {
    const next = readNotifications().map((item) =>
      String(item.id) === String(id) ? { ...item, is_read: true } : item,
    );
    writeNotifications(next);
    return true;
  },
};

export default notificationService;
