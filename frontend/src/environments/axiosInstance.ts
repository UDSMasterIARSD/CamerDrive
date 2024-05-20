import axios from 'axios';
import * as SecureStore from "expo-secure-store";
const axiosInstance = axios.create({
    baseURL: 'https://2a14-102-244-41-130.ngrok-free.app',
});

// Function to retrieve the token
const getAuthToken = () => {
    // Assuming the token is stored in localStorage
    return SecureStore.getItem('TOKEN');
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;