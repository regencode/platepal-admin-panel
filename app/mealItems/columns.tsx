"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export enum Role {
    ADMIN,
    USER
}
export interface MealItem {
    id: number;
    food_name: string
    estimated_portion_g: number;
    calories_kcal: number;
    protein_g: number;
    fat_g: number;
    carbohydrates_g: number;
    fiber_g?: number;
    sugar_g?: number;
    sodium_mg?: number;
    imageSrc?: string;
    imageUri?: string;
}


const columns: ColumnDef<MealItem>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "food_name",
        header: "Food Name",
    },
    {
        accessorKey: "estimated_portion_g",
        header: "Estimated Portion (g)",
    },
    {
        accessorKey: "calories_kcal",
        header: "calories_kcal",
    },
    {
        accessorKey: "protein_g",
        header: "protein_g",
    },
    {
        accessorKey: "fat_g",
        header: "fat_g",
    },
    {
        accessorKey: "carbohydrates_g",
        header: "carbohydrates_g",
    },
    {
        accessorKey: "fiber_g",
        header: "fiber_g",
    },
    {
        accessorKey: "sugar_g",
        header: "sugar_g",
    },
    {
        accessorKey: "sodium_mg",
        header: "sodium_mg",
    },
    {
        accessorKey: "imageSrc",
        header: "imageSrc",
    },
    {
        accessorKey: "imageUri",
        header: "imageUri",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            //const payment = row.original
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit meal item details...</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete meal item</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
export default columns;
