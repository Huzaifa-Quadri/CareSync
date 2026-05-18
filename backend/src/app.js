import express from "express";
import cors from "cors";
import userRouter from "./features/user/user.routes.js";
import doctorRouter from "./features/doctor/doctor.routes.js";
import adminRouter from "./features/admin/admin.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Doctor Appointment API is running." });
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found.", path: req.originalUrl });
});

app.use(errorHandler);

export default app;
