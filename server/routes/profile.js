const express = require("express");
const db = require("../db");
const tokenAuthentication = require("../middlewares/tokenAuthentication");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("✅ Profile test route works");
});
// ------------------ GET PROFILE ------------------
router.get("/:id", tokenAuthentication, async (req, res) => {
  const tokenUserId = req.user.id;
  const paramId = parseInt(req.params.id);

  console.log("✅ Profile fetch route triggered");
  console.log("🔐 User from token:", req.user);
  console.log("🆔 ID from URL params:", paramId);

  if (tokenUserId !== paramId) {
    console.log("❌ Forbidden: Token user ID does not match URL param ID");
    return res.status(403).json({ message: "Forbidden: Cannot access another user's profile" });
  }

  try {
    const [users] = await db.execute(
      `SELECT id, name, email, first_name, middle_name, last_name, phone, house_no, street, landmark, city, state, country, pincode, created_at, isVerified
       FROM users 
       WHERE id = ?`,
      [paramId]
    );
    console.log("Database query result:", users);

    if (users.length === 0) {
      console.log("❌ User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error("❌ DB Error in /api/profile/:id GET:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// ------------------ UPDATE PROFILE ------------------
router.put("/:id", tokenAuthentication, async (req, res) => {
  console.log("✅ Profile update route triggered");

  const { id } = req.params;
  const user = req.user;

  console.log("🔐 User from token:", user);
  console.log("🆔 ID from URL params:", id);

  if (parseInt(user.id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ message: "You cannot update another user's profile" });
  }

  const checkUserQuery = `SELECT id FROM users WHERE id = ?`;
  const [userExists] = await db.execute(checkUserQuery, [id]);

  if (userExists.length === 0) {
    console.log("❌ User not found in the database");
    return res.status(404).json({ message: "User not found" });
  }

  const {
    name,
    email,
    first_name,
    middle_name,
    last_name,
    phone,
    house_no,
    street,
    landmark,
    city,
    state,
    country,
    pincode,
  } = req.body;

  const updatedData = {
    name: name || "",
    email: email || "",
    first_name: first_name || "",
    middle_name: middle_name || "",
    last_name: last_name || "",
    phone: phone || "",
    house_no: house_no || "",
    street: street || "",
    landmark: landmark || "",
    city: city || "",
    state: state || "",
    country: country || "",
    pincode: pincode || "",
  };

  const query = `
    UPDATE users
    SET 
      name = ?, 
      email = ?, 
      first_name = ?, 
      middle_name = ?, 
      last_name = ?, 
      phone = ?, 
      house_no = ?, 
      street = ?, 
      landmark = ?, 
      city = ?, 
      state = ?, 
      country = ?, 
      pincode = ?
    WHERE id = ?;
  `;

  const values = [
    updatedData.name,
    updatedData.email,
    updatedData.first_name,
    updatedData.middle_name,
    updatedData.last_name,
    updatedData.phone,
    updatedData.house_no,
    updatedData.street,
    updatedData.landmark,
    updatedData.city,
    updatedData.state,
    updatedData.country,
    updatedData.pincode,
    id,
  ];

  try {
    console.log("🔨 Executing DB query...");
    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      console.log("❌ Update failed: user not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User profile updated successfully");
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    console.error("❌ DB Error in /api/profile PUT:", error.message);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});

// ------------------ DELETE PROFILE ------------------
router.delete("/:id", tokenAuthentication, async (req, res) => {
  console.log("✅ Profile delete route triggered");

  const { id } = req.params;
  const user = req.user;

  console.log("🔐 User from token:", user);
  console.log("🆔 ID from URL params:", id);

  // Check if the user is trying to delete their own profile
  if (parseInt(user.id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ message: "You cannot delete another user's profile" });
  }

  const deleteQuery = `DELETE FROM users WHERE id = ?`;

  try {
    console.log("🔨 Executing DB delete query...");
    const [result] = await db.execute(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      console.log("❌ Delete failed: user not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User profile deleted successfully");
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("❌ DB Error in /api/profile DELETE:", error.message);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
});

module.exports = router;
