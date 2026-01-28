import { apiClient } from "./apiClient";


export const MealAPI = {
    getAllMealItems: async () => {
        const res = await apiClient.get("/mealItem");
        return res;
    },
    editMealItem: async (mealItemId: number, payload: any) => {
        const res = await apiClient.patch(`/mealItem/${mealItemId}`, payload);
        return res;
    },
    deleteMealItem: async(mealItemId: number) => {
        const res = await apiClient.delete(`/mealItem/${mealItemId}`);
        return res;
    },
}
