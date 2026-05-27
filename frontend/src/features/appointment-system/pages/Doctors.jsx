import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X, Search } from "lucide-react";
import { AppointmentContext } from "../context/appointment.context";
import DoctorCard from "../components/DoctorCard";
import { staggerContainer } from "@shared/lib/motion";

const specialityList = [
  { name: "General Physician", slug: "general-physician" },
  { name: "Gynecologist", slug: "gynecologist" },
  { name: "Dermatologist", slug: "dermatologist" },
  { name: "Pediatrician", slug: "pediatrician" },
  { name: "Neurologist", slug: "neurologist" },
  { name: "Gastroenterologist", slug: "gastroenterologist" },
  { name: "Cardiologist", slug: "cardiologist" },
  { name: "Orthopedic Surgeon", slug: "orthopedic-surgeon" },
  { name: "Ophthalmologist", slug: "ophthalmologist" },
  { name: "ENT Specialist", slug: "ent-specialist" },
  { name: "Psychiatrist", slug: "psychiatrist" },
  { name: "Pulmonologist", slug: "pulmonologist" },
  { name: "Endocrinologist", slug: "endocrinologist" },
  { name: "Oncologist", slug: "oncologist" },
  { name: "Urologist", slug: "urologist" },
  { name: "Rheumatologist", slug: "rheumatologist" },
  { name: "Nephrologist", slug: "nephrologist" },
  { name: "Hematologist", slug: "hematologist" },
  { name: "Allergist", slug: "allergist" },
  { name: "Radiologist", slug: "radiologist" },
  { name: "Geriatrician", slug: "geriatrician" },
  { name: "Plastic Surgeon", slug: "plastic-surgeon" },
  { name: "Vascular Surgeon", slug: "vascular-surgeon" },
  { name: "Sports Medicine", slug: "sports-medicine" },
  { name: "Dentist", slug: "dentist" },
];

const TOP_COUNT = 5;

const Doctors = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { doctors } = useContext(AppointmentContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [specialitySearch, setSpecialitySearch] = useState("");

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

  const query = specialitySearch.trim().toLowerCase();
  const visibleSpecialities = query
    ? specialityList.filter((s) => s.name.toLowerCase().includes(query))
    : [
        ...specialityList.slice(0, TOP_COUNT),
        // always show active slug even if outside top 5
        ...(slug && !specialityList.slice(0, TOP_COUNT).find((s) => s.slug === slug)
          ? specialityList.filter((s) => s.slug === slug)
          : []),
      ];

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
        {/* Filter panel */}
        <aside
          className={`${
            showFilter ? "flex" : "hidden sm:flex"
          } flex-col gap-2 sm:w-56 sticky top-20 self-start`}
        >
          {/* Search */}
          <label className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              value={specialitySearch}
              onChange={(e) => setSpecialitySearch(e.target.value)}
              placeholder="Search speciality…"
              className="w-full pl-8 pr-3 py-2 rounded-2xl bg-elevated border border-line text-sm focus:outline-none focus:border-accent placeholder:text-muted"
            />
            {specialitySearch && (
              <button
                onClick={() => setSpecialitySearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            )}
          </label>

          {/* All */}
          <button
            onClick={() => { navigate("/doctors"); setSpecialitySearch(""); }}
            className={`relative isolate px-4 py-2.5 text-left text-sm rounded-2xl border transition-colors ${!slug ? "border-transparent" : "border-line hover:bg-elevated"}`}
          >
            {!slug && (
              <motion.span
                layoutId="filter-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-2xl bg-accent"
              />
            )}
            <span className={`relative z-10 ${!slug ? "text-accent-ink font-medium" : "text-ink"}`}>All</span>
          </button>

          {/* Speciality list */}
          {visibleSpecialities.map((s) => (
            <button
              key={s.slug}
              onClick={() => {
                navigate(slug === s.slug ? "/doctors" : `/doctors/${s.slug}`);
                setShowFilter(false);
                setSpecialitySearch("");
              }}
              className={`relative isolate px-4 py-2.5 text-left text-sm rounded-2xl border transition-colors ${slug === s.slug ? "border-transparent" : "border-line hover:bg-elevated"}`}
            >
              {slug === s.slug && (
                <motion.span
                  layoutId="filter-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-2xl bg-accent"
                />
              )}
              <span className={`relative z-10 ${slug === s.slug ? "text-accent-ink font-medium" : "text-ink"}`}>
                {s.name}
              </span>
            </button>
          ))}

          {/* Count hint when not searching */}
          {!query && (
            <p className="px-4 text-[10px] font-mono text-muted tracking-widest">
              +{specialityList.length - TOP_COUNT} more — search above
            </p>
          )}

          {/* No results */}
          {query && visibleSpecialities.length === 0 && (
            <p className="px-4 text-xs text-muted">No match found.</p>
          )}
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
