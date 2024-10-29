import React, { useState } from 'react';
import { register } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'admin' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
        alert('User registered successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
