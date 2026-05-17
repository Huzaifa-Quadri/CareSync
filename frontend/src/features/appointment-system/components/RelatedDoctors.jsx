import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppointmentContext } from "../context/appointment.context";
import DoctorCard from "./DoctorCard";
import { staggerContainer } from "@shared/lib/motion";

const RelatedDoctors = ({ docId, speciality }) => {
  const [related, setRelated] = useState([]);
  const { doctors } = useContext(AppointmentContext);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      setRelated(doctors.filter((d) => d.speciality === speciality && d._id !== docId));
    }
  }, [doctors, speciality, docId]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Related</p>
        <h2 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
          More <span className="italic text-accent3">{speciality?.toLowerCase()}s.</span>
        </h2>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
      >
        {related.slice(0, 5).map((doctor, i) => (
          <DoctorCard key={doctor._id} doctor={doctor} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default RelatedDoctors;
