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

// Update the type for mails.
export type Mail = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt: string; // Assuming createdAt is a string ISO date from the API
};

// Define the columns for mails.
export const columns: ColumnDef<Mail>[] = [
    {
        accessorKey: "firstName", // Optional, not directly used in the cell
        header: "Sender",
        cell: ({ row }) => {
            const { firstName, lastName } = row.original;
            return `${firstName} ${lastName}`;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "message",
        header: "Message",
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
                    Received At
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
            const mail = row.original;

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
                        <DropdownMenuItem>View mail</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
