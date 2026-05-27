import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Stethoscope, CalendarDays, Users, X, CheckCircle2 } from "lucide-react";
import { AdminContext } from "../../context/admin.context";
import { AppContext } from "@shared/context/app.context";
import { Bento } from "@shared/components/Bento";
import NumberTicker from "@shared/components/NumberTicker";

const Dashboard = () => {
  const { aToken, cancelAppointment, dashData, getDashData } = useContext(AdminContext);
  const { formatDateString } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  if (!dashData) return null;

  return (
    <div className="pt-2">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
          / / / Admin · Overview
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
          Dashboard.
        </h1>
      </div>

      <Bento.Grid cols={4}>
        <Bento.Tile size="2x1" accent="accent" className="p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Doctors</p>
            <p className="font-display text-5xl mt-2"><NumberTicker value={dashData.doctors} /></p>
          </div>
          <Stethoscope size={48} strokeWidth={1.4} />
        </Bento.Tile>
        <Bento.Tile size="2x1" accent="accent2" className="p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Appointments</p>
            <p className="font-display text-5xl mt-2"><NumberTicker value={dashData.appointments} /></p>
          </div>
          <CalendarDays size={48} strokeWidth={1.4} />
        </Bento.Tile>
        <Bento.Tile size="4x1" accent="accent3" className="p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Patients</p>
            <p className="font-display text-5xl mt-2"><NumberTicker value={dashData.patients} /></p>
          </div>
          <Users size={56} strokeWidth={1.4} />
        </Bento.Tile>

        <Bento.Tile size="full" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted">/ Recent</p>
              <p className="font-display text-2xl mt-0.5">Latest appointments</p>
            </div>
          </div>
          <ul>
            {dashData.latestAppointments.map((item) => (
              <motion.li
                key={item._id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 px-6 py-4 border-b border-line last:border-0"
              >
                <img
                  src={item.docData.image}
                  alt=""
                  className="h-12 w-12 rounded-2xl object-cover object-top"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{item.docData.name}</p>
                  <p className="text-xs text-muted">{formatDateString(item.slotDate)} · {item.slotTime}</p>
                </div>
                {item.cancelled ? (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent2 inline-flex items-center gap-1">
                    <X size={12} /> Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent3 inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> Done
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent2 hover:text-(--accent2-ink) transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default Dashboard;
