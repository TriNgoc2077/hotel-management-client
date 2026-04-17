import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Star, Wifi, Coffee, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3">Our Sanctuary</p>
              <h1 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight">
                Designed for <br/> Perfect Composure.
              </h1>
              <p className="text-slate-500 text-lg mt-4 leading-relaxed">
                Discover our curated selection of suites and villas, where every corner is a testament to refined elegance and tranquility.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center gap-4 bg-white p-2 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 pr-2"
          >
            <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-slate-100 w-full group">
              <Search size={20} className="text-amber-500 group-focus-within:text-amber-600 transition-colors" />
              <input
                placeholder="Search by room name or type..."
                value={filters.keyword}
                onChange={(e) =>
                  setFilters({ ...filters, keyword: e.target.value })
                }
                className="w-full bg-transparent border-none focus:outline-none text-slate-700 font-medium placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-6 px-6 py-4 w-full md:w-auto">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Check In</span>
                  <input
                    type="date"
                    value={filters.checkInDate}
                    onChange={(e) =>
                      setFilters({ ...filters, checkInDate: e.target.value })
                    }
                    className="bg-transparent border-none focus:outline-none text-slate-700 font-bold"
                  />
               </div>
               <div className="w-px h-8 bg-slate-100 hidden md:block"></div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Check Out</span>
                  <input
                    type="date"
                    value={filters.checkOutDate}
                    onChange={(e) =>
                      setFilters({ ...filters, checkOutDate: e.target.value })
                    }
                    className="bg-transparent border-none focus:outline-none text-slate-700 font-bold"
                  />
               </div>
            </div>

            <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-[24px] font-bold transition-all shadow-lg shadow-slate-900/20 active:scale-95">
              Refine Search
            </button>
          </form>
        </div>
      </section>

      {/* Room Listing */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-serif text-slate-900 flex items-center gap-3">
              Available Accommodations
              <span className="text-sm font-sans font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{rooms.length}</span>
            </h2>
            <div className="flex gap-2">
               <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-900 hover:text-slate-900 transition-all">Filter</button>
               <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-900 hover:text-slate-900 transition-all">Sort by</button>
            </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-900 shadow-lg">
                  ${room.price}/night
                </div>
                <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg transition-transform duration-300 hover:scale-110">
                   <Star size={20} className={room.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                     {room.type}
                   </span>
                </div>
                
                <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {room.name}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex items-center gap-6 text-slate-400 mb-8 border-y border-slate-50 py-4">
                   <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <Users size={16} className="text-slate-300" /> {room.capacity} Guests
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <Wifi size={16} className="text-slate-300" /> Wifi
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <Coffee size={16} className="text-slate-300" /> Breakfast
                   </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/rooms/${room.id}`}
                    className="flex items-center gap-2 text-slate-900 font-bold hover:text-amber-600 transition-all group/link"
                  >
                    View Details
                    <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Support */}
      <section className="bg-slate-50 py-20">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-serif text-slate-900 mb-6 font-bold underline-offset-8 decoration-amber-500/30 underline">Can't find what you're looking for?</h3>
            <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
               Our specialists are available to help you arrange your perfect stay at Aura. Reach out to us for customized arrangements and exclusive offers.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold shadow-sm hover:border-slate-900 transition-all">Call Concierge</button>
               <button className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold shadow-sm hover:border-slate-900 transition-all">Chat Live</button>
            </div>
         </div>
      </section>
    </div>
  );
}
