const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/middleware');
const {
  handleGetProducts,
  handleGetProductById,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct
} = require('./controllers');

router.get('/', verifyToken, handleGetProducts);
router.get('/:id', verifyToken, handleGetProductById);
router.post('/', verifyToken, requireAdmin, handleCreateProduct);
router.put('/:id', verifyToken, requireAdmin, handleUpdateProduct);
router.delete('/:id', verifyToken, requireAdmin, handleDeleteProduct);

module.exports = router;