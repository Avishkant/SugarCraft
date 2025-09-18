const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }, // Cloudinary image URL
});

module.exports = mongoose.model('Sweet', sweetSchema);
