import { useState, useEffect } from "react";
import { Menu, X, User, Calendar } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NAV_HEADER_ITEMS } from "../../constants/header";
import { useAuthStore } from "../../../src/stores/useAuthStore";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  // The header should only be transparent on the home page when not scrolled.
  // On all other pages, it should always have a background for contrast.
  const isTransparent = isHomePage && !isScrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent py-8"
          : "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-lg shadow-slate-200/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center transition-colors">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-serif font-bold group relative flex items-center gap-1 transition-colors ${
            isTransparent ? "text-white" : "text-slate-900"
          }`}
        >
          AURA<span className="text-amber-500">.</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_HEADER_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-amber-500 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all ${
                isTransparent 
                  ? "text-white/90 hover:text-white" 
                  : (location.pathname === item.href ? "text-amber-600 after:w-full" : "text-slate-900")
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className={`hidden sm:block text-sm font-bold transition-colors px-6 ${
                isTransparent ? "text-white hover:text-amber-400" : "text-slate-900 hover:text-amber-600"
              }`}
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => navigate("/account/bookings")}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-all shadow-lg active:scale-95 ${
                isTransparent 
                  ? "bg-white/20 text-white backdrop-blur-md" 
                  : "bg-slate-900 text-white shadow-slate-900/10"
              }`}
            >
              <User size={20} />
            </button>
          )}

          <button
            onClick={() => navigate("/book")}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-amber-500/20 active:scale-95"
          >
            <Calendar size={18} />
            <span className="hidden sm:inline">Reserve</span>
          </button>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-colors ${
                isTransparent ? "bg-white/10 text-white" : "bg-slate-50 text-slate-900"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          {NAV_HEADER_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-2xl font-serif text-slate-900 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            {!user && (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 text-slate-900 font-bold border border-slate-200 rounded-2xl"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => {
                navigate("/book");
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
