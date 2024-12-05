"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Mail {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function MailsPage() {
    const [mails, setMails] = useState<Mail[] | null>(null);
    const [selectedMail, setSelectedMail] = useState<Mail | null>(null);

    useEffect(() => {
        async function fetchMails() {
            try {
                const response = await fetch("/api/erepros-management-control/mails");
                if (response.ok) {
                    const result = await response.json();
                    setMails(result.data);
                    setSelectedMail(result.data[0]);
                } else {
                    console.error("Failed to fetch mails:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching mails:", error);
            }
        }

        fetchMails();
    }, []);

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Mails</h1>
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
                            <BreadcrumbPage>Mails</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex h-[80vh] rounded-lg border border-dashed shadow-sm">
                {/* Sidebar: Mail List */}
                <div className="w-1/3 border-r overflow-y-auto p-4">
                    {mails ? (
                        mails.map((mail) => (
                            <Card
                                key={mail.id}
                                className={`mb-4 cursor-pointer transition-colors duration-200 ease-in-out ${selectedMail?.id === mail.id ? "bg-gray-200" : "bg-white"
                                    }`}
                                onClick={() => setSelectedMail(mail)}
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm font-semibold">
                                        {mail.firstName} {mail.lastName}
                                    </CardTitle>
                                    <CardDescription>{mail.email}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 line-clamp-2">{mail.message}</p>
                                </CardContent>
                                <CardFooter className="text-xs text-gray-400">
                                    {new Date(mail.createdAt).toLocaleDateString()}
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-4">Loading...</div>
                    )}
                </div>

                {/* Mail Detail View */}
                <div className="w-2/3 flex flex-col">
                    {selectedMail ? (
                        <>
                            <div className="p-4 border-b">
                                <h2 className="font-semibold">
                                    {selectedMail.firstName} {selectedMail.lastName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {selectedMail.email} -{" "}
                                    {new Date(selectedMail.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto">
                                <p>{selectedMail.message}</p>
                            </div>
                            <div className="p-4 border-t">
                                <textarea
                                    rows={3}
                                    placeholder={`Reply to ${selectedMail.firstName} ${selectedMail.lastName} ...`}
                                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                ></textarea>
                                <div className="flex justify-end">
                                    <button className="mt-2 px-4 py-2 bg-gold text-white rounded hover:bg-[#725836]">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center">
                            <p>Select a mail to view its details</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
