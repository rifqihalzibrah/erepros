// app/layout.tsx (Server Component)
import Footer from "@/components/templates/base/footer";
import Header from "@/components/templates/base/header";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </>
  );
}
