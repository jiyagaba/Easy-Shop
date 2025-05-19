const express = require("express");
const router = express.Router();
const db = require("../db");

// Get Featured Products
router.get("/featured", async (req, res) => {
  try {
    console.log("📥 GET /api/products/featured called");

    const [products] = await db.execute(`
      SELECT p.id, p.name AS title, p.price, p.discount, p.brand, p.stock, 
             p.category, p.description, p.image AS img
      FROM products p
      WHERE p.featured = 1
    `);

    console.log("📦 Featured Products Found:", products.length);

    if (products.length === 0) {
      console.warn("⚠️ No featured products found in the database");
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching featured products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Product as Featured
router.post("/featured", async (req, res) => {
  const { productId } = req.body;

  console.log("📥 POST /api/products/featured called with:", req.body);

  if (!productId) {
    console.warn("⚠️ Product ID not provided in the request body");
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const [result] = await db.execute(`UPDATE products SET featured = 1 WHERE id = ?`, [productId]);

    console.log("🛠️ Database update result:", result);

    if (result.affectedRows === 0) {
      console.warn("⚠️ Product not found with ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("✅ Product marked as featured:", productId);
    res.status(200).json({ message: "Product marked as featured successfully" });
  } catch (error) {
    console.error("❌ Error updating product as featured:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
