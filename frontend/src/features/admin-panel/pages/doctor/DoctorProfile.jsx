import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, MapPin, DollarSign, BadgeCheck, Power } from "lucide-react";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/doctor.context";
import { AppContext } from "@shared/context/app.context";
import * as doctorPanelApi from "../../service/doctor-panel.api";
import { Bento } from "@shared/components/Bento";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

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

  if (!profileData) return null;

  return (
    <div className="pt-2">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
            / / / Doctor · Profile
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">Your profile.</h1>
        </div>
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

      <Bento.Grid cols={4}>
        <Bento.Tile size="2x2" accent="accent" className="p-0 overflow-hidden">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-full h-full object-cover object-top"
          />
        </Bento.Tile>

        <Bento.Tile size="2x2" className="p-7 md:p-8 flex flex-col justify-between min-h-[360px]">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
              / / / {profileData.speciality}
            </p>
            <h2 className="font-display text-4xl mt-2 leading-tight flex items-start gap-2">
              {profileData.name}
              <BadgeCheck size={20} className="text-accent3 mt-2 shrink-0" />
            </h2>
            <p className="mt-2 text-sm text-muted">
              {profileData.degree} · {profileData.experience}
            </p>
            <p className="mt-5 text-sm text-ink leading-relaxed">{profileData.about}</p>
          </div>
        </Bento.Tile>

        <Bento.Tile size="1x1" accent="accent3" className="p-5">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-80">
            <DollarSign size={11} /> Fee
          </p>
          {isEdit ? (
            <input
              type="number"
              value={profileData.fees}
              onChange={(e) => setProfileData((p) => ({ ...p, fees: e.target.value }))}
              className="mt-3 w-full bg-canvas/20 rounded-xl px-3 py-2 font-display text-3xl"
            />
          ) : (
            <p className="mt-3 font-display text-4xl">{currencySymbol}{profileData.fees}</p>
          )}
        </Bento.Tile>

        <Bento.Tile size="1x1" accent={profileData.available ? "accent" : "elevated"} className="p-5">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-80">
            <Power size={11} /> Status
          </p>
          <label className="mt-3 flex items-center gap-2 cursor-pointer">
            <span className="relative inline-flex h-6 w-11 items-center">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() => isEdit && setProfileData((p) => ({ ...p, available: !p.available }))}
                disabled={!isEdit}
                className="peer absolute h-full w-full opacity-0 cursor-pointer"
              />
              <span className="h-6 w-11 rounded-full bg-canvas/30 peer-checked:bg-canvas transition-colors" />
              <span className="absolute left-0.5 h-5 w-5 rounded-full bg-surface peer-checked:translate-x-5 transition-transform" />
            </span>
            <span className="font-display text-xl">{profileData.available ? "Available" : "Off"}</span>
          </label>
        </Bento.Tile>

        <Bento.Tile size="2x1" className="p-5">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted">
            <MapPin size={11} /> Address
          </p>
          {isEdit ? (
            <div className="mt-3 space-y-2">
              <input
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))
                }
                className="w-full bg-elevated rounded-xl px-3 py-2 border border-line"
              />
              <input
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((p) => ({ ...p, address: { ...p.address, line2: e.target.value } }))
                }
                className="w-full bg-elevated rounded-xl px-3 py-2 border border-line"
              />
            </div>
          ) : (
            <p className="mt-2 text-ink">
              {profileData.address.line1}
              <br />
              {profileData.address.line2}
            </p>
          )}
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default DoctorProfile;
