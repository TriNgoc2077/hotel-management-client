import { useEffect, useMemo, useState } from "react";
import bookingService from "../../../service/booking.service";
import roomService from "../../../service/room.service";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

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
    let filtered = bookings.map((booking) => {
      const room = rooms.find(
        (item) => String(item.id) === String(booking.roomId)
      );

      return {
        ...booking,
        roomName: room?.name || "Unknown room",
        roomNumber: room?.roomNumber || "N/A",
      };
    });

    if (activeTab === "active") {
      filtered = filtered.filter(b => b.status === "checked_in" || b.status === "confirmed");
    } else if (activeTab === "past") {
      filtered = filtered.filter(b => b.status === "checked_out" || b.status === "cancelled");
    }

    return filtered;
  }, [bookings, rooms, activeTab]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">My Reservations</h1>
            <p className="mt-3 text-slate-600">
              Manage your upcoming stays and review your past experiences.
            </p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            {[
              { id: "all", label: "All Bookings" },
              { id: "active", label: "Active" },
              { id: "past", label: "Past" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl bg-white shadow-sm border border-slate-100">
          <table className="min-w-full">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-8 py-5">Order Detail</th>
                <th className="px-8 py-5">Room</th>
                <th className="px-8 py-5">Stay dates</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Quick Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {bookingRows.length === 0 ? (
                <tr>
                   <td colSpan="6" className="px-8 py-20 text-center">
                      <p className="text-slate-400">No bookings found for the selected category.</p>
                   </td>
                </tr>
              ) : (
                bookingRows.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">
                        #{booking.shortId || booking.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {booking.guestName}
                      </p>
                    </td>

                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">
                        {booking.roomName}
                      </p>
                      <p className="text-sm text-slate-500">
                        Room {booking.roomNumber}
                      </p>
                    </td>

                    <td className="px-8 py-6">
                      <p className="text-slate-900 font-medium">{booking.checkInDate}</p>
                      <p className="text-sm text-slate-500">
                        to {booking.checkOutDate}
                      </p>
                    </td>

                    <td className="px-8 py-6">
                       <p className="text-lg font-bold text-slate-900">
                        ${booking.total}
                      </p>
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${
                        booking.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                        booking.status === "checked_in"
                          ? "bg-blue-50 text-blue-600"
                          : booking.status === "checked_out"
                          ? "bg-slate-100 text-slate-500"
                          : booking.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "checked_in")
                            }
                            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-md active:scale-95"
                          >
                            Check-in
                          </button>
                        )}

                        {booking.status === 'checked_in' && (
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "checked_out")
                            }
                            className="rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                          >
                            Check-out
                          </button>
                        )}
                        
                        {(booking.status === 'checked_out' || booking.status === 'cancelled') && (
                           <button className="text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center gap-1">
                              View Receipt
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
