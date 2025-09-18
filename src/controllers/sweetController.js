const Sweet = require('../models/Sweet');

exports.createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  let imageUrl = '';
  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: 'All fields required' });
  }
  if (req.file && req.file.path) {
    imageUrl = req.file.path;
  }
  try {
    const sweet = await Sweet.create({ name, category, price, quantity, image: imageUrl });
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
    const updateData = { ...req.body };
    if (req.file && req.file.path) {
      updateData.image = req.file.path;
    }
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
  const { quantity } = req.body;
  const purchaseQty = quantity && quantity > 0 ? quantity : 1;
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    if (sweet.quantity < purchaseQty) return res.status(400).json({ message: 'Not enough stock' });
    sweet.quantity -= purchaseQty;
    await sweet.save();
    res.status(200).json({ message: `Purchased ${purchaseQty} item(s)`, sweet });
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
