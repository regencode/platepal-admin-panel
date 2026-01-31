import { apiClient } from "./apiClient";


export const MealAPI = {
    getAllMealItems: async () => {
        const res = await apiClient.get("/mealItem", {
            withCredentials: true
        });
        return res;
    },
    editMealItem: async (mealItemId: number, payload: any) => {
        const res = await apiClient.patch(`/mealItem/${mealItemId}`, payload, {
            withCredentials: true
        });
        return res;
    },
    deleteMealItem: async(mealItemId: number) => {
        const res = await apiClient.delete(`/mealItem/${mealItemId}`, {
            withCredentials: true
        });
        return res;
    },
}
