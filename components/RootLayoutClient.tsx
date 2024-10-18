// components/RootLayoutClient.tsx (Client Component)
"use client";

import { usePathname } from "next/navigation";
import TopFooter from "@/components/templates/TopFooter";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      {children}
      {/* Conditionally render TopFooter based on the route */}
      {pathname !== "/contact-us" && <TopFooter />}
    </>
  );
}
