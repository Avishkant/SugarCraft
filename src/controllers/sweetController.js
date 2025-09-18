const Sweet = require('../models/Sweet');

exports.createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = category;
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);
  try {
    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.status(200).json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSweet = async (req, res) => {
  // TODO: Add admin check
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.status(200).json({ message: 'Sweet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    if (sweet.quantity <= 0) return res.status(400).json({ message: 'Out of stock' });
    sweet.quantity -= 1;
    await sweet.save();
    res.status(200).json({ message: 'Purchase successful', sweet });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.restockSweet = async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid restock amount' });
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    sweet.quantity += amount;
    await sweet.save();
    res.status(200).json({ message: 'Restock successful', sweet });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
