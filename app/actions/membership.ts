import { apiClient } from "./apiClient";

export const MembershipAPI = {
    createMembership: async (userId: number, payload: any) => {
        const res = await apiClient.post("/membership", {userId: userId, ...payload}, {
            withCredentials: true
        });
        return res;
    },
    updateMembership: async (id: number, payload: any) => {
        const res = await apiClient.patch(`/membership/${id}`, payload, {
            withCredentials: true
        });
        return res;
    },
    deleteMembership: async (id: number) => {
        const res = await apiClient.delete(`/membership/${id}`, {
            withCredentials: true
        });
        return res;
    }
} 
