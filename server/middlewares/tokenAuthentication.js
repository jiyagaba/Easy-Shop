const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenAuthentication = (req, res, next) => {
  console.log("🔐 Token authentication middleware triggered");

  const authHeader = req.headers.authorization;
  console.log("Received Auth Header:", authHeader); // Log the header for debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token found or incorrect format");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Log the extracted token

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing from environment variables");
    return res.status(500).json({ message: "Internal Server Error: Missing JWT secret" });
  }
  const decoded = jwt.decode(token);
  console.log("Decoded Token Before Verification:", decoded);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }

    console.log("✅ Decoded Token Payload:", user); // Log the decoded token payload
    req.user = { id: user.id, email: user.email, role: user.role }; // Correctly assign the decoded token payload
    next();
  });
};

module.exports = tokenAuthentication;