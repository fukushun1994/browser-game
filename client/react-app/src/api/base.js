const axios = require('axios');

export default axios.create({
    baseURL: 'http://localhost:8888/index.php',
    timeout: 2000,
});