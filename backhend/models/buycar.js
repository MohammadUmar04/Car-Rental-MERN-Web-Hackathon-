const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const Buy = mongoose.model('Buy', buySchema);

module.exports = Buy;
