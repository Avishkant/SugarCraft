const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Sweet = require('../models/Sweet');

router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Inventory data' });
});

// Update quantity (admin only)
router.put('/:id/quantity', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
