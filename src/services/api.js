import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // Ensure this matches your backend URL
});

// Authentication-related API calls
export const register = (userData) => API.post('/api/auth/register', userData);
export const login = (userData) => API.post('/api/auth/login', userData);

// Product-related API calls
export const addProduct = (productData) => API.post('/api/products', productData);

// Book set-related API calls
export const addBookSet = async (bookSetData, token) => {
    return API.post('/api/book-sets/create', bookSetData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
        },
    });
};

// Sales-related API calls
export const sellProduct = (saleData) => API.post('/api/sales/product', saleData);
export const sellBookSet = (saleData) => API.post('/api/sales/bookset', saleData);
