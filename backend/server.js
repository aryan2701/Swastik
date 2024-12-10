// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//const cors = require('cors'); // Import CORS

// Load environment variables
dotenv.config();

// Initialize app and connect to database
const app = express();
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use CORS middleware
const cors = require("cors");
app.use(cors({
    origin: "http://3.110.166.73", // Allow only the frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow PUT and DELETE
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/book-sets', require('./routes/bookSetRoutes'));
app.use('/api/copies', require('./routes/copyRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
