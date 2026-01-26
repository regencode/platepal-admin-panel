import { apiClient } from "./apiClient";


export async function loginAsAdmin(payload: any) {
    try {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        const res = await apiClient.post("/auth/loginAdmin", payload, { withCredentials: true });
        if(res.status >= 300) {
            throw new Error(res.statusText);
        };
        return res.data;
    }
    catch (e) {
        throw e;
    }
}

export async function logout() {
    const res = await apiClient.post("/auth/logout", {}, {
        withCredentials: true,
    });
    return res;
}

export async function refresh() {
    const res = await apiClient.post("/auth/refresh", {}, {
        withCredentials: true,
    });
    return res;
}
