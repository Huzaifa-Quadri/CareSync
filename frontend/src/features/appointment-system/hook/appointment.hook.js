import { useContext } from "react";
import { AppointmentContext } from "../context/appointment.context";

export const useAppointment = () => useContext(AppointmentContext);
