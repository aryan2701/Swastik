// models/BookSet.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

const bookSetSchema = new mongoose.Schema({
  school: { type: String, required: true },
  className: { type: String, required: true },
  books: [bookSchema],
  setPrice: { type: Number, required: true },
  totalQuantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('BookSet', bookSetSchema);
