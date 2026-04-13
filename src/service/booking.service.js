import axios from "axios";
import bookingsMock from "../mocks/bookings.json";
import notificationService from "./notification.service";

const STORAGE_KEY = "le_ninh_customer_bookings";

const hotelApi = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 10000,
});

const readBookings = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingsMock));
    return bookingsMock;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return bookingsMock;
  }
};

const writeBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

const mergeBookings = (primary, secondary) => {
  const seen = new Set();
  const merged = [];

  [...primary, ...secondary].forEach((item) => {
    const key = String(item.id);
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(item);
  });

  return merged;
};

const buildLocalBooking = (payload, bookingId) => ({
  id: bookingId || `bk-${Date.now()}`,
  short_id: `BK${String(Date.now()).slice(-6)}`,
  customer_id: "user-3",
  room_id: payload.roomId,
  guest_name: payload.guestName,
  email: payload.email,
  phone: payload.phone,
  check_in_date: payload.checkInDate,
  check_out_date: payload.checkOutDate,
  special_request: payload.specialRequest,
  guests: payload.guests,
  grand_total: payload.total,
  status: "Confirmed",
  payment_status: "unpaid",
  created_at: new Date().toISOString(),
});

const normalizeStatus = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("checked-in")) return "checked_in";
  if (value.includes("checked-out")) return "checked_out";
  if (value.includes("cancel")) return "cancelled";
  return "confirmed";
};

const normalizeBooking = (booking) => ({
  id: booking.id,
  shortId: booking.short_id || booking.id,
  customerId: booking.customer_id || "user-3",
  roomId: booking.room_id || "room-1",
  guestName: booking.guest_name || "Le Ninh",
  email: booking.email || "leninh@student.edu",
  phone: booking.phone || "0901234567",
  checkInDate: booking.check_in_date || booking.checkInDate,
  checkOutDate: booking.check_out_date || booking.checkOutDate,
  specialRequest: booking.special_request || booking.specialRequest || "",
  guests: Number(booking.guests || 2),
  total: Number(booking.grand_total || booking.total || 0),
  status: normalizeStatus(booking.status),
  paymentStatus: String(
    booking.payment_status || booking.paymentStatus || "unpaid",
  ).toLowerCase(),
  createdAt: booking.created_at || booking.createdAt || new Date().toISOString(),
});

const bookingService = {
  async getBookings() {
    return readBookings().map(normalizeBooking);
  },

  async createBooking(payload) {
    const current = readBookings();
    const nextBooking = buildLocalBooking(payload);
    const next = [nextBooking, ...current];
    writeBookings(next);
    await notificationService.pushNotification({
      title: "Booking Confirmed",
      message: `Your booking ${nextBooking.short_id} has been confirmed successfully.`,
    });
    return nextBooking.id;
  },

  async updateBooking(id, payload) {
    const current = readBookings();
    const next = current.map((item) => {
      if (String(item.id) !== String(id)) {
        return item;
      }

      const nextStatus =
        payload.status === "checked_in"
          ? "Checked-in"
          : payload.status === "checked_out"
            ? "Checked-out"
            : item.status;

      return {
        ...item,
        status: nextStatus,
        payment_status: payload.paymentStatus || item.payment_status || "unpaid",
        updated_at: new Date().toISOString(),
      };
    });

    writeBookings(next);

    if (payload.status === "checked_in") {
      await notificationService.pushNotification({
        title: "Check-in Completed",
        message: `Booking ${id} has been checked in.`,
      });
    }

    if (payload.status === "checked_out") {
      await notificationService.pushNotification({
        title: "Check-out Completed",
        message: `Booking ${id} has been checked out.`,
      });
    }
  },

  resetBookings() {
    localStorage.removeItem(STORAGE_KEY);
    return readBookings().map(normalizeBooking);
  },
};

export default bookingService;
