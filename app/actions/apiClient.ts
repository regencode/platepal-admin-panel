import "process"
import axios from "axios";


let interceptorAccessToken : string | null = null;
export const setInterceptorAccessToken = (token: string | null) => {
    interceptorAccessToken= token;
}

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
    if (interceptorAccessToken) {
        config.headers.Authorization = `Bearer ${interceptorAccessToken}`;
    }
    return config;
});

