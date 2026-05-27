import express from "express";
import {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancelAdmin,
  adminDashboard,
  changeAvailability,
  toggleAdminDoctorVisibility,
  deleteDoctor,
} from "./admin.controller.js";
import authAdmin from "../../middlewares/auth.admin.js";
import upload from "../../middlewares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancelAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/toggle-doctor-visibility", authAdmin, toggleAdminDoctorVisibility);
adminRouter.delete("/delete-doctor", authAdmin, deleteDoctor);

export default adminRouter;
