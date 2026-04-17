import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import roomService from "../../../service/room.service";
import bookingService from "../../../service/booking.service";

const today = new Date().toISOString().split("T")[0];

export default function CustomerRoomDetailsPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkInDate: today,
    checkOutDate: today,
    guests: 1,
    specialRequest: "",
  });

  useEffect(() => {
    const loadRoom = async () => {
      const data = await roomService.getRoomById(roomId);
      setRoom(data);
    };

    loadRoom();
  }, [roomId]);

  const total = useMemo(() => {
    if (!room) return 0;
    return room.price;
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room) return;

    await bookingService.createBooking({
      roomId: room.id,
      guestName: form.guestName,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      total,
    });

    navigate("/customer/bookings");
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-slate-50 p-10">
        Loading room details...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/customer/rooms"
          className="text-sm font-semibold text-slate-600"
        >
          Back to room list
        </Link>

        <div className="mt-6 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
            <img
              src={room.image}
              alt={room.name}
              className="h-[420px] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-900">
                {room.type}
              </p>
              <h1 className="mt-2 text-4xl font-serif text-slate-950">
                {room.name}
              </h1>
              <p className="mt-4 text-slate-600">{room.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[32px] bg-white p-6 shadow-sm"
          >
            <h2 className="text-3xl font-serif text-slate-900">Book room</h2>

            <input
              placeholder="Full name"
              value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="date"
                value={form.checkInDate}
                onChange={(e) =>
                  setForm({ ...form, checkInDate: e.target.value })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />

              <input
                type="date"
                value={form.checkOutDate}
                onChange={(e) =>
                  setForm({ ...form, checkOutDate: e.target.value })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />
            </div>

            <input
              type="number"
              min="1"
              value={form.guests}
              onChange={(e) =>
                setForm({ ...form, guests: Number(e.target.value) })
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            <textarea
              rows="4"
              placeholder="Special requests"
              value={form.specialRequest}
              onChange={(e) =>
                setForm({ ...form, specialRequest: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">Estimated total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                ${total}
              </p>
            </div>

            <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-white">
              Confirm booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
