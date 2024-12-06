'use client';

import { Suspense } from "react";
import Footer from "@/components/templates/base/footer";
import Header from "@/components/templates/base/header";
import { Toaster } from "@/components/ui/toaster";
import TopFooter from "@/components/templates/base/TopFooter";
import { usePathname } from "next/navigation";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Exclude TopFooter for specific routes
  const excludeTopFooter = ["/contact-us"].includes(pathname);

  return (
    <>
      <Header />
      <Suspense>{children}</Suspense>
      {!excludeTopFooter && <TopFooter />}
      <Footer />
      <Toaster />
    </>
  );
}
