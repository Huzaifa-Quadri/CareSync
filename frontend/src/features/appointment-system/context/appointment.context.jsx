import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as appointmentApi from "../service/appointment.api";

export const AppointmentContext = createContext();

export const AppointmentContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await appointmentApi.fetchDoctors();
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch doctors");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = { doctors, getDoctorsData };
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
