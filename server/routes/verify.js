const express = require("express");
const router = express.Router();
const db = require("../db"); // Ensure the db connection is correctly set up
require("dotenv").config(); // To access environment variables

// Verification route
router.get("/verify", async (req, res) => {
  try {
    // Extract token from query parameters
    const { token } = req.query;
    console.log("Received token:", token); // Debugging line to check if token is passed

    // Check if the token is provided
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Query the database to find a user with the given verification token
    const [users] = await db.execute(
      "SELECT * FROM users WHERE verification_token = ?",
      [token]
    );

    // If no user is found, return an error
    if (users.length === 0) {
      console.log("❌ Invalid or expired token:", token);
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    // If the user is found, mark the user as verified
    await db.execute(
      "UPDATE users SET isVerified = 1, verification_token = NULL WHERE verification_token = ?",
      [token]
    );

    console.log("✅ User verified successfully:", users[0].email);

    // Send a redirect to the login page (or a URL specified in your environment variables)
    const redirectUrl = process.env.BASE_URL || "http://localhost:3000";
    res.redirect(`${redirectUrl}/login`);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("❌ Verification Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;