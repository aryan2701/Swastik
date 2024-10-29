import React, { useState } from 'react';
import { addProduct } from '../services/api';
import '../styles/Product.css';

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', category: '', price: '', stock: '' });
    const [products, setProducts] = useState([]); // State to store the list of products
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addProduct(product);
            setProducts([...products, response.data]); // Add new product to the list
            setShowPopup(true); // Show success popup
            setProduct({ name: '', category: '', price: '', stock: '' }); // Reset form fields
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={product.name} 
                    onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Category" 
                    value={product.category} 
                    onChange={(e) => setProduct({ ...product, category: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={product.price} 
                    onChange={(e) => setProduct({ ...product, price: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Stock" 
                    value={product.stock} 
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })} 
                />
                <button type="submit">Add Product</button>
            </form>

            {/* Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Product added successfully!</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}

            {/* Display the list of products */}
            <div className="product-list">
                <h3>Added Products</h3>
                {products.length > 0 ? (
                    <ul>
                        {products.map((prod, index) => (
                            <li key={index}>
                                <strong>{prod.name}</strong> - {prod.category} - ${prod.price} - {prod.stock} in stock
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products added yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductForm;
