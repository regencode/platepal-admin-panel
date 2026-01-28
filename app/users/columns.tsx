"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateNutritionGoalDialog } from "./CreateNutritionGoalDialog";
import { CreateMembershipDialog } from "./CreateMembershipDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Membership } from "../memberships/columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export enum Role {
    ADMIN,
    USER
}

export type NutritionGoal = {
    calories_kcal: number
    carbohydrates_g: number
    fat_g: number
    protein_g: number
}

export type User = {
    id: string
    name: string
    email: string 
    role: Role
    hasOnboarded: boolean
    membership: null | Membership
    nutritionGoal: null | NutritionGoal
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "hasOnboarded",
        header: "hasOnboarded?",
        cell: ({ row }) => {
            const refresh = row.getValue("hasOnboarded")
            return refresh ? "TRUE" : "FALSE";
        },
    },
    {
        accessorKey: "nutritionGoal",
        header: "nutritionGoal",
        cell: ({ row }) => {
            const value = row.getValue("nutritionGoal")
            return value ? "TRUE" : (
                <>
                    <p> No nutrition goal</p>
                    <CreateNutritionGoalDialog />
                    </>
            );
        },
    },
    {
        accessorKey: "membership",
        header: "Membership",
        cell: ({ row }) => {
            const value = row.getValue("membership")
            return value ? "TRUE" : (
            <>
                <p> No active membership</p>
                <CreateMembershipDialog />
                </>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

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
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                View user
                </DropdownMenuItem>
                <DropdownMenuItem>Edit user details...</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete user</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
export default columns;
