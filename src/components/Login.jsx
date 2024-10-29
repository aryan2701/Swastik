import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Define the role state
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login verification
        if (username === 'admin1' && password === 'admin') {
            setRole('admin'); // Set role to admin
            navigate('/dashboard'); // Redirect to dashboard for admin
        } 
        else if (username === 'admin' && password === 'admin') {
            setRole('salesperson'); // Set role to salesperson
            navigate('/sell'); // Redirect to SaleForm if salesperson
        } 
        else {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
