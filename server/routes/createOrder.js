const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/orders
router.post("/", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await instance.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

module.exports = router;
