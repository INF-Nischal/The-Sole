const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const isAdmin = async (req, res) => {
  let { loggedInUserId } = req.body;
  try {
    let loggedInUserRole = await User.findById(loggedInUserId);
    res.json({ role: loggedInUserRole.userRole });
  } catch {
    res.status(404).json({ error: "User not found" });
  }
};

const registerUser = async (req, res) => {
  const { email, password, ...data } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email: email,
        password: hashedPassword,
        ...data,
      });

      await user.save();

      return res.status(201).json({ message: "New user added successfully!" });
    }

    return res.status(400).json({
      message: "Email already exists.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid Email.", success: false });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Invalid Password.", success: false });
    }

    const token = generateToken(existingUser._id);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      jwtToken: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(400).json({ message: "Email not found." });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: { name: "Sole", address: process.env.GMAIL_USER },
      to: req.body.email,
      subject: "Your Password Reset Token (valid for 10 min)",
      text: `Your password reset token is: http://localhost:3000/users/${token}`,
    };

    transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset link sent to email!",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  isAdmin,
  registerUser,
  loginUser,
  forgotPassword,
};
