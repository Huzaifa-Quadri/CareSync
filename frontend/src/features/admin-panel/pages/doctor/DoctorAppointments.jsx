import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { DoctorContext } from "../../context/doctor.context";
import { AppContext } from "@shared/context/app.context";
import { Bento } from "@shared/components/Bento";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { currencySymbol, calculateAge, formatDateString } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="pt-2">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
          / / / Doctor · Schedule · {appointments.length} total
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-[0.95]">
          My <span className="italic text-accent3">appointments.</span>
        </h1>
      </div>

      <Bento.Tile size="full" className="p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-[60px_2fr_120px_60px_2fr_80px_100px] gap-3 px-5 py-3 border-b border-line text-[10px] font-mono uppercase tracking-widest text-muted">
          <p>#</p>
          <p>Patient</p>
          <p>Pay</p>
          <p>Age</p>
          <p>Date · time</p>
          <p>Fees</p>
          <p className="text-right">Action</p>
        </div>
        {appointments.map((item, i) => (
          <motion.div
            key={item._id}
            whileHover={{ backgroundColor: "var(--bg-elevated)" }}
            className="grid grid-cols-1 md:grid-cols-[60px_2fr_120px_60px_2fr_80px_100px] gap-3 items-center px-5 py-3 border-b border-line last:border-0"
          >
            <p className="hidden md:block text-xs font-mono text-muted">{String(i + 1).padStart(2, "0")}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="" className="h-9 w-9 rounded-full object-cover" />
              <p className="text-sm truncate">{item.userData.name}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest w-fit ${
                item.payment ? "bg-accent3 text-accent3-ink" : "bg-elevated text-muted"
              }`}
            >
              {item.payment ? <CreditCard size={11} /> : <Banknote size={11} />}
              {item.payment ? "Online" : "Cash"}
            </span>
            <p className="hidden md:block text-sm text-muted">{calculateAge(item.userData.dob)}</p>
            <p className="text-xs text-muted">{formatDateString(item.slotDate)} · {item.slotTime}</p>
            <p className="text-sm font-mono">{currencySymbol}{item.amount}</p>
            <div className="flex justify-end gap-1">
              {item.cancelled ? (
                <span className="text-xs font-mono uppercase tracking-widest text-accent2 inline-flex items-center gap-1">
                  <X size={12} /> Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-xs font-mono uppercase tracking-widest text-accent3 inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> Done
                </span>
              ) : (
                <>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent2 hover:text-(--accent2-ink) transition-colors"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="h-8 w-8 rounded-full grid place-items-center bg-elevated hover:bg-accent3 hover:text-(--accent3-ink) transition-colors"
                  >
                    <Check size={14} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </Bento.Tile>
    </div>
  );
};

export default DoctorAppointments;
