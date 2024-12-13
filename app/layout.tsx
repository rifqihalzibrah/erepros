// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "EREPROS",
    description: "Elite Real Estate & Professionals Management",
    icons: {
        icon: '/favicon.ico',          // For standard browsers
        shortcut: '/favicon.ico',      // For Safari pinned tabs, etc.
        apple: '/apple-touch-icon.png' // If you have iOS icons
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                {/* Include the client-side logic here */}
                {children}
            </body>
        </html>
    );
}
