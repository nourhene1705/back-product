const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/ProductCtrl');
const verifyRole = require('../middleware/permission');

// Protected Routes (existe juste pour les admins)
router.post('/product', verifyRole('admin'), ProductCtrl.addProduct);
router.get('/products', verifyRole('admin'), ProductCtrl.getAllProducts);

module.exports = router;

