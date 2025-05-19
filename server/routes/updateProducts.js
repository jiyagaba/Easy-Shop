const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../middlewares/upload"); // Import the upload middleware

// PUT route for updating a product with image upload
router.put("/:id", upload.any(), async (req, res) => {
  const { id } = req.params; // Get the product ID from the URL parameter
const {
    name,
    description,
    price,
    brand,
    stock,
    category,
    discount,
    featured
  } = req.body; // Get the other product details from the body

  // Get the uploaded image path, if available
  let imagePath = null;
  if (req.files && req.files.length > 0) {
    // Use the first uploaded file for image update
    imagePath = "/uploads/" + req.files[0].filename;
  }

  try {
    // Base query to update the product
    let query = `UPDATE products SET name = ?, description = ?, price = ?, brand = ?, stock = ?, category = ?, discount = ?, featured = ?`;
    const values = [name, description, price, brand, stock, category, discount, featured];

    // If an image was uploaded, update the image field in the query
    if (imagePath) {
      query += `, image = ?`;
      values.push(imagePath); // Add the image path to the query values
    }

    // Add the WHERE condition to update the product by ID
    query += ` WHERE id = ?`;
    values.push(id);

    // Log for debugging
    console.log("🛠️ PUT /api/products/:id");
    console.log("🧠 Product ID:", id);
    console.log("📦 Incoming Data:", { name, description, price, brand, stock, category, discount, imagePath });
    console.log("📝 Executing Query:", query);
    console.log("🔢 With Values:", values);

    // Execute the query to update the product
    const [result] = await db.execute(query, values);

    // If no rows were affected, return a 404
    if (result.affectedRows === 0) {
      console.warn("⚠️ Product not found:", id);
      return res.status(404).json({ message: "Product not found" });
    }

    // If the update was successful, return a success response
    console.log("✅ Product updated successfully:", id);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    // Catch and log any errors
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
