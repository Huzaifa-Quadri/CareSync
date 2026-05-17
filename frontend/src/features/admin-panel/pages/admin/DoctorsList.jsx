import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminContext } from "../../context/admin.context";
import DoctorCard from "../../components/DoctorCard";
import { staggerContainer, bentoTileEnter } from "@shared/lib/motion";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="pt-2">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
            / / / Admin · Registry · {doctors.length} total
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
            Doctors.
          </h1>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
      >
        {doctors.map((d, i) => (
          <motion.div key={d._id} variants={bentoTileEnter}>
            <DoctorCard doctor={d} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DoctorsList;
