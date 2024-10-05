import Axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Constants

// Test Env

const BASE_URL_V1 = 'https://testapi.studentpro.vils.ai/api/v1';
const BASE_URL_V2 = 'https://testapi.studentpro.vils.ai/api/v2';

// Production Env

// const BASE_URL_V1 = 'https://test.studentpromlbackened2.vils.ai/api/v1';
// const BASE_URL_V2 = 'https://test.studentpromlbackened2.vils.ai/api/v2';

const SUBMIT_TEST_URL = BASE_URL_V1;
const REQUEST_TIMEOUT = 5;

// ===================================== VERSION 1 CONFIGURATIONS ============================== //

// Create Axios instance
const axiosInstance: AxiosInstance = Axios.create({
    baseURL: BASE_URL_V1,
    timeout: REQUEST_TIMEOUT * 60 * 1000, // Timeout for requests in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://testapi.studentpro.vils.ai',
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

// ===================================== VERSION 2 CONFIGURATIONS ============================== //

export const axiosV2: AxiosInstance = Axios.create({
    baseURL: BASE_URL_V2,
    timeout: REQUEST_TIMEOUT * 60 * 1000, // Timeout for requests in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://testapi.studentpro.vils.ai',
    },
});

// Request interceptor to handle requests globally
axiosV2.interceptors.request.use(
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
axiosV2.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// ===================================== SUBMIT TEST CONFIGURATIONS ============================== //

export const axiosSubmitTest: AxiosInstance = Axios.create({
    baseURL: SUBMIT_TEST_URL,
    timeout: REQUEST_TIMEOUT * 60 * 1000, // Timeout for requests in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://testapi.studentpro.vils.ai',
    },
});

// Request interceptor to handle requests globally
axiosSubmitTest.interceptors.request.use(
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
axiosSubmitTest.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);
