import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Waves,
  Wind,
  ChevronRight,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";
import img from "./assets/images/rectangle-1.png";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-amber-200 selection:text-amber-900">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white shadow-md py-4"
            : "bg-black/20 backdrop-blur-sm py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <span
                className={`text-2xl font-serif font-bold tracking-wider ${isScrolled ? "text-slate-900" : "text-white"}`}
              >
                AURA<span className="text-amber-500">.</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div
              className={`hidden md:flex space-x-8 font-medium ${isScrolled ? "text-slate-600" : "text-white/90"}`}
            >
              <a
                href="#home"
                className="hover:text-amber-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#rooms"
                className="hover:text-amber-500 transition-colors"
              >
                Rooms & Suites
              </a>
              <a
                href="#amenities"
                className="hover:text-amber-500 transition-colors"
              >
                Amenities
              </a>
              <a
                href="#community"
                className="hover:text-amber-500 transition-colors"
              >
                Community
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-sm font-semibold transition-colors duration-200 shadow-lg shadow-amber-600/30">
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${isScrolled ? "text-slate-900" : "text-white"}`}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col space-y-4">
            <a
              href="#home"
              className="text-slate-600 font-medium hover:text-amber-600 p-2"
            >
              Home
            </a>
            <a
              href="#rooms"
              className="text-slate-600 font-medium hover:text-amber-600 p-2"
            >
              Rooms & Suites
            </a>
            <a
              href="#amenities"
              className="text-slate-600 font-medium hover:text-amber-600 p-2"
            >
              Amenities
            </a>
            <a
              href="#community"
              className="text-slate-600 font-medium hover:text-amber-600 p-2"
            >
              Community
            </a>
            <button className="bg-amber-600 text-white px-4 py-3 rounded-sm font-semibold mt-4 w-full">
              Book Your Stay
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${img})`,
            imageRendering: "auto",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/40"></div>
          {/* Gradient for bottom fade */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-amber-400 font-semibold tracking-[0.2em] uppercase text-sm md:text-base mb-4 drop-shadow-md">
            Welcome to Paradise
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 drop-shadow-lg leading-tight">
            Experience True <br className="hidden md:block" /> Elegance.
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto pb-5 drop-shadow-md">
            A haven of tranquility where every moment is a masterpiece. Discover
            the perfect blend of luxury and nature.
          </p>
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center mx-auto space-x-2 cursor-pointer">
            <span>Discover More</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Booking Widget (Overlapping) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-16 mb-20">
        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 border border-slate-100">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Check In
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Check Out
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Guests
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600"
                  size={20}
                />
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-700 appearance-none">
                  <option>1 Adult, 0 Children</option>
                  <option>2 Adults, 0 Children</option>
                  <option>2 Adults, 1 Child</option>
                  <option>2 Adults, 2 Children</option>
                  <option>More options...</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-md transition-colors shadow-lg shadow-slate-900/20 flex justify-center items-center"
            >
              Check Availability
            </button>
          </form>
        </div>
      </section>

      {/* Intro / Amenities Section */}
      <section id="amenities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Hotel Interior"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Hotel Pool"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-2">
                Discover Aura
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                A world-class destination for the modern traveler.
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Nestled in the heart of pristine nature, Aura offers an
                unparalleled sanctuary. Immerse yourself in refined comfort,
                exquisite dining, and breathtaking views that redefine the art
                of hospitality.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                    <Wifi size={24} />
                  </div>
                  <span className="font-medium text-slate-700">
                    High-Speed Wi-Fi
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                    <Waves size={24} />
                  </div>
                  <span className="font-medium text-slate-700">
                    Infinity Pool
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                    <Coffee size={24} />
                  </div>
                  <span className="font-medium text-slate-700">
                    Premium Breakfast
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                    <Wind size={24} />
                  </div>
                  <span className="font-medium text-slate-700">
                    Spa & Wellness
                  </span>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Explore All Amenities{" "}
                <ChevronRight size={20} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section id="rooms" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-2">
              Our Accommodations
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
              Featured Rooms & Suites
            </h2>
            <p className="text-slate-600 text-lg">
              Designed with meticulous attention to detail, our rooms offer a
              perfect balance of contemporary design and timeless comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Deluxe Ocean View"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-800">
                  From $250/night
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-1">
                      Deluxe Ocean View
                    </h3>
                    <div className="flex items-center text-amber-500 text-sm">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 line-clamp-2">
                  Wake up to breathtaking ocean panoramas. Features a king-size
                  bed, private balcony, and luxurious marble bathroom.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex space-x-3 text-slate-400">
                    <Users size={20} title="2 Guests" />
                    <Wifi size={20} title="Free Wifi" />
                    <Coffee size={20} title="Breakfast Included" />
                  </div>
                  <button className="text-amber-600 font-semibold hover:text-amber-700 flex items-center">
                    Book Now <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Premium Suite"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-800">
                  From $450/night
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-1">
                      Premium Suite
                    </h3>
                    <div className="flex items-center text-amber-500 text-sm">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 line-clamp-2">
                  Expansive living area, panoramic city views, and exclusive
                  access to the Aura Club Lounge. The ultimate indulgence.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex space-x-3 text-slate-400">
                    <Users size={20} title="4 Guests" />
                    <Wifi size={20} title="Free Wifi" />
                    <Waves size={20} title="Private Pool Access" />
                  </div>
                  <button className="text-amber-600 font-semibold hover:text-amber-700 flex items-center">
                    Book Now <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Garden Villa"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-800">
                  From $600/night
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-1">
                      Garden Villa
                    </h3>
                    <div className="flex items-center text-amber-500 text-sm">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 line-clamp-2">
                  A secluded paradise featuring a private garden, plunge pool,
                  and dedicated butler service for a truly bespoke stay.
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex space-x-3 text-slate-400">
                    <Users size={20} title="2 Guests" />
                    <Wifi size={20} title="Free Wifi" />
                    <Wind size={20} title="Air Conditioning" />
                  </div>
                  <button className="text-amber-600 font-semibold hover:text-amber-700 flex items-center">
                    Book Now <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3 rounded-sm font-semibold transition-colors duration-300">
              View All Accommodations
            </button>
          </div>
        </div>
      </section>

      {/* Community / Testimonials Section */}
      <section
        id="community"
        className="py-24 bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Abstract Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute w-96 h-96 bg-amber-500 rounded-full blur-[100px] -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-[120px] bottom-0 right-0"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2">
                Our Community
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Unforgettable Moments Shared by You
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Join our vibrant community of travelers. See how guests from
                around the world are experiencing the magic of Aura. Share your
                moments using #AuraExperience.
              </p>

              {/* Single Highlighted Review */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  <Star size={18} className="fill-current" />
                  <Star size={18} className="fill-current" />
                  <Star size={18} className="fill-current" />
                  <Star size={18} className="fill-current" />
                  <Star size={18} className="fill-current" />
                </div>
                <p className="text-lg md:text-xl font-serif italic text-white/90 mb-6">
                  "Absolutely stellar experience! The attention to detail is
                  unmatched, and the staff made us feel like royalty. The garden
                  villa was a dream come true."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Guest"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <h4 className="font-semibold text-white">Sarah Jenkins</h4>
                    <p className="text-sm text-slate-400">
                      Guest from London, UK
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Collage (Community Posts) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1512227121147-8723665b1bc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Community Post"
                  className="w-full h-48 object-cover rounded-xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Community Post"
                  className="w-full h-64 object-cover rounded-xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Community Post"
                  className="w-full h-64 object-cover rounded-xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                />
                <img
                  src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Community Post"
                  className="w-full h-48 object-cover rounded-xl shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <span className="text-3xl font-serif font-bold tracking-wider text-white mb-6 inline-block">
                AURA<span className="text-amber-500">.</span>
              </span>
              <p className="text-slate-400 mb-6">
                Redefining luxury hospitality through exceptional experiences
                and uncompromising standards of service.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Dining
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Spa & Wellness
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin
                    size={20}
                    className="text-amber-500 shrink-0 mt-0.5"
                  />
                  <span>
                    123 Coastal Highway, Paradise Island, Ocean View 90210
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-amber-500 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="text-amber-500 shrink-0" />
                  <span>reservations@aurahotel.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-wider mb-6">
                Newsletter
              </h4>
              <p className="text-slate-400 mb-4">
                Subscribe to receive exclusive offers and updates.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="bg-slate-900 border border-slate-700 px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 text-white"
                />
                <button
                  type="button"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Aura Hotel & Resorts. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
