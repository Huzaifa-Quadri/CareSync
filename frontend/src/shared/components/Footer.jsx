import { Link } from "react-router-dom";
import { Mail, Phone, ArrowUpRight, Globe, Send, Sparkles } from "lucide-react";
import Reveal from "@shared/components/Reveal";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 mb-8">
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Brand */}
          <div className="bento-tile md:col-span-2 p-8 bg-ink text-canvas">
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">/ / / CareSync</p>
            <h3 className="font-display text-4xl md:text-5xl mt-3 leading-[0.95]">
              Healthcare that<br />moves at your pace.
            </h3>
            <p className="mt-6 text-sm opacity-70 max-w-md">
              Book trusted doctors in 60 seconds. Manage your records, payments and visits — all in one place.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#" className="h-10 w-10 rounded-full border border-canvas/20 grid place-items-center hover:bg-canvas/10">
                <Globe size={16} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-canvas/20 grid place-items-center hover:bg-canvas/10">
                <Send size={16} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-canvas/20 grid place-items-center hover:bg-canvas/10">
                <Sparkles size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="bento-tile p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Company</p>
            <ul className="mt-4 space-y-2.5 text-ink">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/doctors" className="hover:text-accent transition-colors">Doctors</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bento-tile p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Reach us</p>
            <ul className="mt-4 space-y-3 text-ink text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-muted" /> +880 1234 567890
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-muted" /> hello@caresync.com
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-accent hover:gap-2 transition-all"
                >
                  Get in touch <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted font-mono uppercase tracking-widest">
        <p>© {year} · CareSync</p>
        <p>v1.0 · all systems online</p>
      </div>
    </footer>
  );
};

export default Footer;
