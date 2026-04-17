import { Link, useLocation, Outlet } from "react-router-dom";
import { User, Bell, Briefcase, LogOut, ChevronRight, Settings } from "lucide-react";

export default function AccountLayout() {
  const location = useLocation();

  const menuItems = [
    {
      label: "My Bookings",
      href: "/account/bookings",
      icon: <Briefcase size={20} />,
    },
    {
      label: "Profile Settings",
      href: "/account/profile",
      icon: <User size={20} />,
    },
    {
      label: "Notifications",
      href: "/account/notifications",
      icon: <Bell size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-32">
              <div className="p-10 bg-linear-to-b from-slate-50 to-white border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-white p-1.5 rounded-full mx-auto shadow-xl mb-4 border border-slate-100">
                    <div className="w-full h-full bg-linear-to-tr from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-3xl font-serif font-bold text-white">
                      JD
                    </div>
                  </div>
                  <h2 className="text-2xl font-serif text-slate-900">John Doe</h2>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Premium Member</p>
                </div>
              </div>
              
              <nav className="p-8">
                <ul className="space-y-3">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={isActive ? "text-amber-500" : "text-amber-600"}>
                              {item.icon}
                            </span>
                            {item.label}
                          </div>
                          {isActive && <ChevronRight size={18} className="text-amber-500" />}
                        </Link>
                      </li>
                    );
                  })}
                  
                  <li className="pt-6 mt-6 border-t border-slate-100">
                    <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600 w-full transition-all text-left group">
                      <LogOut size={20} className="group-hover:text-rose-600" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="p-8 bg-slate-50 border-t border-slate-100">
                 <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-5 translate-x-4 -translate-y-4 group-hover:rotate-45 transition-transform">
                       <Settings size={40} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Support</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">Need help with your reservation? Our team is available 24/7.</p>
                    <button className="text-amber-600 text-xs font-bold mt-3 hover:text-amber-700 transition-colors flex items-center gap-1">
                      Contact Concierge <ChevronRight size={12} />
                    </button>
                 </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full">
            <div className="bg-white rounded-[40px] min-h-[700px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
               <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
