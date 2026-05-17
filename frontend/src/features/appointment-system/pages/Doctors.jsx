import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { AppointmentContext } from "../context/appointment.context";
import DoctorCard from "../components/DoctorCard";
import { staggerContainer } from "@shared/lib/motion";

const specialityList = [
  { name: "General physician", slug: "general-physician" },
  { name: "Gynecologist", slug: "gynecologist" },
  { name: "Dermatologist", slug: "dermatologist" },
  { name: "Pediatricians", slug: "pediatricians" },
  { name: "Neurologist", slug: "neurologist" },
  { name: "Gastroenterologist", slug: "gastroenterologist" },
];

const Doctors = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { doctors } = useContext(AppointmentContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (slug) {
      setFilterDoc(
        doctors.filter(
          (d) => d.speciality.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, slug]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, [pathname]);

  return (
    <div className="pt-6">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
            / / / Directory · {filterDoc.length} results
          </p>
          <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
            All <span className="italic text-accent3">doctors.</span>
          </h1>
        </div>
        <button
          className="sm:hidden inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-4 py-2 text-sm"
          onClick={() => setShowFilter((p) => !p)}
        >
          {showFilter ? <X size={14} /> : <Filter size={14} />}
          {showFilter ? "Close" : "Filter"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Filter chips */}
        <aside
          className={`${
            showFilter ? "flex" : "hidden sm:flex"
          } flex-wrap sm:flex-col gap-2 sm:gap-1.5 sm:w-56 sticky top-20 self-start`}
        >
          <button
            onClick={() => navigate("/doctors")}
            className="relative px-4 py-2.5 text-left text-sm rounded-2xl bg-surface border border-line"
          >
            {!slug && (
              <motion.span
                layoutId="filter-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-2xl bg-accent"
              />
            )}
            <span className={!slug ? "text-accent-ink font-medium" : "text-ink"}>All</span>
          </button>
          {specialityList.map((s) => (
            <button
              key={s.slug}
              onClick={() => {
                navigate(slug === s.slug ? "/doctors" : `/doctors/${s.slug}`);
                setShowFilter(false);
              }}
              className="relative px-4 py-2.5 text-left text-sm rounded-2xl bg-surface border border-line"
            >
              {slug === s.slug && (
                <motion.span
                  layoutId="filter-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-2xl bg-accent"
                />
              )}
              <span className={slug === s.slug ? "text-accent-ink font-medium" : "text-ink"}>
                {s.name}
              </span>
            </button>
          ))}
        </aside>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filterDoc.map((doctor, i) => (
              <motion.div
                key={doctor._id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <DoctorCard doctor={doctor} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
