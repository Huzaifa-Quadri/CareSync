import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Mail, Phone, MapPin, User, Cake, Pencil, Save } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "@features/auth/context/auth.context";
import * as appointmentApi from "../service/appointment.api";
import { Bento } from "@shared/components/Bento";

const Field = ({ icon: Icon, label, children, accent = "surface" }) => (
  <Bento.Tile size="1x1" accent={accent} className="p-5 flex flex-col gap-2">
    <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-70">
      <Icon size={11} /> {label}
    </p>
    <div className="text-base mt-1">{children}</div>
  </Bento.Tile>
);

const Profile = () => {
  const { userData, setUserData, token, loadUserProfileData } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  if (!userData) return null;

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);
      const { data } = await appointmentApi.updateUserProfile(formData, token);
      if (data.success) {
        toast.success(data.message || "Profile updated");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="pt-6">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Account</p>
          <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
            Your <span className="italic text-accent3">profile.</span>
          </h1>
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
        <Bento.Tile size="2x2" className="p-6 flex flex-col gap-4">
          {isEdit ? (
            <label htmlFor="image" className="relative inline-block cursor-pointer w-fit">
              <img
                className="w-44 h-44 rounded-3xl object-cover"
                src={image ? URL.createObjectURL(image) : userData.image || ""}
                alt=""
              />
              <span className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-ink text-canvas grid place-items-center">
                <Upload size={14} />
              </span>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : userData.image ? (
            <img className="w-44 h-44 rounded-3xl object-cover" src={userData.image} alt="" />
          ) : (
            <div className="w-44 h-44 rounded-3xl bg-accent grid place-items-center text-accent-ink">
              <User size={48} />
            </div>
          )}
          {isEdit ? (
            <input
              className="font-display text-3xl leading-tight text-ink bg-elevated rounded-2xl px-3 py-2"
              value={userData.name}
              onChange={(e) => setUserData((p) => ({ ...p, name: e.target.value }))}
            />
          ) : (
            <p className="font-display text-3xl leading-tight">{userData.name}</p>
          )}
          <p className="text-sm text-muted">{userData.email}</p>
        </Bento.Tile>

        <Field icon={Mail} label="Email">
          <p className="text-ink break-all">{userData.email}</p>
        </Field>

        <Field icon={Phone} label="Phone" accent="elevated">
          {isEdit ? (
            <input
              className="w-full bg-surface rounded-xl px-3 py-2 border border-line"
              value={userData.phone}
              onChange={(e) => setUserData((p) => ({ ...p, phone: e.target.value }))}
            />
          ) : (
            <p>{userData.phone || "—"}</p>
          )}
        </Field>

        <Field icon={User} label="Gender">
          {isEdit ? (
            <select
              className="w-full bg-elevated rounded-xl px-3 py-2 border border-line"
              value={userData.gender}
              onChange={(e) => setUserData((p) => ({ ...p, gender: e.target.value }))}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </Field>

        <Field icon={Cake} label="Birthday" accent="elevated">
          {isEdit ? (
            <input
              type="date"
              className="w-full bg-surface rounded-xl px-3 py-2 border border-line"
              value={userData.dob}
              onChange={(e) => setUserData((p) => ({ ...p, dob: e.target.value }))}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </Field>

        <Bento.Tile size="2x1" className="p-5">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted">
            <MapPin size={11} /> Address
          </p>
          {isEdit ? (
            <div className="mt-2 space-y-2">
              <input
                className="w-full bg-elevated rounded-xl px-3 py-2 border border-line"
                value={userData.address.line1}
                placeholder="Address line 1"
                onChange={(e) =>
                  setUserData((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))
                }
              />
              <input
                className="w-full bg-elevated rounded-xl px-3 py-2 border border-line"
                value={userData.address.line2}
                placeholder="Address line 2"
                onChange={(e) =>
                  setUserData((p) => ({ ...p, address: { ...p.address, line2: e.target.value } }))
                }
              />
            </div>
          ) : (
            <p className="mt-2 text-ink">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default Profile;
