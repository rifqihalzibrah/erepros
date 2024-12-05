"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
    IconArrowLeft,
    IconLayoutDashboard,
    IconSettings,
    IconUserCheck,
    IconHome,
    IconUsers,
    IconMail,
    IconBuildingWarehouse,
    IconHomeDollar,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const links = [
        {
            label: "Dashboard",
            href: "/erepros-management-control",
            icon: (
                <IconLayoutDashboard className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Applications",
            href: "/erepros-management-control/applications",
            icon: (
                <IconHome className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Mails",
            href: "/erepros-management-control/mails",
            icon: (
                <IconMail className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Services",
            href: "/erepros-management-control/services",
            icon: (
                <IconBuildingWarehouse className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Evaluations",
            href: "/erepros-management-control/evaluations",
            icon: (
                <IconHomeDollar className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "User",
            href: "/erepros-management-control/user",
            icon: (
                <IconUserCheck className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Teams",
            href: "/erepros-management-control/teams",
            icon: (
                <IconUsers className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/erepros-management-control/settings",
            icon: (
                <IconSettings className="h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 min-h-0">
                <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/erepros-management-control"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="flex items-center justify-center h-6 w-7 flex-shrink-0">
                <Image
                    src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-real-logo-2-1024x642.png"
                    alt="Company Logo"
                    className="w-36 md:w-48"
                    width={300}
                    height={150}
                />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                EREPROS MANAGEMENT
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="flex items-center justify-center h-6 w-7 flex-shrink-0">
                <Image
                    src="https://erepros.com/wp-content/uploads/2024/08/REAL-ESTATE-real-logo-2-1024x642.png"
                    alt="Company Logo"
                    className="w-36 md:w-48"
                    width={300}
                    height={150}
                />
            </div>
        </Link>
    );
};
