import axios from "axios";

const adminBase = "/api/admin";

export const fetchAllDoctors = (aToken) =>
  axios.get(`${adminBase}/all-doctors`, { headers: { aToken } });

export const addDoctor = (formData, aToken) =>
  axios.post(`${adminBase}/add-doctor`, formData, { headers: { aToken } });

export const changeAvailability = (docId, aToken) =>
  axios.post(`${adminBase}/change-availability`, { docId }, { headers: { aToken } });

export const fetchAllAppointments = (aToken) =>
  axios.get(`${adminBase}/appointments`, { headers: { aToken } });

export const cancelAdminAppointment = (appointmentId, aToken) =>
  axios.post(`${adminBase}/cancel-appointment`, { appointmentId }, { headers: { aToken } });

export const fetchAdminDashboard = (aToken) =>
  axios.get(`${adminBase}/dashboard`, { headers: { aToken } });

export const adminToggleDoctorVisibility = (docId, aToken) =>
  axios.post(`${adminBase}/toggle-doctor-visibility`, { docId }, { headers: { aToken } });

export const adminDeleteDoctor = (docId, aToken) =>
  axios.delete(`${adminBase}/delete-doctor`, { data: { docId }, headers: { aToken } });
