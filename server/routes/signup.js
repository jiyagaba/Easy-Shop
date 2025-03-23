const express = require("express");
const router = express.Router();
const validateSignup = require("../Middlewares/validateSignup");
const hashPassword = require("../Middlewares/hashPassword");
const db = require("../db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ Signup Route
router.post("/", async (req, res) => {
  console.log("Signup Route")
  console.log(req.body)
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE name = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username or Email already taken" });
    }

    // Generate email verification token
    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    // Insert user into database
    await db.execute(
      `INSERT INTO users (name, email, password) 
      VALUES (?, ?, ?)`,
      [username, email, password]
    );

    const verificationUrl = `${BASE_URL}/api/signup/verify?token=${verificationToken}`;

    // Send verification email
    // await transporter.sendMail({
    //   from: `"Your App" <${process.env.EMAIL}>`,
    //   to: email,
    //   subject: "Verify Your Email",
    //   html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    // });

    // res.status(200).json({ message: "Signup successful. Please verify your email." });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


router.get("/verify", async (req, res) => {
  try {
    const decoded = jwt.verify(req.query.token, JWT_SECRET);
    await db.execute("UPDATE users SET isVerified = 1 WHERE email = ?", [decoded.email]);
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
