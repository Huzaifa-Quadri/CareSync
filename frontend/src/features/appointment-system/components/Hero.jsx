import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { Bento } from "@shared/components/Bento";
import NumberTicker from "@shared/components/NumberTicker";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Bento.Grid cols={4} gap="md" className="mt-6">
      {/* Headline tile */}
      <Bento.Tile size="2x2" className="p-8 md:p-10 flex flex-col justify-between min-h-[420px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
            01 · Now booking
          </span>
        </div>
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.95] tracking-tight">
          Find your <span className="text-accent3 italic">doctor.</span><br />
          Book in 60 <span className="text-accent3">seconds.</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.getElementById("speciality");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 font-medium"
          >
            Book appointment
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
          <button
            onClick={() => navigate("/doctors")}
            className="text-sm font-medium text-muted hover:text-ink underline-offset-4 hover:underline"
          >
            Browse all doctors
          </button>
        </div>
      </Bento.Tile>

      {/* Quick book / accent tile */}
      <Bento.Tile size="2x1" accent="accent3" className="p-6 flex flex-col justify-between min-h-[200px]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">02 · Why us</p>
          <Sparkles size={18} />
        </div>
        <div>
          <p className="font-display text-3xl leading-tight">
            Verified specialists, instant booking.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} /> Vetted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> 24/7
          </span>
        </div>
      </Bento.Tile>

      {/* Stat tiles */}
      <Bento.Tile size="1x1" accent="accent" className="p-5 flex flex-col justify-between">
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Patients</p>
        <p className="font-display text-4xl leading-none">
          <NumberTicker value={12438} />+
        </p>
      </Bento.Tile>
      <Bento.Tile size="1x1" accent="accent2" className="p-5 flex flex-col justify-between">
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Doctors</p>
        <p className="font-display text-4xl leading-none">
          <NumberTicker value={500} />+
        </p>
      </Bento.Tile>
    </Bento.Grid>
  );
};

export default Hero;
