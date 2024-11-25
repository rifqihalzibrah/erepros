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

// Define the type for evaluations.
export type Evaluation = {
    id: string;
    fullName: string;
    email: string;
    phone: number;
    createdAt: string;
    evaluationStatus: string;
};

// Define the columns for evaluations.
export const columns: ColumnDef<Evaluation>[] = [
    {
        accessorKey: "fullName",
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
        accessorKey: "evaluationStatus",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const evaluation = row.original;

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
                        <DropdownMenuItem>View Evaluation</DropdownMenuItem>
                        <DropdownMenuItem>Download Report</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
