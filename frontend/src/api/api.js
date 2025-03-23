// import axios from "axios";
// const local = 'http://localhost:5000'
// const production = ''
// const api = axios.create({
//     baseURL : `${local}/api`
// })

// export default api
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://your-production-url.com' : 'http://localhost:3001';

const api = axios.create({
    baseURL: `${BASE_URL}/api`
});

export default api;
