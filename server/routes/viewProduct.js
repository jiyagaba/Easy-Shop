const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First query to fetch product details
    const [productData] = await db.execute(
      `SELECT p.id, p.name, p.description, p.price, p.brand, p.stock, p.category, p.discount, p.seller_id, p.created_at, p.featured, p.image
       FROM products p
       WHERE p.id = ?`,
      [id]
    );

    if (productData.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Second query to fetch product images
    const [productImages] = await db.execute(
      `SELECT pi.image_path
       FROM product_images pi
       WHERE pi.product_id = ?`,
      [id]
    );

    // Extract image paths and create an array of image URLs
    const images = productImages.map((image) => {
      return `http://localhost:3000/uploads/${image.image_path}`;
    });

    // Prepare the product object with all required fields
    const product = {
      id: productData[0].id,
      name: productData[0].name,
      description: productData[0].description,
      price: productData[0].price,
      brand: productData[0].brand,
      stock: productData[0].stock,
      category: productData[0].category,
      discount: productData[0].discount,
      seller_id: productData[0].seller_id,
      created_at: productData[0].created_at,
      featured: productData[0].featured,
      images: images, // Array of image URLs
    };

    // Send the product data as the response
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
