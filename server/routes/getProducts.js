const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Products
router.get("/", async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.id, p.name AS title, p.price, p.discount, p.brand, p.stock, 
             p.category, p.description, MAX(pi.image_path) AS img
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id, p.name, p.price, p.discount, p.brand, p.stock, p.category, p.description
    `);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
