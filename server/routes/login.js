const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  console.log("Login route hit");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [normalizedEmail]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    if (!user.password) {
      console.log("⚠️ Password missing in DB for user:", user.email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!JWT_SECRET) {
      console.error("🚨 JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate the JWT token with expiration
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
