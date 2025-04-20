const express = require("express");
const router = express.Router();
const db = require("../db");

// Get Featured Products
router.get("/featured", async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.id, p.name AS title, p.price, p.discount, p.brand, p.stock, 
             p.category, p.description, MAX(pi.image_path) AS img
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      WHERE p.featured = 1
      GROUP BY p.id, p.name, p.price, p.discount, p.brand, p.stock, p.category, p.description
    `);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Product as Featured
router.post("/featured", async (req, res) => {
  const { productId } = req.body; // Get product ID from request body

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const [result] = await db.execute(`UPDATE products SET featured = 1 WHERE id = ?`, [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product marked as featured successfully" });
  } catch (error) {
    console.error("Error updating product as featured:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;