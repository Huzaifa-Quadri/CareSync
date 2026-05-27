import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Power,
  EyeOff,
  Eye,
  Trash2,
} from "lucide-react";
import { AdminContext } from "../../context/admin.context";
import { AppContext } from "@shared/context/app.context";
import ConfirmModal from "@features/appointment-system/components/ConfirmModal";

const accentRotation = ["accent", "accent2", "accent3"];

const DoctorDetail = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, aToken, getAllDoctors, changeAvailability, toggleDoctorVisibility, deleteDoctor } = useContext(AdminContext);
  const { currencySymbol } = useContext(AppContext);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (aToken && doctors.length === 0) getAllDoctors();
  }, [aToken]);

  const idx = doctors.findIndex((d) => d._id === docId);
  const doctor = doctors[idx] ?? null;
  const accent = accentRotation[idx >= 0 ? idx % accentRotation.length : 0];

  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteDoctor(docId);
    navigate("/admin/doctors-list");
  };

  const handleToggleVisibility = async () => {
    await toggleDoctorVisibility(docId);
  };

  if (!doctor) {
    return (
      <div className="pt-8 text-center text-muted font-mono text-sm">
        Loading doctor data…
      </div>
    );
  }

  return (
    <div className="pt-2">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to doctors
      </button>

      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Admin · Registry · Detail</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
            Doctor <span className="italic text-accent3">profile.</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Hide profile square toggle */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleToggleVisibility}
            title={doctor.isHidden ? "Hidden from patients — click to show" : "Visible to patients — click to hide"}
            className={`h-10 w-10 rounded-xl grid place-items-center border transition-colors ${
              doctor.isHidden
                ? "bg-accent2 text-accent2-ink border-transparent"
                : "bg-elevated border-line text-muted hover:text-ink"
            }`}
          >
            {doctor.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.button>

          {/* Delete doctor */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setDeleteModal(true)}
            title="Delete doctor"
            className="h-10 w-10 rounded-xl grid place-items-center border border-line bg-elevated text-muted hover:bg-accent2 hover:text-accent2-ink hover:border-transparent transition-colors"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Hidden badge */}
      {doctor.isHidden && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent2 text-accent2-ink px-4 py-2 text-xs font-mono uppercase tracking-widest">
          <EyeOff size={12} /> Hidden from patients
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_220px] gap-4">

        {/* Image */}
        <div className={`bento-tile overflow-hidden h-56 lg:h-auto bg-${accent}`}>
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Identity */}
        <div className="bento-tile p-6 flex flex-col gap-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ / / {doctor.speciality}</p>
          <h2 className="font-display text-3xl leading-tight flex items-start gap-2">
            {doctor.name}
            <BadgeCheck size={18} className="text-accent3 mt-1.5 shrink-0" />
          </h2>

          <div className="flex flex-wrap gap-3 mt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-elevated rounded-full px-3 py-1.5 text-muted">
              <GraduationCap size={12} /> {doctor.degree}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-elevated rounded-full px-3 py-1.5 text-muted">
              <Briefcase size={12} /> {doctor.experience}
            </span>
          </div>

          {doctor.about && (
            <p className="mt-2 text-sm text-ink leading-relaxed flex-1">{doctor.about}</p>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-3">

          {/* Fee */}
          <div className="bento-tile bg-accent3 text-accent3-ink p-5">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-80">
              <IndianRupee size={11} /> Consultation Fee
            </p>
            <p className="mt-2 font-display text-3xl">{currencySymbol}{doctor.fees}</p>
          </div>

          {/* Availability toggle */}
          <div className={`bento-tile p-5 transition-colors ${doctor.available ? "bg-accent" : ""}`}>
            <p className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest ${doctor.available ? "text-accent-ink opacity-80" : "text-muted"}`}>
              <Power size={11} /> Availability
            </p>
            <label className="mt-3 flex items-center gap-3 cursor-pointer">
              <span className="relative inline-flex h-6 w-11 items-center shrink-0">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                  className="peer absolute h-full w-full opacity-0 cursor-pointer"
                />
                <span className={`h-6 w-11 rounded-full transition-colors ${doctor.available ? "bg-accent-ink/30" : "bg-elevated"}`} />
                <span className={`absolute left-0.5 h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5 ${doctor.available ? "bg-canvas" : "bg-muted"}`} />
              </span>
              <span className={`font-display text-lg ${doctor.available ? "text-accent-ink" : "text-ink"}`}>
                {doctor.available ? "Available" : "Off duty"}
              </span>
            </label>
          </div>

          {/* Address */}
          <div className="bento-tile p-5 flex-1">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted">
              <MapPin size={11} /> Address
            </p>
            <p className="mt-2 text-sm text-ink leading-relaxed">
              {doctor.address?.line1}
              {doctor.address?.line2 && <><br />{doctor.address.line2}</>}
            </p>
          </div>

        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <ConfirmModal
          open={deleteModal}
          title="Delete doctor"
          message={`Permanently delete ${doctor.name}'s account and cancel all their appointments. This cannot be undone.`}
          confirmText="Yes, delete doctor"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorDetail;
