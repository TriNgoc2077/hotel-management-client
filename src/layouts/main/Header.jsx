import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-4"
          : "bg-black/20 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <span
          className={`text-2xl font-serif font-bold ${
            isScrolled ? "text-slate-900" : "text-white"
          }`}
        >
          AURA<span className="text-amber-500">.</span>
        </span>

        {/* Desktop menu */}
        <div
          className={`hidden md:flex space-x-8 ${
            isScrolled ? "text-slate-600" : "text-white"
          }`}
        >
          <Link to="/">Home</Link>
          <a href="#rooms">Rooms</a>
          <a href="#amenities">Amenities</a>
          <a href="#community">Community</a>
        </div>

        {/* Button */}
        <button className="hidden md:block bg-amber-600 text-white px-5 py-2">
          Book Now
        </button>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 flex flex-col gap-3">
          <a href="#home">Home</a>
          <a href="#rooms">Rooms</a>
          <a href="#amenities">Amenities</a>
        </div>
      )}
    </nav>
  );
}
