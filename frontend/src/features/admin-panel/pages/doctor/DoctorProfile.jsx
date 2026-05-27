import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, MapPin, IndianRupee, BadgeCheck, Power, EyeOff, Eye, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/doctor.context";
import { AppContext } from "@shared/context/app.context";
import * as doctorPanelApi from "../../service/doctor-panel.api";
import ConfirmModal from "@features/appointment-system/components/ConfirmModal";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, toggleVisibility, deleteSelf } = useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const save = async () => {
    try {
      const { data } = await doctorPanelApi.updateDoctorProfile(
        { address: profileData.address, fees: profileData.fees, available: profileData.available },
        dToken
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update");
    }
  };

  const toggleAvailability = async () => {
    const newVal = !profileData.available;
    setProfileData((p) => ({ ...p, available: newVal }));
    try {
      const { data } = await doctorPanelApi.updateDoctorProfile(
        { address: profileData.address, fees: profileData.fees, available: newVal },
        dToken
      );
      if (data.success) {
        toast.success(newVal ? "Now available" : "Set to unavailable");
      } else {
        getProfileData();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update");
      getProfileData();
    }
  };

  if (!profileData) return null;

  return (
    <div className="pt-2">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Doctor · Profile</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">Your profile.</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Hide profile square toggle */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={toggleVisibility}
            title={profileData.isHidden ? "Profile hidden from patients — click to show" : "Profile visible to patients — click to hide"}
            className={`h-10 w-10 rounded-xl grid place-items-center border transition-colors ${
              profileData.isHidden
                ? "bg-accent2 text-accent2-ink border-transparent"
                : "bg-elevated border-line text-muted hover:text-ink"
            }`}
          >
            {profileData.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.button>

          {/* Delete account */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setDeleteModal(true)}
            title="Delete account"
            className="h-10 w-10 rounded-xl grid place-items-center border border-line bg-elevated text-muted hover:bg-accent2 hover:text-accent2-ink hover:border-transparent transition-colors"
          >
            <Trash2 size={16} />
          </motion.button>

          {/* Edit / Save */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => (isEdit ? save() : setIsEdit(true))}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-2.5 font-medium"
          >
            {isEdit ? <Save size={14} /> : <Pencil size={14} />}
            {isEdit ? "Save changes" : "Edit profile"}
          </motion.button>
        </div>
      </div>

      {/* Hidden badge */}
      {profileData.isHidden && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent2 text-accent2-ink px-4 py-2 text-xs font-mono uppercase tracking-widest">
          <EyeOff size={12} /> Profile hidden from patients
        </div>
      )}

      {/* Main layout: image | identity | meta */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_220px] gap-4">

        {/* Image */}
        <div className="bento-tile overflow-hidden h-56 lg:h-auto">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Identity */}
        <div className="bento-tile p-6 flex flex-col gap-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ / / {profileData.speciality}</p>
          <h2 className="font-display text-3xl leading-tight flex items-start gap-2">
            {profileData.name}
            <BadgeCheck size={18} className="text-accent3 mt-1.5 shrink-0" />
          </h2>
          <p className="text-sm text-muted">{profileData.degree} · {profileData.experience}</p>
          <p className="mt-2 text-sm text-ink leading-relaxed flex-1">{profileData.about}</p>
        </div>

        {/* Meta: fee + status + address */}
        <div className="flex flex-col gap-3">

          {/* Fee */}
          <div className="bento-tile bg-accent3 text-accent3-ink p-5">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-80">
              <IndianRupee size={11} /> Consultation Fee
            </p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) => setProfileData((p) => ({ ...p, fees: e.target.value }))}
                className="mt-2 w-full bg-canvas/20 rounded-xl px-3 py-2 font-display text-2xl"
              />
            ) : (
              <p className="mt-2 font-display text-3xl">{currencySymbol}{profileData.fees}</p>
            )}
          </div>

          {/* Availability — always interactive */}
          <div className={`bento-tile p-5 transition-colors ${profileData.available ? "bg-accent" : ""}`}>
            <p className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest ${profileData.available ? "text-accent-ink opacity-80" : "text-muted"}`}>
              <Power size={11} /> Status
            </p>
            <label className="mt-3 flex items-center gap-3 cursor-pointer">
              <span className="relative inline-flex h-6 w-11 items-center shrink-0">
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={toggleAvailability}
                  className="peer absolute h-full w-full opacity-0 cursor-pointer"
                />
                <span className={`h-6 w-11 rounded-full transition-colors ${profileData.available ? "bg-accent-ink/30" : "bg-elevated"}`} />
                <span className={`absolute left-0.5 h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5 ${profileData.available ? "bg-canvas" : "bg-muted"}`} />
              </span>
              <span className={`font-display text-lg ${profileData.available ? "text-accent-ink" : "text-ink"}`}>
                {profileData.available ? "Available" : "Off duty"}
              </span>
            </label>
          </div>

          {/* Address */}
          <div className="bento-tile p-5 flex-1">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted">
              <MapPin size={11} /> Address
            </p>
            {isEdit ? (
              <div className="mt-3 space-y-2">
                <input
                  value={profileData.address.line1}
                  onChange={(e) => setProfileData((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))}
                  placeholder="Line 1"
                  className="w-full bg-elevated rounded-xl px-3 py-2 text-sm border border-line"
                />
                <input
                  value={profileData.address.line2}
                  onChange={(e) => setProfileData((p) => ({ ...p, address: { ...p.address, line2: e.target.value } }))}
                  placeholder="Line 2"
                  className="w-full bg-elevated rounded-xl px-3 py-2 text-sm border border-line"
                />
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink leading-relaxed">
                {profileData.address.line1}
                {profileData.address.line2 && <><br />{profileData.address.line2}</>}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <ConfirmModal
          open={deleteModal}
          title="Delete account"
          message="This permanently deletes your account and cancels all your appointments. This cannot be undone."
          confirmText="Yes, delete my account"
          cancelText="Cancel"
          onConfirm={() => { setDeleteModal(false); deleteSelf(); }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorProfile;
