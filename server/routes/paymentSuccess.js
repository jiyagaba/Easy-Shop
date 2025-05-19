const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection

// POST /api/payment-success
router.post("/", (req, res) => {
  const { order_id, payment_id, amount, currency, status } = req.body;

  if (!order_id || !payment_id || !amount || !currency || !status) {
    return res.status(400).json({ message: "Missing payment details" });
  }

  const query = `
    INSERT INTO orders (order_id, payment_id, amount, currency, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.execute(query, [order_id, payment_id, amount, currency, status])
    .then(() => res.status(200).json({ message: "Payment saved successfully" }))
    .catch((err) => {
      console.error("❌ Error saving payment:", err);
      res.status(500).json({ message: "Database error" });
    });
});

module.exports = router;
