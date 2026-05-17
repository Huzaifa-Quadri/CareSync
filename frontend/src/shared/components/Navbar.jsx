import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, User, CalendarCheck, LogOut } from "lucide-react";
import { AuthContext } from "@features/auth/context/auth.context";
import ThemeToggle from "@shared/components/ThemeToggle";
import { assets } from "@assets/frontend/assets";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Doctors", path: "/doctors" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const logoutFunc = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-canvas/70 border-b border-line">
      <div className="flex items-center justify-between gap-4 py-3 px-4 md:px-8">
        <Link to="/" className="shrink-0">
          <img className="h-9" src={assets.logo} alt="CareSync" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((nav) => (
            <NavLink key={nav.path} to={nav.path} end={nav.path === "/"}>
              {({ isActive }) => (
                <div className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider">
                  <span className={isActive ? "text-ink" : "text-muted hover:text-ink transition-colors"}>
                    {nav.title}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-elevated"
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {token && userData ? (
            <div ref={profileRef} className="relative">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-line bg-surface pl-1 pr-3 py-1 hover:border-accent transition-colors"
              >
                {userData.image ? (
                  <img src={userData.image} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="h-7 w-7 rounded-full bg-accent text-accent-ink grid place-items-center">
                    <User size={14} />
                  </span>
                )}
                <ChevronDown size={14} className="text-muted" />
              </motion.button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 rounded-3xl border border-line bg-surface p-2 shadow-2xl z-50"
                  >
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-elevated"
                    >
                      <User size={16} className="text-muted" /> Profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/my-appointments");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-elevated"
                    >
                      <CalendarCheck size={16} className="text-muted" /> My Appointments
                    </button>
                    <button
                      onClick={logoutFunc}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-ink hover:bg-elevated"
                    >
                      <LogOut size={16} className="text-muted" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              className="hidden md:inline-flex items-center rounded-full bg-ink text-canvas px-5 py-2 text-sm font-medium"
            >
              Sign in
            </motion.button>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden h-9 w-9 rounded-full grid place-items-center bg-surface border border-line"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <img className="h-9" src={assets.logo} alt="" />
              <button
                onClick={() => setMobileOpen(false)}
                className="h-10 w-10 rounded-full grid place-items-center bg-surface border border-line"
              >
                <X size={18} />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="flex flex-col gap-3 p-6"
            >
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.path}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <NavLink
                    to={nav.path}
                    end={nav.path === "/"}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-4xl text-ink"
                  >
                    {nav.title}
                  </NavLink>
                </motion.li>
              ))}
              {!token && (
                <motion.li variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="mt-4 rounded-full bg-ink text-canvas px-6 py-3 font-medium"
                  >
                    Sign in
                  </button>
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
