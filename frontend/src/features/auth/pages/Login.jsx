import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth.context";
import * as authApi from "../service/auth.api";

const tabs = [
  { id: "Login", label: "Sign in" },
  { id: "Sign Up", label: "Create" },
];

const Login = () => {
  const { setToken, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tab === "Sign Up") {
        const { data } = await authApi.registerUser(name, email, password);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Welcome to CareSync.");
        } else toast.error(data.message);
      } else {
        const { data } = await authApi.loginUser(email, password);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Signed in.");
        } else toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] grid lg:grid-cols-5 gap-6 py-6">
      {/* Brand side */}
      <div className="bento-tile relative lg:col-span-3 p-8 md:p-12 overflow-hidden bg-ink text-canvas flex flex-col justify-between min-h-[420px]">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent opacity-40 blur-3xl animate-blob"
        />
        <div
          className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent3 opacity-30 blur-3xl animate-blob"
          style={{ animationDelay: "6s" }}
        />
        <div className="relative z-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">/ / / CareSync</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[0.9]">
            Welcome <span className="italic text-accent">back.</span>
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            Sign in to book trusted specialists, manage your appointments and keep your medical history one tap away.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-sm opacity-80">
          <ShieldCheck size={16} className="text-accent" />
          Secured · GDPR compliant · End-to-end encrypted
        </div>
      </div>

      {/* Form side */}
      <div className="bento-tile lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-1 mb-6 self-start rounded-full bg-elevated p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="relative isolate px-5 py-2 rounded-full text-sm"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="auth-tab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                />
              )}
              <span className={tab === t.id ? "text-canvas font-medium" : "text-ink"}>{t.label}</span>
            </button>
          ))}
        </div>

        <h2 className="font-display text-3xl leading-tight">
          {tab === "Sign Up" ? "Create your account." : "Sign in to your account."}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {tab === "Sign Up" ? "60-second sign-up, lifetime access." : "Use your email and password."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
          {tab === "Sign Up" && (
            <label className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-elevated border border-line focus:border-accent"
              />
            </label>
          )}
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
            {tab === "Sign Up" ? "Create account" : "Sign in"}
            <ArrowRight size={16} />
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-muted text-center">
          {tab === "Sign Up" ? "Already have an account? " : "New to CareSync? "}
          <button
            onClick={() => setTab(tab === "Sign Up" ? "Login" : "Sign Up")}
            className="text-ink underline hover:text-accent3"
          >
            {tab === "Sign Up" ? "Sign in" : "Create one"}
          </button>
        </p>
        <p className="mt-3 text-xs text-muted text-center">
          Doctor or admin?{" "}
          <Link to="/admin-login" className="text-accent3 underline">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
