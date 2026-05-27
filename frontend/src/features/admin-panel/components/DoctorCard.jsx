import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AdminContext } from "../context/admin.context";

const accentRotation = ["accent", "accent2", "accent3"];

const DoctorCard = ({ doctor, index = 0 }) => {
  const { changeAvailability } = useContext(AdminContext);
  const navigate = useNavigate();
  const accent = accentRotation[index % accentRotation.length];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="bento-tile overflow-hidden cursor-pointer"
      onClick={() => navigate(`/admin/doctors-list/${doctor._id}`)}
    >
      <div className={`bg-${accent} aspect-4/5 overflow-hidden`}>
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
          {doctor.speciality}
        </p>
        <p className="font-display text-lg leading-tight mt-0.5 text-ink">{doctor.name}</p>
        {/* stopPropagation so toggle click doesn't open detail page */}
        <label
          className="mt-3 flex items-center gap-2 cursor-pointer text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="relative inline-flex h-5 w-9 items-center">
            <input
              type="checkbox"
              checked={doctor.available}
              onChange={() => changeAvailability(doctor._id)}
              className="peer absolute h-full w-full opacity-0 cursor-pointer"
            />
            <span className="h-5 w-9 rounded-full bg-elevated peer-checked:bg-accent3 transition-colors" />
            <span className="absolute left-0.5 h-4 w-4 rounded-full bg-surface peer-checked:translate-x-4 transition-transform" />
          </span>
          <span className="text-ink">{doctor.available ? "Available" : "Off"}</span>
        </label>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
