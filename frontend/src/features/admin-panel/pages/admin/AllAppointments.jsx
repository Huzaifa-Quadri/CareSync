import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, Hourglass, CreditCard, Banknote } from "lucide-react";
import { AdminContext } from "../../context/admin.context";
import { AppContext } from "@shared/context/app.context";
import { Bento } from "@shared/components/Bento";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { currencySymbol, calculateAge, formatDateString } = useContext(AppContext);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  const list = [...appointments].reverse().filter((a) => {
    if (filter === "completed") return a.isCompleted;
    if (filter === "cancelled") return a.cancelled;
    if (filter === "upcoming") return !a.cancelled && !a.isCompleted;
    return true;
  });

  const total = appointments.length;
  const upcoming = appointments.filter((a) => !a.cancelled && !a.isCompleted).length;
  const completed = appointments.filter((a) => a.isCompleted).length;

  return (
    <div className="pt-2">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Admin · Schedule</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
          All <span className="italic text-accent3">appointments.</span>
        </h1>
      </div>

      <Bento.Grid cols={3} className="mb-6">
        <Bento.Tile size="1x1" accent="elevated" className="p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Total</p>
          <p className="font-display text-4xl mt-1">{total}</p>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="accent" className="p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Upcoming</p>
          <p className="font-display text-4xl mt-1">{upcoming}</p>
        </Bento.Tile>
        <Bento.Tile size="1x1" accent="accent3" className="p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Completed</p>
          <p className="font-display text-4xl mt-1">{completed}</p>
        </Bento.Tile>
      </Bento.Grid>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${filter === f.id ? "border-transparent" : "border-line hover:bg-elevated"}`}
          >
            {filter === f.id && (
              <motion.span
                layoutId="admin-appt-filter"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-ink"
              />
            )}
            <span className={`relative z-10 ${filter === f.id ? "text-canvas font-medium" : "text-ink"}`}>{f.label}</span>
          </button>
        ))}
      </div>

      <Bento.Tile size="full" className="p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-[60px_2fr_60px_1.5fr_2fr_80px_120px_60px] gap-3 px-5 py-3 border-b border-line text-[10px] font-mono uppercase tracking-widest text-muted">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date · time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Pay</p>
          <p className="text-right">Act</p>
        </div>
        {list.map((item, i) => {
          const status = item.cancelled ? "cancelled" : item.isCompleted ? "completed" : "upcoming";
          return (
            <motion.div
              key={item._id}
              whileHover={{ backgroundColor: "var(--bg-elevated)" }}
              className="grid grid-cols-1 md:grid-cols-[60px_2fr_60px_1.5fr_2fr_80px_120px_60px] gap-3 items-center px-5 py-3 border-b border-line last:border-0"
            >
              <p className="hidden md:block text-xs font-mono text-muted">{String(i + 1).padStart(2, "0")}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="h-9 w-9 rounded-full object-cover" />
                <p className="text-sm truncate">{item.userData.name}</p>
              </div>
              <p className="hidden md:block text-sm text-muted">{calculateAge(item.userData.dob)}</p>
              <p className="text-xs text-muted">{formatDateString(item.slotDate)} · {item.slotTime}</p>
              <div className="flex items-center gap-2">
                <img src={item.docData.image} alt="" className="h-9 w-9 rounded-2xl object-cover object-top bg-accent" />
                <p className="text-sm truncate">{item.docData.name}</p>
              </div>
              <p className="text-sm font-mono">{currencySymbol}{item.docData.fees}</p>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest w-fit ${
                  item.payment ? "bg-accent3 text-accent3-ink" : "bg-elevated text-muted"
                }`}
              >
                {item.payment ? <CreditCard size={11} /> : <Banknote size={11} />}
                {item.payment ? "Online" : "Cash"}
              </span>
              <div className="flex justify-end">
                {status === "cancelled" ? (
                  <X size={16} className="text-accent2" />
                ) : status === "completed" ? (
                  <CheckCircle2 size={16} className="text-accent3" />
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent2 hover:text-(--accent2-ink) transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </Bento.Tile>
    </div>
  );
};

export default AllAppointments;
