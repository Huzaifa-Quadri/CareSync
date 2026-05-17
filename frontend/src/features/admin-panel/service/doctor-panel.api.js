import axios from "axios";

const doctorBase = "/api/doctor";

export const fetchDoctorAppointments = (dToken) =>
  axios.get(`${doctorBase}/appointments`, { headers: { dToken } });

export const completeDoctorAppointment = (appointmentId, dToken) =>
  axios.post(`${doctorBase}/complete-appointment`, { appointmentId }, { headers: { dToken } });

export const cancelDoctorAppointment = (appointmentId, dToken) =>
  axios.post(`${doctorBase}/cancel-appointment`, { appointmentId }, { headers: { dToken } });

export const fetchDoctorDashboard = (dToken) =>
  axios.get(`${doctorBase}/dashboard`, { headers: { dToken } });

export const fetchDoctorProfile = (dToken) =>
  axios.get(`${doctorBase}/profile`, { headers: { dToken } });

export const updateDoctorProfile = (updateData, dToken) =>
  axios.post(`${doctorBase}/update-profile`, updateData, { headers: { dToken } });
