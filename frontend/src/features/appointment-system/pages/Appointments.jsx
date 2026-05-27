import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock, MapPin, CreditCard, XCircle, CheckCircle2, Hourglass } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "@features/auth/context/auth.context";
import { AppointmentContext } from "../context/appointment.context";
import { AppContext } from "@shared/context/app.context";
import * as appointmentApi from "../service/appointment.api";
import ConfirmModal from "../components/ConfirmModal";
import { Bento } from "@shared/components/Bento";
import { staggerContainer, bentoTileEnter } from "@shared/lib/motion";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const formatDateString = (dateStr) => {
  const [d, m, y] = dateStr.split("_");
  return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Appointments = () => {
  const { token } = useContext(AuthContext);
  const { getDoctorsData } = useContext(AppointmentContext);
  const { currencySymbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);

  const load = async () => {
    try {
      const { data } = await appointmentApi.getUserAppointments(token);
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to fetch appointments");
    }
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const cancel = async (id) => {
    try {
      const { data } = await appointmentApi.cancelUserAppointment(id, token);
      if (data.success) {
        toast.success(data.message || "Cancelled");
        load();
        getDoctorsData();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to cancel");
    }
  };

  const pay = async (id) => {
    try {
      const { data } = await appointmentApi.makePayment(id, token);
      if (data.success) {
        toast.success(data.message || "Paid");
        load();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to pay");
    }
  };

  const filtered = appointments.filter((a) => {
    if (filter === "completed") return a.isCompleted;
    if (filter === "cancelled") return a.cancelled;
    if (filter === "upcoming") return !a.cancelled && !a.isCompleted;
    return true;
  });

  const selected = modal && appointments.find((a) => a._id === modal.id);

  const statusOf = (a) => {
    if (a.cancelled) return { label: "Cancelled", accent: "accent2", Icon: XCircle };
    if (a.isCompleted) return { label: "Completed", accent: "accent3", Icon: CheckCircle2 };
    return { label: "Upcoming", accent: "accent", Icon: Hourglass };
  };

  return (
    <div className="pt-6">
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
          / / / Schedule · {appointments.length} total
        </p>
        <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
          My <span className="italic text-accent3">appointments.</span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${filter === f.id ? "border-transparent" : "border-line hover:bg-elevated"}`}
          >
            {filter === f.id && (
              <motion.span
                layoutId="appt-filter"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-ink"
              />
            )}
            <span className={`relative z-10 ${filter === f.id ? "text-canvas font-medium" : "text-ink"}`}>{f.label}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Bento.Tile size="full" className="p-10 text-center">
          <CalendarClock size={36} className="mx-auto text-muted" />
          <p className="mt-4 font-display text-2xl">No appointments yet.</p>
          <p className="mt-2 text-sm text-muted">Browse our doctors and book your first visit.</p>
        </Bento.Tile>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((a) => {
              const s = statusOf(a);
              return (
                <motion.div
                  key={a._id}
                  layout
                  variants={bentoTileEnter}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="bento-tile p-5 flex gap-4"
                >
                  <img
                    src={a.docData.image}
                    alt=""
                    className="h-28 w-24 rounded-2xl object-cover object-top shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
                          {a.docData.speciality}
                        </p>
                        <p className="font-display text-lg mt-0.5 text-ink truncate">{a.docData.name}</p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 rounded-full bg-${s.accent} text-${s.accent}-ink px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest`}>
                        <s.Icon size={11} />
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted flex items-center gap-1.5">
                      <CalendarClock size={12} />
                      {formatDateString(a.slotDate)} · {a.slotTime}
                    </p>
                    <p className="mt-1 text-xs text-muted flex items-start gap-1.5">
                      <MapPin size={12} className="mt-0.5 shrink-0" />
                      <span className="truncate">{a.docData.address.line1}, {a.docData.address.line2}</span>
                    </p>

                    {!a.cancelled && !a.isCompleted && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {!a.payment && (
                          <button
                            onClick={() => setModal({ type: "payment", id: a._id })}
                            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-canvas px-3 py-1.5 text-xs"
                          >
                            <CreditCard size={12} /> Pay
                          </button>
                        )}
                        {a.payment && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent3 text-accent3-ink px-3 py-1.5 text-xs">
                            <CheckCircle2 size={12} /> Paid
                          </span>
                        )}
                        <button
                          onClick={() => setModal({ type: "cancel", id: a._id })}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs"
                        >
                          <XCircle size={12} /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {modal && selected && (
        <ConfirmModal
          title={modal.type === "payment" ? "Confirm Payment" : "Cancel Appointment"}
          message={
            modal.type === "payment"
              ? `Pay ${currencySymbol}${selected.docData.fees} for this visit?`
              : "Are you sure you want to cancel this appointment?"
          }
          confirmText={modal.type === "payment" ? "Pay now" : "Yes, cancel"}
          cancelText={modal.type === "payment" ? "Cancel" : "Keep it"}
          onConfirm={() => {
            modal.type === "payment" ? pay(modal.id) : cancel(modal.id);
            setModal(null);
          }}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default Appointments;
