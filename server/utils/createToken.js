// createToken.js

const jwt = require("jsonwebtoken");

const createToken = (user) => {
  try {
    // Sign the token with userId and email in the payload
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Include the userId and email in the payload
      process.env.JWT_SECRET, // Use secret key from environment variables
      { expiresIn: process.env.JWT_EXPIRES_IN } // Token expires in 1 hour
    );
    return token; // Return the generated token
  } catch (error) {
    // Log the error if token creation fails
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

const refreshToken = (user) => {
  try {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '10h' } // Refresh token expiration time
    );
    return token;
  } catch (error) {
    console.error("Error creating refresh token:", error);
    throw new Error("Refresh token creation failed");
  }
};

module.exports = { createToken, refreshToken };
