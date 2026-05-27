import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  UserPlus,
  Users,
  Stethoscope,
  UserCog,
} from "lucide-react";
import { AdminContext } from "../context/admin.context";
import { DoctorContext } from "../context/doctor.context";

const adminNavLinks = [
  { to: "/admin/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/all-appointments", Icon: CalendarDays, label: "Appointments" },
  { to: "/admin/add-doctor", Icon: UserPlus, label: "Add Doctor" },
  { to: "/admin/doctors-list", Icon: Users, label: "Doctors" },
];

const doctorNavLinks = [
  { to: "/doctor/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { to: "/doctor/appointments", Icon: CalendarDays, label: "Appointments" },
  { to: "/doctor/profile", Icon: UserCog, label: "Profile" },
];

const Sidebar = ({ role = "admin" }) => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const isAdmin = role === "admin" && aToken;
  const links = isAdmin ? adminNavLinks : doctorNavLinks;

  if (!aToken && !dToken) return null;

  return (
    <aside className="sticky top-20 mt-4 w-[64px] md:w-60 shrink-0 bento-tile p-2 md:p-3 self-start">
      <p className="hidden md:block px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted">
        / / / {isAdmin ? "Admin" : "Doctor"}
      </p>
      <nav className="space-y-1">
        {links.map(({ to, Icon, label }) => (
          <NavLink key={to} to={to} className="block">
            {({ isActive }) => (
              <div className="relative isolate flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm">
                {isActive && (
                  <motion.span
                    layoutId={`sidebar-${role}-active`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-2xl bg-accent"
                  />
                )}
                <Icon
                  size={18}
                  className={isActive ? "text-accent-ink" : "text-muted"}
                />
                <span
                  className={`hidden md:inline ${
                    isActive ? "text-accent-ink font-medium" : "text-ink"
                  }`}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
