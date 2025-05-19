import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://your-production-url.com' : 'http://localhost:3000';

const api = axios.create({
    baseURL: `${BASE_URL}/api`
});

export default api;
