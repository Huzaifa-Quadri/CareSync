import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight, Briefcase, Send } from "lucide-react";
import { Bento } from "@shared/components/Bento";

const Contact = () => {
  return (
    <div className="pt-6">
      <div className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Reach out</p>
        <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
          Let's <span className="italic text-accent3">talk.</span>
        </h1>
      </div>

      <Bento.Grid cols={4}>
        {/* Message tile */}
        <Bento.Tile size="2x2" className="p-7 flex flex-col min-h-[420px]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Drop us a line</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex flex-col gap-3 flex-1"
          >
            <input
              type="text"
              placeholder="Your name"
              className="bg-elevated rounded-2xl px-4 py-3 border border-line"
            />
            <input
              type="email"
              placeholder="Your email"
              className="bg-elevated rounded-2xl px-4 py-3 border border-line"
            />
            <textarea
              placeholder="Tell us what's on your mind..."
              rows={5}
              className="bg-elevated rounded-2xl px-4 py-3 border border-line resize-none flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 font-medium self-start"
            >
              <Send size={14} /> Send message
            </motion.button>
          </form>
        </Bento.Tile>

        {/* Address */}
        <Bento.Tile size="2x1" accent="accent3" className="p-7 flex flex-col justify-between min-h-[200px]">
          <MapPin size={22} />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Office</p>
            <p className="font-display text-2xl mt-1 leading-tight">
              Mirpur 10, Dhaka<br />Bangladesh
            </p>
          </div>
        </Bento.Tile>

        {/* Email */}
        <Bento.Tile size="1x1" className="p-5 flex flex-col justify-between">
          <Mail size={18} className="text-accent3" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Email</p>
            <p className="text-sm font-medium mt-1 break-all">hello@caresync.com</p>
          </div>
        </Bento.Tile>

        {/* Phone */}
        <Bento.Tile size="1x1" accent="elevated" className="p-5 flex flex-col justify-between">
          <Phone size={18} className="text-accent3" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Phone</p>
            <p className="text-sm font-medium mt-1">+880 1234 567 890</p>
          </div>
        </Bento.Tile>

        {/* Careers */}
        <Bento.Tile size="2x1" accent="ink" className="p-7 flex flex-col justify-between min-h-[200px]">
          <Briefcase size={22} />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">/ Careers</p>
            <p className="font-display text-2xl mt-1 leading-tight">
              Build the future of healthcare with us.
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-5 py-2 text-sm font-medium hover:opacity-85 transition-opacity">
              Explore jobs <ArrowUpRight size={14} />
            </button>
          </div>
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default Contact;
