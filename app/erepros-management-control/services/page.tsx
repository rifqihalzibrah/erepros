"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/templates/erepros-management-control/data-table"; // Update the import path if needed
import { Service, columns } from "./columns"; // Replace with your actual column definition

import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ServicesPage() {
    const [data, setData] = useState<Service[] | null>(null); // State to hold Service data

    // Fetch data using useEffect
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/erepros-management-control/services");
                if (response.ok) {
                    const result = await response.json(); // Parse the full response
                    setData(result.data); // Extract and set the `data` array
                } else {
                    console.error("Failed to fetch Service data:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching Service data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Services</h1>
            </div>
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/erepros-management-control">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Services</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col gap-1 w-full p-4">
                    {data ? (
                        <DataTable
                            data={data}
                            columns={columns}
                        />
                    ) : (
                        <div className="text-center items-center">Loading...</div> // Show loading message while data is being fetched
                    )}
                </div>
            </div>
        </>
    );
}
