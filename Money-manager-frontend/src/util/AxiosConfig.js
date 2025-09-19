import axios from "axios";
import { BASE_URL } from "./ApiEndpoints";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

// List of end points that do not require authorization
const excludeEndPoints = ["/login", "/register", "/status", "/activate", "/health"];

// request interceptor
axiosConfig.interceptors.request.use((config) => {
    const skipToken = excludeEndPoints.some((endPoint) => {
        config.url?.includes(endPoint);
    });

    if (!skipToken) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error. please try again later");
        }
    } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
});

export default axiosConfig;