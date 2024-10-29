import React, { useState } from 'react';
import { sellProduct, sellBookSet } from '../services/api';

const SaleForm = () => {
    const [sale, setSale] = useState({ productId: '', quantity: '' });
    const [bookSetSale, setBookSetSale] = useState({ bookSetId: '', quantity: '', copies: [] });

    const handleProductSale = async (e) => {
        e.preventDefault();
        await sellProduct(sale);
        alert('Product sold successfully');
    };

    const handleBookSetSale = async (e) => {
        e.preventDefault();
        await sellBookSet(bookSetSale);
        alert('Book Set sold successfully');
    };

    return (
        <div>
            <form onSubmit={handleProductSale}>
                <h3>Sell Product</h3>
                <input type="text" placeholder="Product ID" onChange={(e) => setSale({ ...sale, productId: e.target.value })} />
                <input type="number" placeholder="Quantity" onChange={(e) => setSale({ ...sale, quantity: e.target.value })} />
                <button type="submit">Sell Product</button>
            </form>
            <form onSubmit={handleBookSetSale}>
                <h3>Sell Book Set</h3>
                <input type="text" placeholder="Book Set ID" onChange={(e) => setBookSetSale({ ...bookSetSale, bookSetId: e.target.value })} />
                <input type="number" placeholder="Quantity" onChange={(e) => setBookSetSale({ ...bookSetSale, quantity: e.target.value })} />
                {/* Add more fields for `copies` */}
                <button type="submit">Sell Book Set</button>
            </form>
        </div>
    );
};

export default SaleForm;
