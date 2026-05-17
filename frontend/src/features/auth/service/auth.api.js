import axios from "axios";

const userBase = "/api/user";
const adminBase = "/api/admin";
const doctorBase = "/api/doctor";

export const loginUser = (email, password) =>
  axios.post(`${userBase}/login`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${userBase}/register`, { name, email, password });

export const getUserProfile = (token) =>
  axios.get(`${userBase}/get-profile`, { headers: { token } });

export const loginAdmin = (email, password) =>
  axios.post(`${adminBase}/login`, { email, password });

export const loginDoctor = (email, password) =>
  axios.post(`${doctorBase}/login`, { email, password });
