require("dotenv").config();
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/Admin");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Kindly login first" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await AdminModel.findOne({ username: decodedToken.name });

    if (user) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(401).json({ message: "Uauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
