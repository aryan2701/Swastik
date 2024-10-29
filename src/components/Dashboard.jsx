// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'
const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <h2>Choose an Action</h2>
            <button onClick={() => navigate('/add-product')}>Add Product</button>
            <button onClick={() => navigate('/add-bookset')}>Add Bookset</button>
        </div>
    );
};

export default Dashboard;
