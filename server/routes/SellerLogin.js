const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  console.log("Seller login route hit");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const [sellers] = await db.execute("SELECT * FROM sellers WHERE email = ?", [normalizedEmail]);

    if (sellers.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const seller = sellers[0];

    if (!seller.password) {
      console.log("⚠️ Password missing in DB for seller:", seller.email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If password is not hashed, hash and update it in the DB
    if (!seller.password.startsWith("$2b$")) {
      const hashedPassword = await bcrypt.hash(seller.password, 10);
      await db.execute("UPDATE sellers SET password = ? WHERE email = ?", [hashedPassword, normalizedEmail]);
      seller.password = hashedPassword;
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!JWT_SECRET) {
      console.error("🚨 JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: seller.id, email: seller.email, role: "seller" },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    const { password: _, ...sellerWithoutPassword } = seller;

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        ...sellerWithoutPassword,
        role: "seller",
      },
    });
  } catch (error) {
    console.error("Seller Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
