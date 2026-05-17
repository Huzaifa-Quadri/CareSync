import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Baby,
  Sparkles,
  Brain,
  Activity,
  Pill,
  ArrowUpRight,
} from "lucide-react";
import { staggerContainer, bentoTileEnter } from "@shared/lib/motion";

const specialities = [
  { name: "General physician", slug: "general-physician", Icon: Stethoscope, accent: "accent" },
  { name: "Gynecologist", slug: "gynecologist", Icon: Sparkles, accent: "accent2" },
  { name: "Dermatologist", slug: "dermatologist", Icon: Activity, accent: "accent3" },
  { name: "Pediatricians", slug: "pediatricians", Icon: Baby, accent: "accent" },
  { name: "Neurologist", slug: "neurologist", Icon: Brain, accent: "accent2" },
  { name: "Gastroenterologist", slug: "gastroenterologist", Icon: Pill, accent: "accent3" },
];

const SpecialityMenu = () => {
  const navigate = useNavigate();
  return (
    <section id="speciality" className="mt-16 md:mt-24">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Specialities</p>
          <h2 className="font-display text-3xl md:text-5xl mt-2 leading-tight">
            Pick a <span className="italic text-accent3">field.</span>
          </h2>
        </div>
        <button
          onClick={() => navigate("/doctors")}
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink"
        >
          View all <ArrowUpRight size={14} />
        </button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
      >
        {specialities.map(({ name, slug, Icon, accent }) => (
          <motion.button
            key={slug}
            variants={bentoTileEnter}
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              navigate(`/doctors/${slug}`);
              setTimeout(() => scrollTo(0, 0), 80);
            }}
            className={`bento-tile bg-${accent} text-${accent}-ink p-5 text-left flex flex-col gap-4 min-h-[160px]`}
          >
            <Icon size={28} strokeWidth={1.5} />
            <p className="font-display text-base leading-tight">{name}</p>
            <ArrowUpRight size={16} className="ml-auto mt-auto opacity-60" />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default SpecialityMenu;
