import { useEffect, useMemo, useState } from "react";
import bookingService from "../../../service/booking.service";
import roomService from "../../../service/room.service";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const bookingData = await bookingService.getBookings();
      const roomData = await roomService.getRooms();

      setBookings(bookingData);
      setRooms(roomData);
    };

    loadData();
  }, []);
  const handleStatusChange = async (bookingId, status) => {
    await bookingService.updateBookingStatus(bookingId, status);

    const bookingData = await bookingService.getBookings();
    const roomData = await roomService.getRooms();

    setBookings(bookingData);
    setRooms(roomData);
  };

  const bookingRows = useMemo(() => {
    return bookings.map((booking) => {
      const room = rooms.find(
        (item) => String(item.id) === String(booking.roomId)
      );

      return {
        ...booking,
        roomName: room?.name || "Unknown room",
        roomNumber: room?.roomNumber || "N/A",
      };
    });
  }, [bookings, rooms]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-serif text-slate-900">Booking History</h1>
        <p className="mt-3 text-slate-600">
          Review your bookings and track reservation status.
        </p>

        <div className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-sm">
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
                <tr key={booking.id}>
                  <td className="px-5 py-5">
                    <p className="font-semibold text-slate-900">
                      {booking.shortId}
                    </p>
                    <p className="text-sm text-slate-500">
                      {booking.guestName}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="font-semibold text-slate-900">
                      {booking.roomName}
                    </p>
                    <p className="text-sm text-slate-500">
                      Room {booking.roomNumber}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-slate-900">{booking.checkInDate}</p>
                    <p className="text-sm text-slate-500">
                      {booking.checkOutDate}
                    </p>
                  </td>

                  <td className="px-5 py-5 font-semibold text-slate-900">
                    ${booking.total}
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(booking.id, "checked_in")
                        }
                        className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700"
                      >
                        Check-in
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(booking.id, "checked_out")
                        }
                        className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                      >
                        Check-out
                      </button>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {booking.status === "checked_in"
                        ? "Checked-in"
                        : booking.status === "checked_out"
                        ? "Checked-out"
                        : booking.status === "confirmed"
                        ? "Confirmed"
                        : booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
