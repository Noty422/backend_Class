const mongoose = require('mongoose');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./service');

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

async function handleGetProducts(req, res) {
  try {
    res.status(200).json(await getAllProducts());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleGetProductById(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid product id' });

    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleCreateProduct(req, res) {
  try {
    const { name, price, description } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const product = await createProduct(name, price, description);
    res.status(201).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
}

async function handleUpdateProduct(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid product id' });

    const { name, price, description } = req.body;
    const updated = await updateProduct(id, name, price, description);
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
}

async function handleDeleteProduct(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid product id' });

    const deleted = await deleteProduct(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetProducts,
  handleGetProductById,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct
};