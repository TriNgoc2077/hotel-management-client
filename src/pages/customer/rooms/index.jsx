import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BedDouble, CalendarDays, Search, Users } from "lucide-react";
import roomService from "../../../service/room.service";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function CustomerRoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    checkInDate: searchParams.get("checkInDate") || "",
    checkOutDate: searchParams.get("checkOutDate") || "",
    guests: searchParams.get("guests") || "",
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    const fetchRooms = async () => {
      const data = await roomService.getRooms();
      if (!active) return;
      setRooms(data);
      setLoading(false);
    };

    void fetchRooms();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value),
      ),
    );
    const data = await roomService.getRooms(filters);
    setRooms(data);
    setMessage(
      filters.checkInDate && filters.checkOutDate
        ? "Showing rooms that are prioritized as available for your selected dates."
        : "",
    );
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Customer Module
            </p>
            <h1 className="mt-3 text-4xl font-serif text-slate-900">Room List</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Browse rooms in card view, check availability by date, and continue to booking.
            </p>
          </div>
          <Link
            to={user ? "/customer/bookings" : "/login"}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            {user ? "View booking history" : "Login to manage bookings"}
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-8 grid gap-4 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]"
        >
          <label className="text-sm font-medium text-slate-600">
            Search room
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 px-3">
              <Search size={18} className="text-slate-400" />
              <input
                value={filters.keyword}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, keyword: event.target.value }))
                }
                placeholder="Standard, Deluxe, 101..."
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <label className="text-sm font-medium text-slate-600">
            Check-in
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 px-3">
              <CalendarDays size={18} className="text-slate-400" />
              <input
                type="date"
                value={filters.checkInDate}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, checkInDate: event.target.value }))
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <label className="text-sm font-medium text-slate-600">
            Check-out
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 px-3">
              <CalendarDays size={18} className="text-slate-400" />
              <input
                type="date"
                value={filters.checkOutDate}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, checkOutDate: event.target.value }))
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <label className="text-sm font-medium text-slate-600">
            Guests
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 px-3">
              <Users size={18} className="text-slate-400" />
              <input
                type="number"
                min="1"
                value={filters.guests}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, guests: event.target.value }))
                }
                placeholder="2"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            className="rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 md:col-span-2 xl:col-span-1"
          >
            Check availability
          </button>
        </form>

        {message ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {message}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm">Loading rooms...</div>
        ) : null}

        {!loading && rooms.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm">
            No matching rooms found.
          </div>
        ) : null}

        {!loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1"
              >
                <img src={room.image} alt={room.name} className="h-56 w-full object-cover" />
                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
                        {room.type}
                      </p>
                      <h3 className="mt-2 text-2xl font-serif text-slate-900">{room.name}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                      {room.status}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-slate-600">{room.description}</p>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <BedDouble size={16} />
                      {room.roomNumber}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Users size={16} />
                      {room.capacity} guests
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price per night</p>
                      <p className="mt-1 text-xl font-semibold text-slate-900">${room.price}</p>
                    </div>
                    <Link
                      to={`${
                        user ? `/customer/rooms/${room.id}` : "/login"
                      }?${new URLSearchParams(
                        Object.fromEntries(
                          Object.entries(filters).filter(([, value]) => value),
                        ),
                      ).toString()}`}
                      className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                    >
                      {user ? "Book now" : "Login to book"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
