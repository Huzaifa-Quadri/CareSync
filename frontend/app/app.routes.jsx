import { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AdminContext } from "@features/admin-panel/context/admin.context";
import { DoctorContext } from "@features/admin-panel/context/doctor.context";

import UserLayout from "@shared/layouts/UserLayout";
import AdminLayout from "@shared/layouts/AdminLayout";
import DoctorLayout from "@shared/layouts/DoctorLayout";

import Login from "@features/auth/pages/Login";
import AdminLogin from "@features/auth/pages/AdminLogin";
import NotFound from "@features/auth/pages/NotFound";

import Home from "@features/appointment-system/pages/Home";
import About from "@features/appointment-system/pages/About";
import Contact from "@features/appointment-system/pages/Contact";
import Profile from "@features/appointment-system/pages/Profile";
import Doctors from "@features/appointment-system/pages/Doctors";
import Appointment from "@features/appointment-system/pages/Appointment";
import Appointments from "@features/appointment-system/pages/Appointments";

import Dashboard from "@features/admin-panel/pages/admin/Dashboard";
import AllAppointments from "@features/admin-panel/pages/admin/AllAppointments";
import AddDoctor from "@features/admin-panel/pages/admin/AddDoctor";
import DoctorsList from "@features/admin-panel/pages/admin/DoctorsList";
import DoctorDetail from "@features/admin-panel/pages/admin/DoctorDetail";
import DoctorDashboard from "@features/admin-panel/pages/doctor/DoctorDashboard";
import DoctorAppointments from "@features/admin-panel/pages/doctor/DoctorAppointments";
import DoctorProfile from "@features/admin-panel/pages/doctor/DoctorProfile";

export const AppRoutes = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:slug" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-appointments" element={<Appointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          path="/admin-login"
          element={
            aToken ? (
              <Navigate to="/admin/dashboard" />
            ) : dToken ? (
              <Navigate to="/doctor/dashboard" />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route path="/admin" element={aToken ? <AdminLayout /> : <Navigate to="/admin-login" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-appointments" element={<AllAppointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="doctors-list" element={<DoctorsList />} />
          <Route path="doctors-list/:docId" element={<DoctorDetail />} />
        </Route>

        <Route path="/doctor" element={dToken ? <DoctorLayout /> : <Navigate to="/admin-login" />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
