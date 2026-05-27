import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "./doctor.model.js";
import appointmentModel from "../appointment/appointment.model.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.status(200).json({ success: true, message: "Availability updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ isHidden: { $ne: true } }).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleDoctorVisibility = async (req, res) => {
  try {
    const { docId } = req.user;
    const doc = await doctorModel.findById(docId);
    if (!doc) return res.status(404).json({ success: false, message: "Doctor not found." });
    await doctorModel.findByIdAndUpdate(docId, { isHidden: !doc.isHidden });
    res.status(200).json({ success: true, message: doc.isHidden ? "Profile visible." : "Profile hidden." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSelf = async (req, res) => {
  try {
    const { docId } = req.user;
    await appointmentModel.updateMany({ docId }, { cancelled: true });
    await doctorModel.findByIdAndDelete(docId);
    res.status(200).json({ success: true, message: "Account deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.user;
    const appointments = await appointmentModel.find({ docId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    if (appointmentData.docId !== docId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

    res.status(200).json({ success: true, message: "Appointment marked as completed." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    if (appointmentData.docId !== docId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    res.status(200).json({ success: true, message: "Appointment cancelled." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.user;

    // Fix: filter by docId, not all appointments
    const appointments = await appointmentModel.find({ docId });

    let earning = 0;
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    });

    const patientIds = [...new Set(appointments.map((item) => item.userId))];

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patientIds.length,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.status(200).json({ success: true, dashData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.user;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.status(200).json({ success: true, profileData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.user;
    const { fees, address, available } = req.body;

    if (fees === undefined || !address) {
      return res.status(400).json({ success: false, message: "fees and address are required." });
    }

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.status(200).json({ success: true, message: "Profile updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  toggleDoctorVisibility,
  deleteSelf,
};
