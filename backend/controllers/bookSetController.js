// controllers/bookSetController.js
const BookSet = require('../models/BookSet');



// Create a new book set
exports.createBookSet = async (req, res) => {
  try {
    const { school, className, books, setPrice, totalQuantity } = req.body;

    // Create a new book set with the provided data
    const newBookSet = new BookSet({
      school,
      className,
      books,
      setPrice,
      totalQuantity
    });

    // Save the book set to the database
    await newBookSet.save();

    res.status(201).json(newBookSet);
  } catch (error) {
    console.error('Error creating book set:', error);
    res.status(500).json({ message: 'Error creating book set' });
  }
};


// Fetch all book sets
exports.getBookSets = async (req, res) => {
  try {
    const bookSets = await BookSet.find(); // Retrieve all book sets
    res.json(bookSets);
  } catch (error) {
    console.error('Error fetching book sets:', error);
    res.status(500).json({ message: 'Error fetching book sets' });
  }
};