const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Products (both featured and non-featured) with optional filtering and sorting
router.get("/", async (req, res) => {
  const { categories, sort } = req.query; // categories comma separated, sort: price_asc or price_desc

  try {
    let query = `
      SELECT p.id, p.name AS title, p.price, p.discount, p.brand, p.stock, 
             p.category, p.description, p.image AS img
      FROM products p
    `;
    const params = [];

    if (categories) {
      const categoryList = categories.split(",").map(c => c.trim().toLowerCase());
      query += ` WHERE LOWER(p.category) IN (${categoryList.map(() => "?").join(",")})`;
      params.push(...categoryList);
    }

    if (sort === "price_asc") {
      query += " ORDER BY p.price ASC";
    } else if (sort === "price_desc") {
      query += " ORDER BY p.price DESC";
    }

    const [products] = await db.execute(query, params);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;