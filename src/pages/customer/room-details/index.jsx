import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Users } from "lucide-react";
import roomService from "../../../service/room.service";
import bookingService from "../../../service/booking.service";
import { useAuthStore } from "../../../stores/useAuthStore";

const calculateNights = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return 1;
  const diff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
};

const today = new Date().toISOString().split("T")[0];

export default function CustomerRoomDetailsPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkInDate: searchParams.get("checkInDate") || today,
    checkOutDate: searchParams.get("checkOutDate") || today,
    guests: Number(searchParams.get("guests") || 1),
    specialRequest: "",
  });

  useEffect(() => {
    let active = true;

    const fetchRoom = async () => {
      const data = await roomService.getRoomById(roomId);
      if (!active) return;
      setRoom(data);
      setLoading(false);
    };

    void fetchRoom();

    return () => {
      active = false;
    };
  }, [roomId]);

  const total = useMemo(() => {
    if (!room) return 0;
    return calculateNights(form.checkInDate, form.checkOutDate) * room.price;
  }, [form.checkInDate, form.checkOutDate, room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!room) return;
    if (new Date(form.checkOutDate) <= new Date(form.checkInDate)) {
      setNotice("Check-out must be at least one night after check-in.");
      return;
    }

    setSubmitting(true);
    await bookingService.createBooking({
      roomId: room.id,
      guestName: form.guestName,
      email: form.email,
      phone: form.phone,
      checkInDate: form.checkInDate,
      checkOutDate: form.checkOutDate,
      guests: form.guests,
      specialRequest: form.specialRequest,
      total,
    });
    setSubmitting(false);
    setNotice("Booking created successfully. Redirecting to your booking history.");

    setTimeout(() => {
      navigate("/customer/bookings");
    }, 900);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 p-10 text-center text-slate-500">Loading room details...</div>;
  }

  if (!room) {
    return <div className="min-h-screen bg-slate-50 p-10 text-center text-slate-500">Room not found.</div>;
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/customer/rooms" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft size={16} />
          Back to room list
        </Link>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
            <img src={room.image} alt={room.name} className="h-[420px] w-full object-cover" />
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-900">{room.type}</p>
                  <h1 className="mt-2 text-4xl font-serif text-slate-950">{room.name}</h1>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700">
                  {room.status}
                </span>
              </div>
              <p className="leading-7 text-slate-600">{room.description}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-400">Room number</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{room.roomNumber}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-400">Capacity</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{room.capacity} guests</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-400">Price per night</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">${room.price}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((item) => (
                  <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">Booking Form</p>
              <h2 className="mt-2 text-3xl font-serif text-slate-900">Book room</h2>
            </div>

            {notice ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {notice}
              </div>
            ) : null}

            {!user ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Please log in before booking a room.
              </div>
            ) : null}

            <label className="block text-sm font-medium text-slate-600">
              Full name
              <input
                value={form.guestName}
                onChange={(event) => setForm((current) => ({ ...current, guestName: event.target.value }))}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-600">
                Email
                <input
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600">
                Phone number
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="Enter your phone number"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Check-in
                </span>
                <input
                  type="date"
                  min={today}
                  value={form.checkInDate}
                  onChange={(event) => setForm((current) => ({ ...current, checkInDate: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Check-out
                </span>
                <input
                  type="date"
                  min={form.checkInDate}
                  value={form.checkOutDate}
                  onChange={(event) => setForm((current) => ({ ...current, checkOutDate: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Users size={16} />
                Guests
              </span>
              <input
                type="number"
                min="1"
                max={room.capacity}
                value={form.guests}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    guests: Math.min(room.capacity, Math.max(1, Number(event.target.value))),
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-slate-600">
              Special requests
              <textarea
                rows="4"
                value={form.specialRequest}
                onChange={(event) => setForm((current) => ({ ...current, specialRequest: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              />
            </label>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-400">Estimated total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">${total}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-60"
            >
              {submitting ? "Processing..." : user ? "Confirm booking" : "Login to book"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
