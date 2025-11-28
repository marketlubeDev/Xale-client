import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

// Create default axios instance
const axiosInstance = axios.create({
  baseURL: URL || "https://api.example.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    // You can add any default headers here
  },
});

// Optionally, set up interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token if present
    const token = localStorage.getItem("xale_access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example: Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here, like refreshing tokens
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosInstance;
