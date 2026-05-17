import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Upload, UserPlus, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/admin.context";
import * as adminApi from "../../service/admin.api";
import { Bento } from "@shared/components/Bento";

const specialities = ["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"];

const Input = ({ label, ...props }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{label}</span>
    <input
      className="rounded-2xl bg-elevated border border-line px-4 py-2.5 focus:border-accent"
      {...props}
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{label}</span>
    <select
      className="rounded-2xl bg-elevated border border-line px-4 py-2.5 focus:border-accent"
      {...props}
    >
      {children}
    </select>
  </label>
);

const AddDoctor = () => {
  const { aToken } = useContext(AdminContext);
  const [docImg, setDocImg] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", password: "", experience: "",
    fees: "", speciality: "", degree: "", address1: "", address2: "", about: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!docImg) return toast.error("Upload a doctor image first.");
    try {
      const fd = new FormData();
      fd.append("image", docImg);
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("experience", form.experience);
      fd.append("fees", Number(form.fees));
      fd.append("about", form.about);
      fd.append("speciality", form.speciality);
      fd.append("degree", form.degree);
      fd.append("address", JSON.stringify({ line1: form.address1, line2: form.address2 }));
      const { data } = await adminApi.addDoctor(fd, aToken);
      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setForm({ name: "", email: "", password: "", experience: "", fees: "", speciality: "", degree: "", address1: "", address2: "", about: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmit} className="pt-2">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Admin · Onboard</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
          Add a <span className="italic text-accent3">doctor.</span>
        </h1>
      </div>

      <Bento.Grid cols={4}>
        {/* Image upload */}
        <Bento.Tile size="2x2" accent="elevated" className="p-7 flex flex-col items-center justify-center text-center min-h-[280px]">
          <label htmlFor="doc-img" className="cursor-pointer">
            {docImg ? (
              <img
                src={URL.createObjectURL(docImg)}
                alt=""
                className="h-44 w-44 rounded-3xl object-cover object-top mx-auto"
              />
            ) : (
              <div className="h-44 w-44 rounded-3xl bg-surface border-2 border-dashed border-line grid place-items-center mx-auto">
                <Upload size={32} className="text-muted" />
              </div>
            )}
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} accept="image/*" />
          <p className="mt-4 font-display text-lg">{docImg ? "Looks great" : "Drop a portrait"}</p>
          <p className="text-xs text-muted mt-1">PNG or JPG · square preferred</p>
        </Bento.Tile>

        {/* Identity */}
        <Bento.Tile size="2x2" className="p-6 flex flex-col gap-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Identity</p>
          <Input label="Full name" value={form.name} onChange={set("name")} required />
          <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
          <Input label="Password" type="password" value={form.password} onChange={set("password")} required />
        </Bento.Tile>

        {/* Speciality */}
        <Bento.Tile size="2x1" accent="accent" className="p-5 flex flex-col gap-2">
          <Select label="Speciality" value={form.speciality} onChange={set("speciality")} required>
            <option value="">Pick one</option>
            {specialities.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="accent3" className="p-5 flex flex-col gap-2">
          <Select label="Experience" value={form.experience} onChange={set("experience")} required>
            <option value="">Years</option>
            {[1,2,3,4,5,6,7,8,9,10].map((y) => <option key={y} value={`${y} ${y === 1 ? "year" : "years"}`}>{y}</option>)}
          </Select>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="accent2" className="p-5 flex flex-col gap-2">
          <Input label="Fee ($)" type="number" value={form.fees} onChange={set("fees")} required />
        </Bento.Tile>

        <Bento.Tile size="2x1" className="p-5 flex flex-col gap-2">
          <Input label="Education" value={form.degree} onChange={set("degree")} required />
        </Bento.Tile>
        <Bento.Tile size="2x1" className="p-5 flex flex-col gap-3">
          <Input label="Address line 1" value={form.address1} onChange={set("address1")} required />
          <Input label="Address line 2" value={form.address2} onChange={set("address2")} />
        </Bento.Tile>

        <Bento.Tile size="full" className="p-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">/ About</span>
            <textarea
              rows={5}
              value={form.about}
              onChange={set("about")}
              placeholder="Brief bio, areas of expertise, approach to care…"
              required
              className="rounded-2xl bg-elevated border border-line px-4 py-3 focus:border-accent resize-none"
            />
          </label>
        </Bento.Tile>

        <Bento.Tile size="full" accent="ink" className="p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">/ Submit</p>
            <p className="font-display text-2xl mt-1">Add new doctor to the registry</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-7 py-3.5 font-medium"
          >
            <UserPlus size={16} /> Add doctor <ArrowRight size={14} />
          </motion.button>
        </Bento.Tile>
      </Bento.Grid>
    </form>
  );
};

export default AddDoctor;
