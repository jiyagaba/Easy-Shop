const express = require("express");
const router = express.Router();
const db = require("../db");

// Get & Insert discounted products (without deleting)
router.get("/", async (req, res) => {
  try {
    // Step 1: Fetch discounted products from products table
    const [products] = await db.execute(`
      SELECT id, name AS title, price, discount, brand, stock, category, description, image AS img
      FROM products
      WHERE discount > 0
    `);

    console.log("✅ Fetched discounted products:", products.length);

    // Step 2: Insert them into discountedproducts without duplicates
    const insertQuery = `
      INSERT INTO discountedproducts 
      (id, title, price, discount, brand, stock, category, description, img)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        title = VALUES(title),
        price = VALUES(price),
        discount = VALUES(discount),
        brand = VALUES(brand),
        stock = VALUES(stock),
        category = VALUES(category),
        description = VALUES(description),
        img = VALUES(img)
    `;

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      for (const p of products) {
        await conn.execute(insertQuery, [
          p.id,
          p.title,
          p.price,
          p.discount,
          p.brand,
          p.stock,
          p.category,
          p.description,
          p.img
        ]);
      }

      await conn.commit();
      console.log("✅ Inserted/Updated discounted products");
    } catch (insertErr) {
      await conn.rollback();
      console.error("❌ Error inserting/updating:", insertErr.message);
      return res.status(500).json({ message: "Insert/Update failed" });
    } finally {
      conn.release();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching discounted products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
