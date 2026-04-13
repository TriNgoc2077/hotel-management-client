import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import bookingService from "../../../service/booking.service";
import roomService from "../../../service/room.service";

const statusLabel = {
  confirmed: "Confirmed",
  checked_in: "Checked-in",
  checked_out: "Checked-out",
  cancelled: "Cancelled",
};

const paymentLabel = {
  unpaid: "Unpaid",
  paid: "Paid",
  pending: "Pending",
};

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const [bookingsData, roomsData] = await Promise.all([
        bookingService.getBookings(),
        roomService.getRooms(),
      ]);
      if (!active) return;
      setBookings(bookingsData);
      setRooms(roomsData);
      setLoading(false);
    };

    void fetchData();

    return () => {
      active = false;
    };
  }, []);

  const bookingRows = useMemo(
    () =>
      bookings.map((booking) => {
        const room = rooms.find((item) => String(item.id) === String(booking.roomId));
        return { ...booking, room };
      }),
    [bookings, rooms],
  );

  const handleStatusChange = async (bookingId, status) => {
    await bookingService.updateBooking(bookingId, { status });
    const [bookingsData, roomsData] = await Promise.all([
      bookingService.getBookings(),
      roomService.getRooms(),
    ]);
    setBookings(bookingsData);
    setRooms(roomsData);
    setMessage(
      status === "checked_in"
        ? "Selected booking has been checked in successfully."
        : "Selected booking has been checked out successfully.",
    );
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Customer Module
            </p>
            <h1 className="mt-3 text-4xl font-serif text-slate-900">Booking History</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Review your bookings, update check-in/check-out, and track reservation status.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/customer/notifications"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-amber-200 hover:text-amber-700"
            >
              <Bell size={16} />
              Notifications
            </Link>
            <Link
              to="/customer/profile"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Profile
            </Link>
          </div>
        </div>

        {message ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm">Loading bookings...</div>
        ) : null}

        {!loading && bookingRows.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm">
            No bookings yet.
          </div>
        ) : null}

        {!loading && bookingRows.length > 0 ? (
          <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Booking</th>
                    <th className="px-5 py-4">Room</th>
                    <th className="px-5 py-4">Stay dates</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookingRows.map((booking) => (
                    <tr key={booking.id} className="text-sm text-slate-600">
                      <td className="px-5 py-5">
                        <p className="font-semibold text-slate-900">{booking.shortId}</p>
                        <p className="text-xs text-slate-400">{booking.guestName}</p>
                      </td>
                      <td className="px-5 py-5">
                        <p className="font-medium text-slate-900">{booking.room?.name || "Room"}</p>
                        <p className="text-xs text-slate-400">Room {booking.room?.roomNumber || booking.roomId}</p>
                      </td>
                      <td className="px-5 py-5">
                        <p>{booking.checkInDate}</p>
                        <p className="text-xs text-slate-400">{booking.checkOutDate}</p>
                      </td>
                      <td className="px-5 py-5 font-semibold text-slate-900">${booking.total}</td>
                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.paymentStatus === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {paymentLabel[booking.paymentStatus] || booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                          {statusLabel[booking.status] || booking.status}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => void handleStatusChange(booking.id, "checked_in")}
                            disabled={booking.status !== "confirmed"}
                            className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-50"
                          >
                            Check-in
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleStatusChange(booking.id, "checked_out")}
                            disabled={booking.status !== "checked_in"}
                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Check-out
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
