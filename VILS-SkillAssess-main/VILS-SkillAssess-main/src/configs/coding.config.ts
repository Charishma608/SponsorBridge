import Axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Constants
const BASE_URL_V1 = 'https://test.codepro.vils.ai/api/v1';
const REQUEST_TIMEOUT = 5;

// Create Axios instance
const axiosInstance: AxiosInstance = Axios.create({
    baseURL: BASE_URL_V1,
    timeout: REQUEST_TIMEOUT * 60 * 1000, // Timeout for requests in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://testapi.studentpro.vils.ai',
    },
});

// Request interceptor to handle requests globally
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Ensure credentials are included with cross-origin requests
        config.withCredentials = true;
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
