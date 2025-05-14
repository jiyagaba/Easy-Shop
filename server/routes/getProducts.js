const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Products (both featured and non-featured)
router.get("/", async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.id, p.name AS title, p.price, p.discount, p.brand, p.stock, 
             p.category, p.description, p.image AS img
      FROM products p
    `);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

