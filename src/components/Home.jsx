import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    const handleLogin = (role) => {
        navigate('/login', { state: { role } });
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <h1>Stationary</h1>
            </nav>
            <div className="home-form">
                <h2>Select Your Role</h2>
                <button onClick={() => handleLogin('admin')}>Admin</button>
                <button onClick={() => handleLogin('salesperson')}>Salesperson</button>
            </div>
        </div>
    );
}

export default Home;
