import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({ success: false, message: "Token is missing." });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized." });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized access." });
  }
};

export default authAdmin;
