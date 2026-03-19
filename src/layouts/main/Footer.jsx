import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top */}
        <div className="grid md:grid-cols-4 gap-10 mb-10 border-b border-slate-800 pb-10">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">
              AURA<span className="text-amber-500">.</span>
            </h2>
            <p className="text-slate-400">Luxury hotel experience.</p>
          </div>

          <div>
            <h4 className="text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>About</li>
              <li>Rooms</li>
              <li>Dining</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <p>+1 123 456</p>
            <p>email@gmail.com</p>
          </div>

          <div>
            <h4 className="text-white mb-4">Social</h4>
            <div className="flex gap-3">
              <Instagram />
              <Facebook />
              <Twitter />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Aura Hotel
        </p>
      </div>
    </footer>
  );
}
