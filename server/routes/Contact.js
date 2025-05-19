const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: 'Please fill all fields' });

  try {
    // Insert into contacts table
    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    await db.execute(sql, [name, email, message]);

    // Optional: send acknowledgment email to sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThanks for reaching out. We received your message and will get back to you shortly.\n\nBest regards,\nEasyShop`,
    });

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
