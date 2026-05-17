import { Sparkles, ShieldCheck, Zap, Target, Activity } from "lucide-react";
import { Bento } from "@shared/components/Bento";
import NumberTicker from "@shared/components/NumberTicker";
import Reveal from "@shared/components/Reveal";

const About = () => {
  return (
    <div className="pt-6">
      <div className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / About</p>
        <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
          Healthcare,<br />
          <span className="italic text-accent3">rewired.</span>
        </h1>
      </div>

      <Bento.Grid cols={4}>
        <Bento.Tile size="2x2" className="p-8 md:p-10 flex flex-col justify-between min-h-[420px]">
          <Sparkles size={28} className="text-accent3" />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Mission</p>
            <p className="font-display text-2xl md:text-4xl leading-tight mt-3">
              We bridge the gap between patients and trusted specialists — no waiting rooms, no paperwork, no friction.
            </p>
          </div>
        </Bento.Tile>

        <Bento.Tile size="2x2" accent="accent3" className="p-8 md:p-10 flex flex-col justify-between min-h-[420px]">
          <Target size={28} />
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">/ Vision</p>
            <p className="font-display text-2xl md:text-4xl leading-tight mt-3">
              A world where booking your doctor is faster than ordering coffee — and twice as reliable.
            </p>
          </div>
        </Bento.Tile>

        <Bento.Tile size="1x1" accent="accent" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Patients</p>
          <p className="font-display text-4xl"><NumberTicker value={12438} />+</p>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="accent2" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Specialists</p>
          <p className="font-display text-4xl"><NumberTicker value={500} />+</p>
        </Bento.Tile>
        <Bento.Tile size="1x1" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Avg booking</p>
          <p className="font-display text-4xl">
            <NumberTicker value={42} /><span className="text-xl text-muted">s</span>
          </p>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="elevated" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Cities</p>
          <p className="font-display text-4xl"><NumberTicker value={24} /></p>
        </Bento.Tile>
      </Bento.Grid>

      <Reveal>
        <h2 className="font-display text-3xl md:text-5xl mt-16 leading-tight">
          Why <span className="italic text-accent3">choose us?</span>
        </h2>
      </Reveal>

      <Bento.Grid cols={3} className="mt-6">
        <Bento.Tile size="1x1" className="p-7" interactive>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">01 ·</p>
          <Zap size={24} className="mt-3 text-accent3" />
          <p className="font-display text-xl mt-3">Efficiency</p>
          <p className="mt-2 text-sm text-muted">
            Streamlined booking that fits your lifestyle. Sixty seconds from search to confirmed visit.
          </p>
        </Bento.Tile>
        <Bento.Tile size="1x1" className="p-7" interactive>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">02 ·</p>
          <ShieldCheck size={24} className="mt-3 text-accent3" />
          <p className="font-display text-xl mt-3">Vetted</p>
          <p className="mt-2 text-sm text-muted">
            Every doctor verified, credentialed and reviewed. No surprises.
          </p>
        </Bento.Tile>
        <Bento.Tile size="1x1" className="p-7" interactive>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">03 ·</p>
          <Activity size={24} className="mt-3 text-accent3" />
          <p className="font-display text-xl mt-3">Personalized</p>
          <p className="mt-2 text-sm text-muted">
            Smart reminders, follow-ups and recommendations tailored to your care journey.
          </p>
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default About;
