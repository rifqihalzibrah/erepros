// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/templates/header";
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/templates/footer";
import RootLayoutClient from "@/components/RootLayoutClient"; // Client Component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Include the client-side logic here */}
        <Header />
        <RootLayoutClient>{children}</RootLayoutClient>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
