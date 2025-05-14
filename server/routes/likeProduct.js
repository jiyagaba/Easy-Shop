const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticate = require("../Middlewares/authmiddleware");

// ✅ Get liked products for a user
router.get("/", authenticate, async (req, res) => {
    const userId = req.user.id;  // Use id from tokenAuthentication middleware

    try {
        const [likedProducts] = await db.query(
            "SELECT id, product_id AS productId, name, price, image, description FROM liked_products WHERE user_id = ?",
            [userId] // This will give liked products for a specific user
        );
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.set('Surrogate-Control', 'no-store');
        res.status(200).json(likedProducts);
    } catch (error) {
        console.error("❌ Error fetching liked products:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Add product to liked products
router.post("/like", authenticate, async (req, res) => {
    console.log("✅ Incoming request body:", req.body);

    const { productId, name, price, image, description } = req.body;
    const userId = req.user.id || req.user.userId;  // Support both id and userId from token payload

    if (!productId || !name || !price || !image || !description) {
        console.log("❌ Missing required fields:", req.body);
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check if the product is already liked by the user (based on the product_id and user_id)
        const [existing] = await db.query(
            "SELECT * FROM liked_products WHERE product_id = ? AND user_id = ?",
            [productId, userId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Item already liked" });
        }

        // Insert new liked product with user_id included properly
        await db.query(
            `INSERT INTO liked_products (product_id, user_id, name, price, image, description)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [productId, userId, name, price, image, description]
        );

        // Update existing rows with NULL user_id to current userId (temporary fix)
        await db.query(
            `UPDATE liked_products SET user_id = ? WHERE user_id IS NULL`,
            [userId]
        );

        // Log the liked products for debugging
        const [allLiked] = await db.query(
            "SELECT * FROM liked_products WHERE user_id = ?",
            [userId]
        );
        console.log("Current liked products for user:", allLiked);

        res.status(201).json({ message: "Product liked successfully" });
    } catch (error) {
        console.error("❌ Error adding to liked products:", error.message, error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// ✅ Remove product from liked products
router.delete("/remove/:id", authenticate, async (req, res) => {
    const productId = req.params.id; // Extracting productId from URL params
    const userId = req.user.id;

    try {
        // Deleting the liked product for the user
        await db.query(
            "DELETE FROM liked_products WHERE product_id = ? AND user_id = ?",
            [productId, userId]
        );

        res.status(200).json({ message: "Product unliked successfully" });
    } catch (error) {
        console.error("❌ Error removing from liked products:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
