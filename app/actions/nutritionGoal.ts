import { apiClient } from "./apiClient"

export const NutritionGoalAPI = {
    createNutritionGoal: async (userId: number, payload: any) => {
        const res = await apiClient.post("/nutrition-goals", {userId: userId, ...payload});
        return res;
    },
    updateNutritionGoal: async (id: number, payload: any) => {
        const res = await apiClient.patch(`/nutrition-goals/${id}`, payload);
        return res;
    },
    deleteNutritionGoal: async (id: number) => {
        const res = await apiClient.delete(`/nutrition-goals/${id}`);
        return res;
    }
} 
