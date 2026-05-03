import type { Metadata } from "next";
import ToastProvider from "@/components/ui/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter Dashboard",
  description: "Generic Next.js Starter Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
