const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST||"localhost",
  user: process.env.DB_USER|| "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME|| "ecommerce",
  waitForConnections: true,
  // connectionLimit: 10,
  queueLimit: 0,
});
db.getConnection()
  .then(() => console.log("✅ MySQL Database Connected!"))
  .catch((err) => console.error("❌ MySQL Database Connection Failed:", err.message));

module.exports = db;