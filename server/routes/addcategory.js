const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer configuration for category image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/category")); // Save in /uploads/category
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
  console.log("Received slug:", slug);

  try {
    // Fetch products whose category name matches the given slug (case-insensitive)
    const [products] = await db.execute(
      "SELECT * FROM products WHERE LOWER(category) = ?",
      [slug.toLowerCase()]
    );
    router.get("/:slug/products", async (req, res) => {
  const { slug } = req.params;
  console.log("Received slug:", slug);

  try {
    // Fetch products whose category name matches the given slug (case-insensitive)
    const [products] = await db.execute(
      "SELECT * FROM products WHERE LOWER(category) = ?",
      [slug.toLowerCase()]
    );
    console.log("Products fetched:", products);

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category '${slug}'` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category '${slug}'` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
