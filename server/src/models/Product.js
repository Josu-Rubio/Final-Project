const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSlugs = require('mongoose-url-slugs');

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['buy', 'sell'], required: true, index: true },
    tags: [
      {
        type: String,
        enum: ['work', 'lifestyle', 'motor', 'mobile', 'comic'],
        index: true,
      },
    ],
    img: { type: String, required: true },
    thumbnail: { type: String },
    desc: { type: String, max: 140 },
    booked: { type: Boolean, required: false, default: false },
    sold: { type: Boolean, required: false, default: false },
    slug: { type: String, slug: 'name', unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

ProductSchema.statics.list = function (
  name,
  sell,
  tag,
  price,
  limit,
  skip,
  fields,
  sort,
  callback
) {
  try {
    let filter = {};
    if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
    if (sell) filter.type = sell === 'true' ? 'sell' : 'buy';
    if (tag) filter.tags = tag.toLoweCase();
    if (price) {
      let aux = price.split('-');
      if (aux.length === 2) {
        if (aux[0] === '') {
          filter.price = { $lte: aux[1] };
        } else if (aux[1] === '') {
          filter.price = { $gte: aux[0] };
        } else {
          filter.price = { $gte: aux[0], $lte: aux[1] };
        }
      }
    }
    let queryDB = Product.find(filter);
    queryDB.limit(limit);
    queryDB.skip(skip);
    queryDB.select(fields);
    if (sort) {
      let aux = sort.split('-');
      if (aux.length === 2) {
        let sort = {};
        sort[aux[0]] = '-1';
        queryDB.sort(sort);
      } else {
        queryDB.sort(sort);
      }
    }
    queryDB.populate('user').exec(callback);
  } catch (error) {
    console.log('Error executing query.');
    console.log(error);
    callback(error);
  }
};

ProductSchema.statics.deleteAll = async function () {
  try {
    await Product.deleteMany({});
  } catch (error) {
    console.log('Unable to delete products.');
    console.log(error);
  }
};

ProductSchema.statics.insertAll = async function (products) {
  try {
    await Product.insertMany(products);
  } catch (error) {
    console.log('Unable to insert products.');
    console.log(error);
  }
};

ProductSchema.statics.updateProduct = async function (id, newProduct) {
  try {
    let product = await Product.findById(id);
    if (product) {
      product.name = newProduct.name || product.name;
      product.price = newProduct.price || product.price;
      product.type = newProduct.type || product.type;
      if (newProduct.img) {
        product.img = newProduct.img;
        product.thumbnail = newProduct.thumbnail;
      } else {
        product.img = newProduct.img || product.img;
        product.thumbnail = newProduct.thumbnail || product.thumbnail;
      }
      product.tags = newProduct.tags || product.tags;
      product.desc = newProduct.desc || product.desc;
      product.booked = newProduct.booked;
      product.sold = newProduct.sold;

      await product.save();
      return Product.findById(id).populate('user');
    }
    return false;
  } catch (error) {
    console.log('Error updating product');
    console.log(error);
  }
};

ProductSchema.index({ types: 1, tags: 1 });

ProductSchema.plugin(URLSlugs('name', { maxLength: 70 }));

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
