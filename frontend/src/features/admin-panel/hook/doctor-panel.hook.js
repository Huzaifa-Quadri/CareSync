import { useContext } from "react";
import { DoctorContext } from "../context/doctor.context";

export const useDoctor = () => useContext(DoctorContext);
