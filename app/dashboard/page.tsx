"use client";
import UserColumns  from "../users/columns"
import MealItemColumns  from "../mealItems/columns"
import { Button } from "@/components/ui/button";
import { UserAPI } from "../actions/users";
import UsersDataTable  from "../users/data-table";
import MealItemDataTable from "../mealItems/data-table";
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MealAPI } from "../actions/mealItems";

export default function Page() {
    const { accessToken, setAccessToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [mealItems, setMealItems] = useState([]);
    const [selectedTable, setSelectedTable] = useState<string>("users");
    const router = useRouter();


    const getDataFromAPI = async () => {
        let res = await UserAPI.getAllUsers(); 
        setUsers(res.data);
        res = await MealAPI.getAllMealItems();
        console.log(res);
        setMealItems(res.data);
        setLoading(false);
    }
    useEffect(() => {
        if(!accessToken) {
            router.replace("/");
        }
        getDataFromAPI();
    }, []);

    if(loading) {
        return null;
    }
    return (
        <SidebarProvider
        style={
            {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
        }
        >
        <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <Tabs defaultValue="users">
            <TabsList className="w-[250px] mx-[5%]">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="mealItems">MealItems</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="w-[90%] mx-auto">
                <h1>Manage your users...</h1>
                <UsersDataTable columns={UserColumns} data={users} />
            </TabsContent>
            <TabsContent value="mealItems" className="w-[90%] mx-auto">
                <h1>Manage your users' meal items...</h1>
                <MealItemDataTable columns={MealItemColumns} data={mealItems ?? []} />
            </TabsContent>
        </Tabs>
        </div>
        </div>
        </div>
        </SidebarInset>
        </SidebarProvider>
    )
}
