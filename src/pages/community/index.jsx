import {
  Star,
  Instagram,
  Twitter,
  Heart,
  MessageCircle,
  Share2,
  Plus,
} from "lucide-react";

export default function CommunityPage() {
  const posts = [
    {
      image:
        "https://i.ytimg.com/vi/5VZEoq7yooo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAdSYLLOLCqT9SgDccNmhKiR-pbDg",
      user: "@elenas_travels",
      likes: "1.2k",
      comment:
        "Waking up to this view at Aura is soul-cleansing. #AuraExperience #MorningMagic",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
      user: "@luxury_nomad",
      likes: "850",
      comment:
        "The spa treatments here are next level. Truly a sanctuary. #SpaLife #Aura",
    },
    {
      image:
        "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=800&q=80",
      user: "@marko_chef",
      likes: "2.1k",
      comment:
        "Dinner was a masterpiece. Every bite told a story of the local culture. #Gastronomy",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=800&q=80",
      user: "@sophie_explorer",
      likes: "940",
      comment:
        "Found my happy place at the infinity pool. Pure bliss! #HolidayVibes",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      user: "@architect_daily",
      likes: "3.4k",
      comment:
        "The design of the main lobby is a perfect blend of modern minimalism and nature.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      user: "@wanderlust_couple",
      likes: "1.5k",
      comment:
        "Celebrating our 5th anniversary at Aura. They made it so special! #Love #Anniversary",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-white pt-40 pb-24 px-4 text-center border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] -ml-48 -mt-48"></div>
        <div className="relative z-10">
          <p className="text-amber-600 font-bold tracking-widest uppercase mb-4 text-sm">
            Join the Story
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">
            Our Community
          </h1>
          <div className="flex justify-center">
            <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              Discover how our guests from around the world are experiencing the
              magic of Aura. Share your journey with #AuraExperience.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button className="flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 transition-all px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-900/10 active:scale-95">
              <Instagram size={20} /> Share a Moment
            </button>
            <button className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 hover:border-slate-900 transition-all px-8 py-4 rounded-full font-bold active:scale-95">
              View Social Feed
            </button>
          </div>
        </div>
      </section>

      {/* Featured Moments Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/40 group border border-slate-50"
            >
              <div className="relative h-[450px] overflow-hidden">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8 text-slate-900">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl flex items-center gap-2 font-bold transform -translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Heart className="fill-rose-500 text-rose-500" size={20} />{" "}
                    {post.likes}
                  </div>
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl flex items-center gap-2 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <MessageCircle size={20} className="text-slate-900" /> 12
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-slate-900 text-lg">
                    {post.user}
                  </p>
                  <button className="text-slate-400 hover:text-amber-600 transition-colors">
                    <Plus size={20} />
                  </button>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  {post.comment}
                </p>
                <div className="flex items-center justify-between text-slate-400 pt-6 border-t border-slate-100">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-50 p-12 md:p-20 rounded-[64px] shadow-inner text-center relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 font-bold">
              Stay in the Loop
            </h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg font-medium leading-relaxed">
              Join our exclusive circle for seasonal updates, private offers,
              and community stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
              <input
                type="email"
                placeholder="Your elegant email address"
                className="flex-1 px-8 py-5 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
              />
              <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
