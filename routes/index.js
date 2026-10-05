const express = require('express');
const router = express.Router();
const authRoutes = require('../module/auth/route');
const productRoutes = require('../module/products/route');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;