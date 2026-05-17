import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppointmentContext } from "../context/appointment.context";
import DoctorCard from "./DoctorCard";
import { staggerContainer } from "@shared/lib/motion";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppointmentContext);

  return (
    <section className="mt-16 md:mt-24">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Top picks</p>
          <h2 className="font-display text-3xl md:text-5xl mt-2 leading-tight">
            Featured <span className="italic text-accent3">doctors.</span>
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:border-accent"
        >
          See all <ArrowRight size={14} />
        </motion.button>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
      >
        {doctors.slice(0, 10).map((doctor, i) => (
          <DoctorCard key={doctor._id} doctor={doctor} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default TopDoctors;
