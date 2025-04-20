const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.execute(
      `SELECT p.id, p.name, p.description, p.price, p.brand, p.stock, p.category, p.discount, MAX(pi.image_path) AS img
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id
       WHERE p.id = ?
       GROUP BY p.id, p.name, p.description, p.price, p.brand, p.stock, p.category, p.discount`,
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product[0]);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;