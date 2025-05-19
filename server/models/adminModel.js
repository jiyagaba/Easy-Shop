const db = require("../config/db"); // Adjust path based on your folder structure

const adminSchema = {
  // Create a new admin
  async createAdmin({ username, email, password, image, role }) {
    const query = "INSERT INTO admin (username, email, password, image, role) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [username, email, password, image, role]);
    return result;
  },

  // Get admin by ID
  async getAdminById(id) {
    const query = "SELECT * FROM admin WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  // Get admin by email
  async getAdminByEmail(email) {
    const query = "SELECT * FROM admin WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },

  // Update admin details
  async updateAdmin(id, { username, email, password, image, role }) {
    const query = "UPDATE admin SET username = ?, email = ?, password = ?, image = ?, role = ? WHERE id = ?";
    const [result] = await db.execute(query, [username, email, password, image, role, id]);
    return result;
  },

  // Delete an admin by ID
  async deleteAdmin(id) {
    const query = "DELETE FROM admin WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result;
  }
};

module.exports = adminSchema;
