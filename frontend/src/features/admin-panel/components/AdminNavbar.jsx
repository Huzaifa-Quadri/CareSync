import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ShieldCheck, Stethoscope } from "lucide-react";
import { AdminContext } from "../context/admin.context";
import { DoctorContext } from "../context/doctor.context";
import ThemeToggle from "@shared/components/ThemeToggle";
import { assets } from "@assets/admin/assets";

const AdminNavbar = ({ role = "admin" }) => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const isAdmin = role === "admin" && !!aToken;

  const logoutHandler = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    setDToken("");
    localStorage.removeItem("dToken");
    navigate("/admin-login");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-canvas/70 border-b border-line">
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <img className="h-9" src={assets.admin_logo} alt="CareSync" />
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${
              isAdmin ? "bg-accent3 text-accent3-ink" : "bg-accent text-accent-ink"
            }`}
          >
            {isAdmin ? <ShieldCheck size={12} /> : <Stethoscope size={12} />}
            {isAdmin ? "Admin" : "Doctor"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={logoutHandler}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-4 py-2 text-sm font-medium"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
