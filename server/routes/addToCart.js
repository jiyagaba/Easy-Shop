const express = require("express");
const router = express.Router();
const db = require("../db");
const fs = require("fs");
const path = require("path");

// Utility: Get cart items with product details
async function getCartItems(userId) {
  const [rows] = await db.execute(
    `
    SELECT 
      c.product_id, 
      c.quantity, 
      p.name, 
      p.price, 
      p.category, 
       CONCAT('http://localhost:3000/uploads/', REPLACE(p.image, 'uploads/', '')) AS img
    FROM add_to_cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
    `,
    [userId]
  );
  return rows;
}

// ✅ GET /api/cart?user_id=123
router.get("/", async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ message: "Missing user_id" });

  try {
    const cartItems = await getCartItems(userId);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ POST /api/cart
router.post("/", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [[existing]] = await db.execute(
      "SELECT * FROM add_to_cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (existing) {
      await db.execute(
        "UPDATE add_to_cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [quantity, user_id, product_id]
      );
    } else {
      await db.execute(
        "INSERT INTO add_to_cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [user_id, product_id, quantity]
      );
    }

    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ DELETE /api/cart/:productId?user_id=123
router.delete("/:productId", async (req, res) => {
  const user_id = req.query.user_id;
  const product_id = req.params.productId;

  if (!user_id) return res.status(400).json({ message: "Missing user_id" });

  try {
    // OPTIONAL: Delete image file from server (uncomment if needed)
    /*
    const [[product]] = await db.execute(
      "SELECT p.image FROM add_to_cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ? AND c.product_id = ?",
      [user_id, product_id]
    );

    if (product?.image) {
      const imagePath = path.join(__dirname, "../uploads", product.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    */

    await db.execute(
      "DELETE FROM add_to_cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// PUT /api/cart/:productId - Update quantity of a product in cart
router.put("/:productId", async (req, res) => {
  const user_id = req.body.user_id;
  const product_id = req.params.productId;
  const quantity = req.body.quantity;

  if (!user_id || quantity == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [[existing]] = await db.execute(
      "SELECT * FROM add_to_cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (!existing) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      // Remove product if quantity is zero or less
      await db.execute(
        "DELETE FROM add_to_cart WHERE user_id = ? AND product_id = ?",
        [user_id, product_id]
      );
    } else {
      // Update quantity
      await db.execute(
        "UPDATE add_to_cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [quantity, user_id, product_id]
      );
    }

    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error updating cart quantity:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/cart/clear - Clear all cart items for a user
router.post("/clear", async (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "Missing user_id" });
  }

  try {
    await db.execute("DELETE FROM add_to_cart WHERE user_id = ?", [user_id]);
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
