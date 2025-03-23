const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  console.log("🔹 Admin Login route hit");
  console.log("Received Data:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("🔍 Checking DB for Email:", email.trim().toLowerCase());

    // Fetch the admin user from the database (case-insensitive)
    const [admins] = await db.execute("SELECT * FROM admin WHERE LOWER(email) = LOWER(?)", [email.trim()]);

    if (admins.length === 0) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = admins[0];
    console.log("✅ Found User:", admin.email);

    // Directly compare the plain text password
    console.log("🔑 Checking Password...");
    console.log("Stored Password:", admin.password); // Debugging purpose

    if (password !== admin.password) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token for the admin
    console.log("✅ Password Matched! Generating Token...");
    console.log("JWT_SECRET:", JWT_SECRET); // Debugging

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Admin login successful", token });
  } catch (error) {
    console.error("❌ Admin Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
