import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Check, Info, Calendar, Users, ArrowRight, Star, Wifi, Coffee } from "lucide-react";
import roomService from "../../service/room.service";
import BookingSearchBar from "../../components/BookingSearchBar";

export default function BookPage() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const capacity = searchParams.get("capacity") || "1";

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await roomService.getRooms({
        checkInDate: checkIn,
        checkOutDate: checkOut,
        capacity: capacity,
      });
      setRooms(data);
    };
    fetchRooms();
  }, [checkIn, checkOut, capacity]);

  const toggleRoom = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const totalPrice = selectedRooms.reduce((sum, roomId) => {
    const room = rooms.find((r) => String(r.id) === String(roomId));
    return sum + (room?.price || 0);
  }, 0);

  const selectedRoomDetails = selectedRooms.map(id => rooms.find(r => String(r.id) === String(id))).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2">Book Your Stay</h1>
        <p className="text-slate-600 mb-10 text-lg">Select the perfect room for your next adventure.</p>

        {/* Search Bar */}
        <div className="mb-12">
          <BookingSearchBar initialValues={{ checkIn, checkOut, capacity }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Room List */}
          <div className="flex-1 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Available Rooms
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">{rooms.length} results</span>
            </h2>
            
            {rooms.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
                 <p className="text-slate-400">No rooms found for the selected criteria. Try adjusting your search.</p>
              </div>
            ) : (
              rooms.map((room) => {
                const isSelected = selectedRooms.includes(room.id);
                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col md:flex-row ${
                      isSelected ? "border-amber-500 ring-1 ring-amber-500" : "border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="md:w-72 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center pointer-events-none">
                           <div className="bg-white rounded-full p-2 shadow-lg">
                              <Check className="text-amber-600" size={24} />
                           </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-serif text-slate-900">{room.name}</h3>
                          <p className="text-2xl font-bold text-slate-900">${room.price}<span className="text-sm text-slate-400 font-normal">/night</span></p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                          <div className="flex items-center gap-1"><Users size={16} /> Max {room.capacity}</div>
                          <div className="flex items-center gap-1"><Wifi size={16} /> Free Wifi</div>
                          <div className="flex items-center gap-1"><Coffee size={16} /> Breakfast</div>
                        </div>
                        
                        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                          {room.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <Link 
                          to={`/rooms/${room.id}`}
                          className="text-slate-900 font-semibold hover:text-amber-600 flex items-center gap-1 text-sm underline-offset-4 hover:underline"
                        >
                          View Details <ArrowRight size={14} />
                        </Link>
                        
                        <button
                          onClick={() => toggleRoom(room.id)}
                          className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                            isSelected 
                              ? "bg-slate-900 text-white" 
                              : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                          }`}
                        >
                          {isSelected ? "Remove" : "Select Room"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Price Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 sticky top-28 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <h2 className="text-2xl font-serif mb-6 text-slate-900 relative z-10">Reservation Summary</h2>
              
              {selectedRooms.length === 0 ? (
                <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-[32px] mb-8">
                   <p className="text-sm font-medium">Please select a room <br/> to see your summary</p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {selectedRoomDetails.map(room => (
                    <div key={room.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{room.name}</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Confirmed</span>
                      </div>
                      <span className="font-bold text-amber-600">${room.price}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-4 pt-2 border-t border-slate-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Check-in</span>
                  <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-full text-xs">{checkIn || "Not set"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Check-out</span>
                  <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-full text-xs">{checkOut || "Not set"}</span>
                </div>
                
                <div className="pt-6 flex justify-between items-end border-t border-slate-50 mt-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Stay</span>
                    <span className="text-3xl font-serif font-bold text-slate-900">${totalPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Taxes Incl.</span>
                  </div>
                </div>
              </div>

              <button 
                disabled={selectedRooms.length === 0}
                className={`w-full mt-8 py-5 rounded-3xl font-bold text-lg transition-all active:scale-[0.98] ${
                  selectedRooms.length > 0 
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10" 
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                Proceed to Payment
              </button>
              
              <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6">
                Secure 256-bit SSL encrypted payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
