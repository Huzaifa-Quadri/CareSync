import axios from "axios";

const userBase = "/api/user";
const doctorBase = "/api/doctor";

export const fetchDoctors = () =>
  axios.get(`${doctorBase}/list`);

export const bookAppointment = (docId, slotDate, slotTime, token) =>
  axios.post(`${userBase}/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });

export const getUserAppointments = (token) =>
  axios.get(`${userBase}/appointments`, { headers: { token } });

export const cancelUserAppointment = (appointmentId, token) =>
  axios.post(`${userBase}/cancel-appointment`, { appointmentId }, { headers: { token } });

export const makePayment = (appointmentId, token) =>
  axios.post(`${userBase}/make-payment`, { appointmentId }, { headers: { token } });

export const updateUserProfile = (formData, token) =>
  axios.post(`${userBase}/update-profile`, formData, { headers: { token } });
