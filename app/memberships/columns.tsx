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
export enum MembershipTier {
    FREE,
    PREMIUM
}

export type Membership = {
    id: string
    userId: number 
    tier: MembershipTier
    createdAt: string
    expiresAt: string
}

export const columns: ColumnDef<Membership>[] = [
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
