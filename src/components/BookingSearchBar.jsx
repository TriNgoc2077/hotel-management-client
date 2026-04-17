import { useState } from "react";
import { Calendar, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingSearchBar({ initialValues = {} }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    checkIn: initialValues.checkIn || "",
    checkOut: initialValues.checkOut || "",
    capacity: initialValues.capacity || "1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(values);
    navigate(`/book?${params.toString()}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-slate-100">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
            Check In
          </label>
          <div className="relative group">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:text-amber-600 transition-colors"
              size={18}
            />
            <input
              type="date"
              name="checkIn"
              value={values.checkIn}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
            Check Out
          </label>
          <div className="relative group">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:text-amber-600 transition-colors"
              size={18}
            />
            <input
              type="date"
              name="checkOut"
              value={values.checkOut}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
            Guests
          </label>
          <div className="relative group">
            <Users
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:text-amber-600 transition-colors"
              size={18}
            />
            <select
              name="capacity"
              value={values.capacity}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-700 font-medium appearance-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/20 flex justify-center items-center gap-2 group"
        >
          <Search size={18} className="group-hover:scale-110 transition-transform" />
          <span>Search Rooms</span>
        </button>
      </form>
    </div>
  );
}
