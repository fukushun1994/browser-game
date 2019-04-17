const axios = require('axios');

const HOST = 'http://192.168.99.101:8888/index.php'

export const apiBase = axios.create({
    baseURL: HOST,
    timeout: 10000,
});

const apiWithToken = axios.create({
    baseURL: HOST,
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