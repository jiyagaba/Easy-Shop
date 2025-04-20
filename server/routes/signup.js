const express = require("express");
const router = express.Router();
const hashPassword = require("../Middlewares/hashPassword");  // Hash the password before saving
const db = require("../db");  // MySQL database connection
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// ✅ Signup Route
router.post("/", async (req, res) => {
  console.log("Signup Route");
  console.log(req.body); // Log incoming data for debugging

  const { name, email, password } = req.body;

  // Check if any of the required fields are missing
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // Log the data before checking for existing users
    console.log("Checking if the user exists with username or email...");
    
    // Check if user exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE name = ? OR email = ?",
      [name, email]
    );
    console.log("Existing users check result:", existingUsers); // Log the result of the query

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username or Email already taken" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await hashPassword(password);
    console.log("Hashed Password:", hashedPassword);  // Log the hashed password

    // Insert user into database
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );
    console.log("User inserted successfully:", result);

    // Respond with success message
    res.status(200).json({ message: "Signup successful" });

  } catch (error) {
    console.log("Error in signup:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Verify Route (Can be removed if not using email verification)
router.get("/verify", (req, res) => {
  res.status(200).json({ message: "Email verification skipped." });
});

module.exports = router;
