import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Token is missing." });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.user = { docId: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
