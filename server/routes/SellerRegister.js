const express = require("express");
const router = express.Router();
const hashPassword = require("../Middlewares/hashPassword");  // Middleware to hash passwords
const db = require("../db");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// ✅ Seller Signup Route
router.post("/", async (req, res) => {
  console.log("🚀 Seller Signup Route hit");
  console.log("Request body:", req.body);

  const { sellername, email, password, store_name } = req.body;

  if (!sellername || !email || !password || !store_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("🔍 Checking if seller exists...");
    const [existingSellers] = await db.execute(
      "SELECT id FROM sellers WHERE sellername = ? OR email = ?",
      [sellername, email]
    );

    if (existingSellers.length > 0) {
      return res.status(400).json({ message: "Seller name or Email already taken" });
    }

    const hashedPassword = await hashPassword(password);
    console.log("🔐 Hashed Password:", hashedPassword);

    const [result] = await db.execute(
      `INSERT INTO sellers (sellername, email, password, store_name) VALUES (?, ?, ?, ?)`,
      [sellername, email, hashedPassword, store_name]
    );

    console.log("✅ Seller inserted successfully:", result);

    res.status(200).json({ message: "Seller signup successful" });

  } catch (error) {
    console.error("❌ Error during seller signup:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Optional: Seller Verify Route (currently just a placeholder)
router.get("/verify", (req, res) => {
  res.status(200).json({ message: "Seller email verification skipped." });
});

module.exports = router;
