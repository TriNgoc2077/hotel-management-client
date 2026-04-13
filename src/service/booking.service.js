import notificationService from "./notification.service";
const STORAGE_KEY = "customer_bookings";

const sampleBookings = [
  {
    id: "bk-1001",
    shortId: "BK1001",
    roomId: "room-1",
    guestName: "Le Ninh",
    checkInDate: "2026-04-20",
    checkOutDate: "2026-04-22",
    total: 100,
    paymentStatus: "unpaid",
    status: "confirmed",
  },
];

const readBookings = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookings));
    return sampleBookings;
  }
  return JSON.parse(raw);
};

const writeBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

const bookingService = {
  async getBookings() {
    return readBookings();
  },

  async createBooking(payload) {
    const current = readBookings();

    const nextBooking = {
      id: `bk-${Date.now()}`,
      shortId: `BK${String(Date.now()).slice(-6)}`,
      roomId: payload.roomId,
      guestName: payload.guestName,
      checkInDate: payload.checkInDate,
      checkOutDate: payload.checkOutDate,
      total: payload.total,
      paymentStatus: "unpaid",
      status: "confirmed",
    };

    const next = [nextBooking, ...current];
    writeBookings(next);
    await notificationService.addNotification({
      title: "Booking Confirmed",
      message: `Your booking ${nextBooking.shortId} has been created successfully.`,
    });

    return nextBooking;
  },

  async updateBookingStatus(id, status) {
    const current = readBookings();

    const next = current.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            status,
          }
        : item
    );

    writeBookings(next);
    await notificationService.addNotification({
      title:
        status === "checked_in" ? "Check-in Completed" : "Check-out Completed",
      message:
        status === "checked_in"
          ? `Booking ${id} has been checked in.`
          : `Booking ${id} has been checked out.`,
    });
    return next;
  },
};

export default bookingService;
