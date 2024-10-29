import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import BookSetForm from './components/BookSetForm';
import SaleForm from './components/SaleForm';
import Home from './components/Home';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/add-bookset" element={<BookSetForm />} />
                    <Route path="/sell" element={<SaleForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
