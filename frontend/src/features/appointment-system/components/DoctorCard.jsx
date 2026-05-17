import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const accentRotation = ["accent", "accent2", "accent3"];

const DoctorCard = ({ doctor, index = 0 }) => {
  const navigate = useNavigate();
  const accent = accentRotation[index % accentRotation.length];

  return (
    <motion.button
      type="button"
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
      whileHover={{ y: -6, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group bento-tile text-left w-full ${doctor.available ? "" : "opacity-60"}`}
    >
      <div className={`relative bg-${accent} overflow-hidden`}>
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-ink">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              doctor.available ? "bg-emerald-500 animate-pulse-dot" : "bg-muted"
            }`}
          />
          {doctor.available ? "Available" : "Off"}
        </div>
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-ink/80 backdrop-blur grid place-items-center text-canvas opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
          {doctor.speciality}
        </p>
        <p className="mt-1 font-display text-lg leading-tight text-ink">{doctor.name}</p>
        {doctor.experience && (
          <p className="mt-1 text-xs text-muted">{doctor.experience} exp</p>
        )}
      </div>
    </motion.button>
  );
};

export default DoctorCard;
