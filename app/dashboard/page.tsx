import { UserAPI } from "../actions/users";
import { MealAPI } from "../actions/mealItems";
import { setInterceptorAccessToken } from "../actions/apiClient";
import { refresh } from "../actions/auth";
import ClientView from "./ClientView";
import { HttpStatus } from "../types/HttpRequest";


export default async function Page() {
    const fetchAllUsers = async () => {
        const res = await UserAPI.getAllUsers();
        if(res.status >= 400) {
            switch(res.status) {
                case HttpStatus.UNAUTHORIZED:
                    try {
                        // get access token cookie
                        const { data } = await refresh();
                        const res = await UserAPI.getAllUsers();
                        return res.data;
                    }
                    catch (e) {
                        console.error(e);
                        return [];
                    }
                default:
                    console.error(res.status);
            }
        }
        return res.data;
    }
    const fetchMealItems = async () => {
        const res = await MealAPI.getAllMealItems();
        if(res.status >= 400) {
            switch(res.status) {
                case HttpStatus.UNAUTHORIZED:
                    try {
                        // get access token cookie
                        const { data } = await refresh();
                        const res = await MealAPI.getAllMealItems();
                        return res.data;
                    }
                    catch (e) {
                        console.error(e);
                        return [];
                    }
                default:
                    console.error(res.status);
            }
        }
        return res.data;
    }
    return (
        <ClientView 
        users={fetchAllUsers()}
        mealItems={fetchMealItems()}
        />
    )
}
