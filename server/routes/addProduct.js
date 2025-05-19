// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const db = require("../db"); // Ensure your database connection is set up
// const tokenAuthentication = require("../middlewares/tokenAuthentication");

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage });

// // Add Product Route
// router.post("/", tokenAuthentication, upload.array("images", 5), async (req, res) => {
//   const { name, description, discount, price, brand, stock, category } = req.body;
//   const sellerId = req.user.id; // Extract seller ID from the token

//   if (!name || !description || !price || !brand || !stock || !category) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Save product details in the database with featured = 1
//     const [result] = await db.execute(
//       `INSERT INTO products (name, description, discount, price, brand, stock, category, seller_id, featured) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [name, description, discount, price, brand, stock, category, sellerId, 1] // Set featured = 1
//     );

//     const productId = result.insertId;

//     // Save image paths in the database
//     if (req.files && req.files.length > 0) {
//       const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
//       for (const imagePath of imagePaths) {
//         await db.execute(
//           `INSERT INTO product_images (product_id, image_path) VALUES (?, ?)`,
//           [productId, imagePath]
//         );
//       }
//     }

//     res.status(201).json({ message: "Product added successfully", productId });
//   } catch (error) {
//     console.error("Error adding product:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db"); // Your database connection
const tokenAuthentication = require("../middlewares/tokenAuthentication");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Add Product Route
router.post("/", tokenAuthentication, upload.array("images", 5), async (req, res) => {
  const { name, description, discount, price, brand, stock, category, slug } = req.body;
  const sellerId = req.user.id;

  // Validate required fields
  if (!name || !description || !price || !brand || !stock || !category || !slug) {
    return res.status(400).json({ message: "All fields including slug are required" });
  }

  try {
    // Save product details
    const [result] = await db.execute(
      `INSERT INTO products (name, description, discount, price, brand, stock, category, slug, seller_id, featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, description, discount, price, brand, stock, category, slug, sellerId, 1]
    );

    const productId = result.insertId;

    // Save image paths
    if (req.files && req.files.length > 0) {
      // const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      const imagePaths = req.files.map((file) => file.filename);

      for (const imagePath of imagePaths) {
        await db.execute(
          `INSERT INTO product_images (product_id, image_path) VALUES (?, ?)`,
          [productId, imagePath]
        );
      }
    }

    res.status(201).json({ message: "Product added successfully", productId });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
