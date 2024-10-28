// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app and connect to database
const app = express();
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/book-sets', require('./routes/bookSetRoutes'));
app.use('/api/copies', require('./routes/copyRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));

// Add the products route here
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
