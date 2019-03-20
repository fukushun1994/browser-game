const axios = require('axios');

export const apiBase = axios.create({
    baseURL: 'http://localhost:8888/index.php',
    timeout: 10000,
});

export const apiWithToken = axios.create({
    baseURL: 'http://localhost:8888/index.php',
    timeout: 10000,
}).interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});