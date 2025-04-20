const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d"; // Default to 7 days

// Refresh Token Route
router.post("/", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Access token expiration
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("❌ Refresh Token Error:", error.message);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

module.exports = router;