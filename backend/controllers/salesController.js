const BookSet = require('../models/BookSet');
const Copy = require('../models/Copy');
const Product = require('../models/Product');

// Sale of normal products/stationary items
exports.productSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Fetch the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough stock is available
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Deduct the stock
    product.stock -= quantity;
    await product.save();

    // Respond with the sale details
    res.status(200).json({
      message: 'Product sale completed successfully',
      product: product.name,
      quantity,
      total: totalPrice,
      invoice: `Generated invoice for ${quantity} of ${product.name}`
    });
  } catch (error) {
    console.error('Error processing product sale:', error);
    res.status(500).json({ message: 'Error processing product sale' });
  }
};
// Sale of book sets (with or without copies)
exports.bookSetSale = async (req, res) => {
  try {
    const { bookSetId, quantity, copies } = req.body;

    // Retrieve the book set
    const bookSet = await BookSet.findById(bookSetId);
    if (!bookSet) {
      return res.status(400).json({ message: 'Book set not found' });
    }

    // Check if enough book sets are available
    if (bookSet.totalQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient book set quantity available' });
    }

    // Calculate book set total
    const bookSetTotalPrice = bookSet.setPrice * quantity;
    let totalPrice = bookSetTotalPrice;

    // Process copies if provided
    if (copies && Array.isArray(copies)) {
      for (const copyItem of copies) {
        const { name, quantity: copyQuantity } = copyItem;

        // Retrieve the copy by name
        const copy = await Copy.findOne({ name });
        if (!copy) {
          return res.status(400).json({ message: `Copy ${name} not found` });
        }

        // Check if enough stock is available
        const requiredStock = copyQuantity * quantity; // Calculate required stock based on quantity of book sets
        if (copy.stock < requiredStock) {
          return res.status(400).json({ message: `Insufficient stock for ${name}` });
        }

        // Add copy price to total
        totalPrice += copy.price * requiredStock;

        // Deduct the stock
        copy.stock -= requiredStock;
        await copy.save();
      }
    }

    // Deduct the sold quantity from the book set total quantity
    bookSet.totalQuantity -= quantity;
    await bookSet.save(); // Save the updated book set

    res.json({
      message: 'Book set sale completed successfully',
      total: totalPrice,
      invoice: `Invoice for ${quantity} of ${bookSet.className} with specified copies`
    });
  } catch (error) {
    console.error('Error processing book set sale:', error);
    res.status(500).json({ message: 'Error processing book set sale' });
  }
};