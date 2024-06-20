require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/Admin");

module.exports.Login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.json({ message: "All fields are required" });
  }

  const admin = await AdminModel.findOne({ username });

  if (admin) {
    result = await bcrypt.compare(password, admin?.password);
    if (result == true) {
      const token = jwt.sign(
        {
          name: username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 2 * 60 * 60,
        }
      );
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 2,
        withCredentials: true,
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } else {
    return res.status(401).json({
      message: "User does not exist.",
    });
  }
};

module.exports.logout = (req, res) => {
  const cookieValue = req.cookies;
  if (cookieValue) {
    res.cookie("token", "", {
      maxAge: 0,
      withCredentials: true,
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Cookie not found" });
  }
};
