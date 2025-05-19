const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/reviews - Add a new review
router.post("/", async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  if (!productId || !userId || !rating) {
    return res.status(400).json({ message: "Product ID, User ID, and rating are required" });
  }

  try {
    await db.execute(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [productId, userId, rating, comment || ""]
    );
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/reviews/:productId - Get reviews for a product
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const [reviews] = await db.execute(
      "SELECT r.id, r.rating, r.comment, r.created_at, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC",
      [productId]
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
