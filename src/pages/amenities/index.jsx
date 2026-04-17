import { Waves, Wifi, Coffee, Wind, Utensils, Zap, Car, Music, ArrowRight } from "lucide-react";

export default function AmenitiesPage() {
  const amenities = [
    {
      icon: <Waves size={32} />,
      title: "Infinity Pool",
      description: "Dive into luxury with our temperature-controlled infinity pool overlooking the ocean.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Wind size={32} />,
      title: "Luxury Spa",
      description: "Experience total rejuvenation with our signature massages and organic skin treatments.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Utensils size={32} />,
      title: "Gourmet Dining",
      description: "Savor world-class cuisine prepared by Michelin-starred chefs in our three unique restaurants.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT902za4Tn1CKranIsybRmY2TszAves8PdZQQ&s"
    },
    {
      icon: <Zap size={32} />,
      title: "Fitness Center",
      description: "Keep up with your routine in our state-of-the-art gym with panoramic garden views.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Car size={32} />,
      title: "Chauffeur Service",
      description: "Travel in style with our premium fleet and professional drivers at your service 24/7.",
      image: "https://images.unsplash.com/photo-1554223090-7e482851df45?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Music size={32} />,
      title: "Private Lounge",
      description: "Relax in an exclusive environment with nightly live performances and artisanal cocktails.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-40 pb-24 bg-white border-b border-slate-100 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-150 h-150 bg-amber-500/5 rounded-full blur-[120px] -mr-75 -mt-75"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <p className="text-amber-600 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm">Exquisite Living</p>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">Refined Amenities</h1>
          <div className="flex justify-center">
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              Every detail at Aura is meticulously crafted to provide a haven of tranquility and unparalleled luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {amenities.map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-96 rounded-[48px] overflow-hidden mb-8 shadow-2xl shadow-slate-200/50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                   <button className="bg-slate-900 text-white w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all translate-y-4 group-hover:translate-y-0 shadow-xl shadow-slate-900/20">
                      Explore {item.title} <ArrowRight size={18} />
                   </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
                    {item.icon}
                 </div>
                 <h3 className="text-2xl font-serif text-slate-900 group-hover:text-amber-600 transition-colors uppercase tracking-wide">
                  {item.title}
                 </h3>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" 
                    className="rounded-[64px] shadow-2xl relative z-10 w-full h-[600px] object-cover border border-white"
                    alt="Service"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[32px] shadow-2xl z-20 max-w-xs border border-slate-100">
                     <p className="text-amber-600 font-bold text-3xl font-serif mb-2">24/7</p>
                     <p className="text-slate-900 font-bold text-lg leading-tight">Dedicated Butler Service for every guest.</p>
                  </div>
               </div>
               <div>
                  <p className="text-amber-600 font-bold tracking-widest uppercase mb-4 text-sm">Personalized Service</p>
                  <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">Transcending the ordinary.</h2>
                  <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                    Our commitment to excellence goes beyond grand gestures. It's in the quiet anticipation of your needs and the seamless execution of your desires.
                  </p>
                  <ul className="space-y-6 mb-12">
                     {[
                       "Pre-arrival consultation",
                       "In-suite personalized dining",
                       "Private experience curation",
                       "Express checkout service"
                     ].map(text => (
                       <li key={text} className="flex items-center gap-4 text-slate-900 font-bold">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                             <ArrowRight size={14} />
                          </div>
                          {text}
                       </li>
                     ))}
                  </ul>
                  <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                    Book Your Experience
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
