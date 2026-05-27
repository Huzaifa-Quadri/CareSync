import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";
import { AdminContext } from "@features/admin-panel/context/admin.context";
import { DoctorContext } from "@features/admin-panel/context/doctor.context";
import * as authApi from "../service/auth.api";
import GradientBlobs from "@shared/components/GradientBlobs";

const roles = [
  { id: "Admin", label: "Admin", Icon: ShieldCheck },
  { id: "Doctor", label: "Doctor", Icon: Stethoscope },
];

const AdminLogin = () => {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "Admin") {
        const { data } = await authApi.loginAdmin(email, password);
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin signed in.");
        }
      } else {
        const { data } = await authApi.loginDoctor(email, password);
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor signed in.");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen relative bg-canvas px-4 py-8 grid place-items-center">
      <GradientBlobs density="dense" />
      <div className="bento-tile relative w-full max-w-md p-8 md:p-10 overflow-hidden">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">/ / / Staff portal</p>
        <h1 className="font-display text-4xl mt-2 leading-tight">
          {role === "Admin" ? "Admin" : "Doctor"} <span className="italic text-accent3">sign in.</span>
        </h1>

        <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-elevated p-1">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm"
            >
              {role === r.id && (
                <motion.span
                  layoutId="role-tab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                />
              )}
              <r.Icon size={14} className={`relative z-10 ${role === r.id ? "text-canvas" : "text-muted"}`} />
              <span className={`relative z-10 ${role === r.id ? "text-canvas font-medium" : "text-ink"}`}>{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
          <label className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-elevated border border-line focus:border-accent"
            />
          </label>
          <label className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-elevated border border-line focus:border-accent"
            />
          </label>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-canvas py-3.5 font-medium"
          >
            Sign in <ArrowRight size={16} />
          </motion.button>
        </form>

        <p className="mt-6 text-xs text-muted text-center">
          Patient?{" "}
          <Link to="/login" className="text-accent3 underline">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
