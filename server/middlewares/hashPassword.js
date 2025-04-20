const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt);  // Hash password
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};

module.exports = hashPassword;
