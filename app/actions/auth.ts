import { apiClient } from "./apiClient";


export async function loginAsAdmin(payload: any) {
    try {
        const res = await apiClient.post("/auth/loginAdmin", payload, { withCredentials: true });
        if(res.status >= 300) {
            throw new Error(res.statusText);
        };
        return res;
    }
    catch (e) {
        throw e;
    }
}

export async function logout(refreshToken: string) {
    const res = await apiClient.post("/auth/logout", {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });
    return res;
}

export async function refresh() {
    const res = await apiClient.post("/auth/refresh", {}, { 
        withCredentials: true,
    });
    if(res.status >= 300) {
        throw new Error(res.statusText);
    };
    return res;
}
