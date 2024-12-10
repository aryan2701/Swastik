const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, authorizeRole('admin'), addProduct);
router.get('/', auth, getProducts);
router.put('/:id', updateProduct);
router.delete('/:id',  deleteProduct);

module.exports = router;
