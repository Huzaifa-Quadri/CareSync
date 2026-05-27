import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Info, Clock, CalendarDays, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { AppointmentContext } from "../context/appointment.context";
import { AuthContext } from "@features/auth/context/auth.context";
import { AppContext } from "@shared/context/app.context";
import RelatedDoctors from "../components/RelatedDoctors";
import { Bento } from "@shared/components/Bento";
import * as appointmentApi from "../service/appointment.api";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, getDoctorsData } = useContext(AppointmentContext);
  const { token } = useContext(AuthContext);
  const { currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    setDocInfo(doctors.find((d) => d._id === docId));
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;
    setDocSlots([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let slotDateObj = new Date(currentDate);
      slotDateObj.setHours(10, 0, 0, 0);
      let endTime = new Date(currentDate);
      endTime.setHours(20, 30, 0, 0);

      if (i === 0) {
        const now = new Date();
        const start = new Date(currentDate);
        start.setHours(10, 0, 0, 0);
        const nextSlot = new Date(now);
        nextSlot.setMinutes(now.getMinutes() > 30 ? 0 : 30);
        nextSlot.setHours(now.getMinutes() > 30 ? now.getHours() + 1 : now.getHours());
        nextSlot.setSeconds(0, 0);
        const startFrom = nextSlot > start ? nextSlot : start;
        if (startFrom > endTime) continue;
        slotDateObj = new Date(startFrom);
      }
      const timeSlots = [];
      while (slotDateObj <= endTime) {
        const formattedTime = slotDateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const key = `${slotDateObj.getDate()}_${slotDateObj.getMonth() + 1}_${slotDateObj.getFullYear()}`;
        const isBooked = docInfo?.slots_booked?.[key]?.includes(formattedTime);
        if (!isBooked) timeSlots.push({ datetime: new Date(slotDateObj), time: formattedTime });
        slotDateObj.setMinutes(slotDateObj.getMinutes() + 30);
      }
      if (timeSlots.length > 0) setDocSlots((prev) => [...prev, timeSlots]);
    }
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    if (!slotTime) return toast.warn("Pick a time slot first");
    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const { data } = await appointmentApi.bookAppointment(docId, slotDate, slotTime, token);
      if (data.success) {
        toast.success(data.message || "Appointment booked");
        getDoctorsData();
        navigate("/my-appointments");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book");
    }
  };

  if (!docInfo) return null;

  return (
    <div className="pt-6">
      {/* Doctor hero bento */}
      <Bento.Grid cols={4}>
        <Bento.Tile size="2x2" className="p-0 overflow-hidden min-h-[420px] bg-accent">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full object-cover object-top"
          />
        </Bento.Tile>
        <Bento.Tile size="2x2" className="p-7 md:p-9 flex flex-col justify-between min-h-[420px]">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              / / / {docInfo.speciality}
            </p>
            <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[0.95] flex items-start gap-2">
              {docInfo.name}
              <BadgeCheck size={20} className="text-accent3 mt-2 shrink-0" />
            </h1>
            <p className="mt-3 text-sm text-muted">
              {docInfo.degree} · {docInfo.experience} experience
            </p>
            <div className="mt-6">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted">
                <Info size={12} /> About
              </p>
              <p className="mt-2 text-sm text-ink leading-relaxed">{docInfo.about}</p>
            </div>
          </div>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Fee</span>
            <span className="font-display text-3xl text-ink">
              {currencySymbol}{docInfo.fees}
            </span>
          </div>
        </Bento.Tile>
      </Bento.Grid>

      {docInfo.available ? (
        <>
          {/* Calendar */}
          <section className="mt-6">
            <Bento.Tile size="full" className="p-6">
              <p className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted">
                <CalendarDays size={12} /> Pick a date
              </p>
              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {docSlots.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSlotIndex(i)}
                    className={`relative shrink-0 px-5 py-3 rounded-2xl text-center border min-w-17 transition-colors ${slotIndex === i ? "border-transparent" : "border-line hover:bg-elevated"}`}
                  >
                    {slotIndex === i && (
                      <motion.span
                        layoutId="day-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-2xl bg-ink"
                      />
                    )}
                    <p className={`relative z-10 text-[10px] font-mono uppercase tracking-widest ${slotIndex === i ? "text-canvas" : "text-muted"}`}>
                      {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                    </p>
                    <p className={`relative z-10 font-display text-2xl mt-1 ${slotIndex === i ? "text-canvas" : "text-ink"}`}>
                      {item[0] && item[0].datetime.getDate()}
                    </p>
                  </button>
                ))}
              </div>
            </Bento.Tile>
          </section>

          {/* Time slots */}
          <section className="mt-4">
            <Bento.Tile size="full" className="p-6">
              <p className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted">
                <Clock size={12} /> Pick a time
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {docSlots[slotIndex]?.map((item, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSlotTime(item.time)}
                    className={`relative px-4 py-2 rounded-full text-sm border border-line ${
                      item.time === slotTime ? "bg-accent text-accent-ink border-accent" : "bg-surface text-ink"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-muted">
                  {slotTime
                    ? <>You're booking <span className="text-ink font-medium">{docSlots[slotIndex]?.[0]?.datetime.toDateString()} · {slotTime}</span></>
                    : "Select a slot to continue."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={bookAppointment}
                  disabled={!slotTime}
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-7 py-3 font-medium disabled:opacity-50"
                >
                  <CheckCircle2 size={16} /> Confirm booking
                </motion.button>
              </div>
            </Bento.Tile>
          </section>
        </>
      ) : (
        <Bento.Tile size="full" accent="accent2" className="mt-6 p-6 flex items-center gap-3">
          <AlertTriangle size={18} />
          <p className="font-medium">
            {docInfo.name} is unavailable. Browse other top-rated doctors below.
          </p>
        </Bento.Tile>
      )}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
