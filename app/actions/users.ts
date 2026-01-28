import { apiClient } from "./apiClient";


export const UserAPI = {
    getAllUsers: async () => {
        const res = await apiClient.get("/users", {
            withCredentials: true,
        });
        return res;
    },
    editUser: async (userId: number, payload: any) => {
        const res = await apiClient.patch(`/users/${userId}`, payload);
        return res;
    },
    deleteUser: async(userId: number) => {
        const res = await apiClient.delete(`/users/${userId}`);
        return res;
    },
}
