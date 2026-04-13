import { useState, useEffect } from "react";
import { Bell, History, LogOut, Menu, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_HEADER_ITEMS } from "../../constants/header";
import { useAuthStore } from "../../stores/useAuthStore";
import notificationService from "../../service/notification.service";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    const loadNotifications = async () => {
      const data = await notificationService.getNotifications();
      if (!active) return;
      setNotifications(data);
    };

    void loadNotifications();

    return () => {
      active = false;
    };
  }, []);

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-black/20 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className={`text-2xl font-serif font-bold ${isScrolled ? "text-slate-900" : "text-white"}`}>
          AURA<span className="text-amber-500">.</span>
        </span>

        <div className={`hidden md:flex space-x-8 ${isScrolled ? "text-slate-600" : "text-white"}`}>
          {NAV_HEADER_ITEMS.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-amber-500">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-x-2 justify-center">
          {user ? (
            <button
              type="button"
              onClick={() => navigate("/customer/notifications")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-900"
            >
              <Bell size={18} />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-slate-950">
                  {unreadCount}
                </span>
              ) : null}
            </button>
          ) : null}

          {!user ? (
            <button onClick={() => navigate("/login")} className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <User size={18} />
              </button>
              {userMenuOpen ? (
                <div className="absolute right-0 top-12 w-60 rounded-2xl border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="font-semibold text-slate-900">{user.full_name || user.name || "Customer"}</p>
                    <p className="mt-1 text-xs text-slate-400">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/customer/profile");
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/customer/bookings");
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                  >
                    <History size={16} />
                    Booking history
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}

          <button onClick={() => navigate("/customer/rooms")} className="hidden md:block bg-amber-600 text-white px-5 py-2">
            Book Now
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 flex flex-col gap-3">
          <Link to="/">Home</Link>
          <a href="#rooms">Rooms</a>
          <a href="#amenities">Amenities</a>
          <Link to="/customer/rooms">Customer Rooms</Link>
          {user ? <Link to="/customer/bookings">Booking History</Link> : null}
          {user ? <Link to="/customer/profile">Profile</Link> : null}
          {user ? <Link to="/customer/notifications">Notifications</Link> : null}
          {user ? (
            <button type="button" onClick={handleLogout} className="text-left text-rose-600">
              Logout
            </button>
          ) : null}
        </div>
      )}
    </nav>
  );
}
