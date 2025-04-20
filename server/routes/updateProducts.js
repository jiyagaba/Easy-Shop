const express = require("express");
const router = express.Router();
const db = require("../db");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, brand, stock, category, discount } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE products SET name = ?, description = ?, price = ?, brand = ?, stock = ?, category = ?, discount = ? WHERE id = ?`,
      [name, description, price, brand, stock, category, discount, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;