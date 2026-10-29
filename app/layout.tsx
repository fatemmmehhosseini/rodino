import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "رودینو",
  description: "پلتفرم کشف و رزرو رویدادها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}