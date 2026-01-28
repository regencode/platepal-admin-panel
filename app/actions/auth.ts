import { apiClient, deleteRefreshToken } from "./apiClient";
import { storeRefreshToken, getRefreshToken } from "./apiClient";


export async function loginAsAdmin(payload: any) {
    try {
        const res = await apiClient.post("/auth/loginAdmin", payload, { withCredentials: true });
        if(res.status >= 300) {
            throw new Error(res.statusText);
        };
        storeRefreshToken(res.data.refreshToken);
        return res.data;
    }
    catch (e) {
        throw e;
    }
}

export async function logout() {
    const refreshToken = getRefreshToken();
    const res = await apiClient.post("/auth/logout", {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });
    deleteRefreshToken();
    return res;
}

export async function refresh() {
    try {
        const refreshToken = getRefreshToken();
        const res = await apiClient.post("/auth/refresh", {}, { 
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        if(res.status >= 300) {
            throw new Error(res.statusText);
        };
        storeRefreshToken(res.data.refreshToken);
        return res.data;
    }
    catch (e) {
        throw e;
    }
}
