const express = require("express");
const router = express.Router();
const db = require("../db");

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(`DELETE FROM products WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;