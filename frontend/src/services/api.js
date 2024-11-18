import axios from 'axios';

const API = axios.create({ baseURL: 'http://13.232.63.176:4000/api' });

// Interceptor to attach the token to requests if logged in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
