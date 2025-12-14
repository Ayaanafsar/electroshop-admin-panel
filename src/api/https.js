import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-ecommerce-clean.onrender.com/api"
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("adminToken");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default api;
