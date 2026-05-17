import { createContext, useState } from "react";
import { toast } from "react-toastify";
import * as doctorPanelApi from "../service/doctor-panel.api";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await doctorPanelApi.fetchDoctorAppointments(dToken);
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch appointments");
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await doctorPanelApi.completeDoctorAppointment(appointmentId, dToken);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete appointment");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await doctorPanelApi.cancelDoctorAppointment(appointmentId, dToken);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await doctorPanelApi.fetchDoctorDashboard(dToken);
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await doctorPanelApi.fetchDoctorProfile(dToken);
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  const value = {
    dToken, setDToken, appointments, getAppointments,
    completeAppointment, cancelAppointment, dashData, getDashData,
    profileData, setProfileData, getProfileData,
  };
  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};
