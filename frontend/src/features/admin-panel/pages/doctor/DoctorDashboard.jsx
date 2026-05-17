import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, CalendarDays, Users, X, Check } from "lucide-react";
import { DoctorContext } from "../../context/doctor.context";
import { AppContext } from "@shared/context/app.context";
import { Bento } from "@shared/components/Bento";
import NumberTicker from "@shared/components/NumberTicker";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currencySymbol, formatDateString } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="pt-2">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">/ / / Doctor · Today</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">Welcome back.</h1>
      </div>

      <Bento.Grid cols={4}>
        <Bento.Tile size="2x2" accent="accent3" className="p-7 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Total earnings</p>
              <p className="font-display text-6xl mt-2 leading-none">
                {currencySymbol}<NumberTicker value={dashData.earning} />
              </p>
            </div>
            <Wallet size={36} strokeWidth={1.4} />
          </div>
          <p className="text-xs opacity-70 mt-4">
            From completed and paid appointments — keep up the great work.
          </p>
        </Bento.Tile>

        <Bento.Tile size="2x1" accent="accent" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Appointments</p>
            <p className="font-display text-4xl mt-1"><NumberTicker value={dashData.appointments} /></p>
          </div>
          <CalendarDays size={36} strokeWidth={1.4} />
        </Bento.Tile>

        <Bento.Tile size="2x1" accent="accent2" className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-80">Patients</p>
            <p className="font-display text-4xl mt-1"><NumberTicker value={dashData.patients} /></p>
          </div>
          <Users size={36} strokeWidth={1.4} />
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
                <img src={item.userData.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{item.userData.name}</p>
                  <p className="text-xs text-muted">{formatDateString(item.slotDate)} · {item.slotTime}</p>
                </div>
                {item.cancelled ? (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent2 inline-flex items-center gap-1">
                    <X size={12} /> Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent3 inline-flex items-center gap-1">
                    <Check size={12} /> Done
                  </span>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent2 hover:text-accent2-ink"
                    >
                      <X size={14} />
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent3 hover:text-accent3-ink"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </Bento.Tile>
      </Bento.Grid>
    </div>
  );
};

export default DoctorDashboard;
