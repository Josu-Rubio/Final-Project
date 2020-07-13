const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sale: { type: Boolean, required: true },
    tag: { type: [String], required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', Product);
