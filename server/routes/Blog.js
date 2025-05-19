const express = require('express');
const router = express.Router();
const db = require('../db'); // Your pool

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY id DESC');
    res.json(rows); // rows is an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST a new blog
router.post('/', async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = 'INSERT INTO blogs (title, content, imageUrl, createdAt) VALUES (?, ?, ?, ?)';
  
  try {
    const [result] = await db.query(query, [title, content, imageUrl, createdAt]);
    res.json({
      id: result.insertId,
      title,
      content,
      imageUrl,
      createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
});

module.exports = router;
