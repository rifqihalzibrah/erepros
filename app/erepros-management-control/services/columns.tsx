"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"; // Import the format function from date-fns
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUp } from "lucide-react";

// Update the type for services.
export type Service = {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    createdAt: string; // Assuming createdAt is a string ISO date from the API
};

// Define the columns for services.
export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            const isSorted = column.getIsSorted(); // Check the current sort state
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                >
                    Created At
                    {isSorted === "asc" && (
                        <ArrowUp className="ml-2 h-4 w-4 rotate-180" /> // Show arrow up
                    )}
                    {isSorted === "desc" && (
                        <ArrowUp className="ml-2 h-4 w-4" /> // Show arrow down
                    )}
                    {!isSorted && (
                        <ArrowUp className="ml-2 h-4 w-4 opacity-50" /> // Default arrow style when not sorted
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return createdAt
                ? format(new Date(createdAt), "dd MMM yyyy, HH:mm") // Format as day, month, year, and time
                : "N/A"; // Fallback if the date is missing
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const service = row.original;

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
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
