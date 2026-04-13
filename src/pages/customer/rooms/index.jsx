import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../../service/room.service";

export default function CustomerRoomsPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await roomService.getRooms();
      setRooms(data);
    };

    loadRooms();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await roomService.getRooms(filters);
    setRooms(data);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-serif text-slate-900">Room List</h1>

        <form
          onSubmit={handleSearch}
          className="mt-6 grid gap-4 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-4"
        >
          <input
            placeholder="Search room"
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="date"
            value={filters.checkInDate}
            onChange={(e) =>
              setFilters({ ...filters, checkInDate: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="date"
            value={filters.checkOutDate}
            onChange={(e) =>
              setFilters({ ...filters, checkOutDate: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3"
          />
          <button className="rounded-full bg-slate-900 px-5 py-3 text-white">
            Check availability
          </button>
        </form>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-sm"
            >
              <img
                src={room.image}
                alt={room.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
                  {room.type}
                </p>
                <h3 className="mt-2 text-2xl font-serif text-slate-900">
                  {room.name}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {room.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-slate-900">${room.price}</p>
                  <Link
                    to={`/customer/rooms/${room.id}`}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
