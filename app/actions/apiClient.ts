import "process"
import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;

export const setAccessTokenStorage = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = async () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("refreshToken");
}
export const deleteRefreshToken = async () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("refreshToken");
}
export const storeRefreshToken = async (token: string) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("refreshToken", token);
}

apiClient.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


let isRefreshing = false; // this is the lock
let pendingRequests: any[] = [];

apiClient.interceptors.response.use(
    // success
    (res) => res, 
    // fail
    async (error) => {
        console.log("retry");
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) { // push to pendingRequests queue
                return new Promise((resolve, reject) => {
                    pendingRequests.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                });
            }

            isRefreshing = true;
            // try to get refreshToken
            try {
                const refreshToken = await getRefreshToken();
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });
                storeRefreshToken(data.refreshToken);
                setAccessTokenStorage(data.accessToken);
                return Promise.resolve();
            }
            catch (e) {
                // reject all
                pendingRequests.forEach((p) => p.reject(e));
                pendingRequests = [];
                
                //log out
                setAccessTokenStorage(null);
                deleteRefreshToken();
                return Promise.reject(e);
            } 
            finally {
                // no matter what, turn off lock
                isRefreshing = false;
            }
            return Promise.reject(error);
        }
    }
);





