const axios = require('axios');

export const apiBase = axios.create({
    baseURL: 'http://localhost:8888/index.php',
    timeout: 10000,
});

const apiWithToken = axios.create({
    baseURL: 'http://localhost:8888/index.php',
    timeout: 10000,
});
apiWithToken.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export { apiWithToken as apiWithToken };