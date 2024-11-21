"use client";

import { usePathname } from "next/navigation";
import TopFooter from "@/components/templates/base/TopFooter";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determine if the current path should exclude the TopFooter
  const shouldExcludeFooter =
    pathname === "/contact-us" ||
    pathname.startsWith("/erepros-management-control");

  return (
    <>
      {children}
      {/* Conditionally render TopFooter based on the route */}
      {!shouldExcludeFooter && <TopFooter />}
    </>
  );
}
