const express = require("express");
const db = require("../db");
const tokenAuthentication = require("../middlewares/tokenAuthentication");

const router = express.Router();

// ------------------ TEST ROUTE ------------------
router.get("/test", (req, res) => {
  res.send("✅ Seller test route works");
});

// ------------------ GET SELLER PROFILE ------------------
router.get("/:id", tokenAuthentication, async (req, res) => {
  const tokenUserId = req.user.id;
  const paramId = parseInt(req.params.id);

  console.log("✅ Seller profile fetch route triggered");
  console.log("🔐 User from token:", req.user);
  console.log("🆔 ID from URL params:", paramId);

  if (tokenUserId !== paramId) {
    console.log("❌ Forbidden: Token user ID does not match URL param ID");
    return res.status(403).json({ message: "Forbidden: Cannot access another seller's profile" });
  }

  try {
    const [sellers] = await db.execute(
      `SELECT id, sellername AS name, email, store_name, phone, state, city, status, image, created_at 
       FROM sellers 
       WHERE id = ?`,
      [paramId]
    );
    console.log("Database query result:", sellers);

    if (sellers.length === 0) {
      console.log("❌ Seller not found in the database");
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(sellers[0]);
  } catch (error) {
    console.error("❌ DB Error in /api/seller/:id GET:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ------------------ UPDATE SELLER PROFILE ------------------
router.put("/:id", tokenAuthentication, async (req, res) => {
  console.log("✅ Seller profile update route triggered");

  const { id } = req.params;
  const user = req.user;

  console.log("🔐 User from token:", user);
  console.log("🆔 ID from URL params:", id);

  if (parseInt(user.id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ message: "You cannot update another seller's profile" });
  }

  const checkSellerQuery = `SELECT id FROM sellers WHERE id = ?`;
  const [sellerExists] = await db.execute(checkSellerQuery, [id]);

  if (sellerExists.length === 0) {
    console.log("❌ Seller not found in the database");
    return res.status(404).json({ message: "Seller not found" });
  }

  const {
    name,
    email,
    store_name,
    phone,
    state,
    city,
    status,
    image
  } = req.body;

  const updatedData = {
    name: name || "",
    email: email || "",
    store_name: store_name || "",
    phone: phone || "",
    state: state || "",
    city: city || "",
    status: status || "",
    image: image || ""
  };

  const query = `
    UPDATE sellers
    SET 
      sellername = ?, 
      email = ?, 
      store_name = ?, 
      phone = ?, 
      state = ?, 
      city = ?, 
      status = ?, 
      image = ?
    WHERE id = ?;
  `;

  const values = [
    updatedData.name,
    updatedData.email,
    updatedData.store_name,
    updatedData.phone,
    updatedData.state,
    updatedData.city,
    updatedData.status,
    updatedData.image,
    id,
  ];

  try {
    console.log("🔨 Executing DB query...");
    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      console.log("❌ Update failed: seller not found");
      return res.status(404).json({ message: "Seller not found" });
    }

    console.log("✅ Seller profile updated successfully");
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    console.error("❌ DB Error in /api/seller PUT:", error.message);
    res.status(500).json({ message: "Failed to update seller", error: error.message });
  }
});

// ------------------ DELETE SELLER PROFILE ------------------
router.delete("/:id", tokenAuthentication, async (req, res) => {
  console.log("✅ Seller profile delete route triggered");

  const { id } = req.params;
  const user = req.user;

  console.log("🔐 User from token:", user);
  console.log("🆔 ID from URL params:", id);

  if (parseInt(user.id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ message: "You cannot delete another seller's profile" });
  }

  const deleteQuery = `DELETE FROM sellers WHERE id = ?`;

  try {
    console.log("🔨 Executing DB delete query...");
    const [result] = await db.execute(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      console.log("❌ Delete failed: seller not found");
      return res.status(404).json({ message: "Seller not found" });
    }

    console.log("✅ Seller profile deleted successfully");
    res.status(200).json({ message: "Seller profile deleted successfully" });
  } catch (error) {
    console.error("❌ DB Error in /api/seller DELETE:", error.message);
    res.status(500).json({ message: "Failed to delete seller", error: error.message });
  }
});

module.exports = router;
