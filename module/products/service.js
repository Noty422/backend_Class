const Product = require('./model');

async function getAllProducts() {
  return Product.find().sort({ createdAt: -1 });
}

async function getProductById(id) {
  return Product.findById(id);
}

async function createProduct(name, price, description) {
  return Product.create({ name, price, description });
}

async function updateProduct(id, name, price, description) {
  return Product.findByIdAndUpdate(
    id,
    { name, price, description },
    { new: true, runValidators: true }
  );
}

async function deleteProduct(id) {
  const deleted = await Product.findByIdAndDelete(id);
  return !!deleted;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };