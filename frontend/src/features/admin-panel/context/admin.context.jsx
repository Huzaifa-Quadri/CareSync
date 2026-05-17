import { createContext, useState } from "react";
import { toast } from "react-toastify";
import * as adminApi from "../service/admin.api";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getAllDoctors = async () => {
    try {
      const { data } = await adminApi.fetchAllDoctors(aToken);
      if (data.success) {
        setDoctors(data.doctors);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch doctors");
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await adminApi.changeAvailability(docId, aToken);
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change availability");
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await adminApi.fetchAllAppointments(aToken);
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await adminApi.cancelAdminAppointment(appointmentId, aToken);
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        getDashData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await adminApi.fetchAdminDashboard(aToken);
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load Dashboard data");
    }
  };

  const value = {
    aToken, setAToken, doctors, getAllDoctors, changeAvailability,
    appointments, setAppointments, getAllAppointments, cancelAppointment,
    dashData, getDashData,
  };
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
