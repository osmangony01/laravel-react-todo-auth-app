import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        // "accept": "application/json",
        // "content-type": "application/json"
    }
});

export default axiosInstance;