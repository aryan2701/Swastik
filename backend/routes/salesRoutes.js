// routes/salesRoutes.js
const express = require('express');
const { bookSetSale, productSale } = require('../controllers/salesController'); // Make sure both functions are imported
const { auth } = require('../middleware/auth');
const router = express.Router();

// Route for selling book sets
router.post('/book-set', auth, bookSetSale);

// Route for selling individual products
router.post('/product', auth, productSale);

module.exports = router;
