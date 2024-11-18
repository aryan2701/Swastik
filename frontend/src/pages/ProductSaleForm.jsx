import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import API from "../services/api";

const ProductSaleForm = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelection = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) || value <= 0 ? 1 : value);
  };

  const addProductToOrder = () => {
    const product = products.find((p) => p._id === selectedProduct);
    if (!product || quantity <= 0) return;

    const newItem = {
      productId: product._id, // Save the product's _id
      productName: product.name,
      pricePerUnit: product.price,
      quantity,
      totalPrice: product.price * quantity,
    };

    setOrderItems((prevItems) => [...prevItems, newItem]);
    setTotalPrice((prevTotal) => prevTotal + newItem.totalPrice);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleProductSale = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      alert("Please add products to the order.");
      return;
    }

    try {
      // Loop through the orderItems and send individual requests
      for (const item of orderItems) {
        const saleData = {
          productId: item.productId, // Send the correct productId
          quantity: item.quantity,
        };

        console.log("Sending sale data:", saleData); // Log data before sending for debugging

        // Send individual API request for each item
        await API.post("/sales/product", saleData);
      }

      generatePDF({
        orderItems,
        totalPrice,
        date: new Date().toLocaleDateString(),
      });

      alert("Sale successful!");
      setOrderItems([]); // Clear items after successful sale
      setTotalPrice(0); // Reset total price
    } catch (error) {
      console.error("Error processing product sale:", error);
      alert("Product sale failed.");
    }
  };

  const generatePDF = (invoiceData, saleType) => {
    // Retrieve the last used receipt number from localStorage
    let receiptCounter = parseInt(
      localStorage.getItem("receiptCounter") || "1",
      10
    );

    const doc = new jsPDF({ unit: "mm", format: [58, 180] });

    // Header Section
    doc.setFontSize(9);
    doc.text("SWASTIK TRADING", 29, 8, { align: "center" });
    doc.setFontSize(8);
    doc.text("GST No. 09BQQPS2342E1ZK", 29, 13, { align: "center" });

    // Invoice Details
    doc.setFontSize(7);
    doc.text(`Date: ${invoiceData.date}`, 4, 20);
    doc.text(`Receipt No: ${receiptCounter}`, 4, 25); // Auto-incremented receipt number

    // Store Information
    doc.text("B-71, Shastripuram, Sikandra, Agra", 4, 30);
    doc.text("Contact: 9927128973, 9760018973", 4, 35);

    // Sale Type (for distinguishing different receipts like product sale, book set sale, etc.)
    doc.setFontSize(7);
    doc.text(`Sale Type: ${saleType}`, 4, 40); // Display sale type like "Product Sale" or "Book Set Sale"

    // Item Table Header
    let yPos = 47;
    doc.line(4, yPos, 54, yPos); // Top border of table
    yPos += 4;
    doc.setFontSize(7);
    doc.text("Item", 5, yPos);
    doc.text("Rate", 26, yPos, { align: "center" });
    doc.text("Qty", 38, yPos, { align: "center" });
    doc.text("Amt", 50, yPos, { align: "center" });

    // Line under header
    yPos += 2;
    doc.line(4, yPos, 54, yPos);

    // Populate Items in the Table
    yPos += 4;
    invoiceData.orderItems.forEach((item) => {
      doc.text(item.productName, 5, yPos, { maxWidth: 18 });
      doc.text(`${Math.round(item.pricePerUnit)}`, 26, yPos, {
        align: "center",
      });
      doc.text(`${item.quantity}`, 38, yPos, { align: "center" });
      doc.text(`${Math.round(item.totalPrice)}`, 50, yPos, { align: "center" });
      yPos += 4;
    });

    // Line below item rows
    doc.line(4, yPos, 54, yPos);

    // Totals Section
    yPos += 4;
    doc.text("Total", 30, yPos, { align: "right" });
    doc.text(`${Math.round(invoiceData.totalPrice)}`, 50, yPos, {
      align: "right",
    }); // Total price without rupee symbol

    // Footer
    yPos += 8;
    doc.setFontSize(6);
    doc.text("Thank you for shopping with us!", 29, yPos, { align: "center" });

    // Save the PDF
    doc.save(`${saleType}_invoice_${receiptCounter}.pdf`); // Save file with receipt type and number

    // Increment the receipt number for next sale
    receiptCounter++; // Increment the counter

    // Save the new receipt number back to localStorage
    localStorage.setItem("receiptCounter", receiptCounter);
  };

  return (
    <div>
      <h2>Product Sale</h2>
      <form onSubmit={handleProductSale}>
        <label>Search Product:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or category"
        />

        <label>Select Product:</label>
        <select value={selectedProduct} onChange={handleProductSelection}>
          <option value="">--Select Product--</option>
          {filteredProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - ₹{product.price}
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity || 1}
          onChange={handleQuantityChange}
        />

        <button type="button" onClick={addProductToOrder}>
          Add to Order
        </button>

        <div>
          <h3>Order Summary:</h3>
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                {item.productName} - ₹{item.pricePerUnit} x {item.quantity} = ₹
                {item.totalPrice}
              </li>
            ))}
          </ul>
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        </div>

        <button type="submit">Complete Sale</button>
      </form>
    </div>
  );
};

export default ProductSaleForm;
