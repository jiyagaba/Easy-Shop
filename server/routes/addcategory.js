const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const db = require("../db");

// Multer configuration for category image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/category"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* ---------------------------------------------------
   Add a new category
   POST /api/categories
--------------------------------------------------- */
router.post("/", upload.single("image"), async (req, res) => {
  const { name, slug } = req.body;
  const image = req.file ? `/images/category/${req.file.filename}` : null;

  if (!name || !slug || !image) {
    return res.status(400).json({ message: "Name, slug, and image are required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)",
      [name, slug, image]
    );

    const newCategory = { id: result.insertId, name, slug, image };
    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------------------------------------
   Get all categories
   GET /api/categories
--------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [categories] = await db.execute("SELECT * FROM categories");

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------------------------------------
   Get products by category slug
   GET /api/categories/:slug/products
--------------------------------------------------- */
router.get("/:slug/products", async (req, res) => {
  const { slug } = req.params;
  const { sort, categories } = req.query; // categories can be comma separated list

  try {
    let query = "SELECT * FROM products WHERE LOWER(category) = ?";
    let params = [slug.toLowerCase()];

    if (categories) {
      const categoryList = categories.split(",").map(c => c.toLowerCase());
      query = `SELECT * FROM products WHERE LOWER(category) IN (${categoryList.map(() => "?").join(",")})`;
      params = categoryList;
    }

    if (sort === "price_asc") {
      query += " ORDER BY price ASC";
    } else if (sort === "price_desc") {
      query += " ORDER BY price DESC";
    }

    const [products] = await db.execute(query, params);

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category '${slug}'` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------------------------------------
   Update a category
   PUT /api/categories/:id
--------------------------------------------------- */
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, slug } = req.body;
  const newImage = req.file ? `/images/category/${req.file.filename}` : null;

  try {
    const [existing] = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const oldImage = existing[0].image;

    const updatedImage = newImage || oldImage;
    await db.execute(
      "UPDATE categories SET name = ?, slug = ?, image = ? WHERE id = ?",
      [name, slug, updatedImage, id]
    );

    // Delete old image from disk if new image uploaded
    if (newImage && oldImage) {
      const imagePath = path.join(__dirname, "../uploads/category", path.basename(oldImage));
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting old image:", err.message);
      });
    }

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------------------------------------
   Delete a category
   DELETE /api/categories/:id
--------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const imagePath = path.join(__dirname, "../uploads/category", path.basename(existing[0].image));

    await db.execute("DELETE FROM categories WHERE id = ?", [id]);

    // Delete image from disk
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting image file:", err.message);
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
