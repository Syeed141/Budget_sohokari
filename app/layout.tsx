import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "Budget Sohokari",
  description:
    "Budget Sohokari is a smart budgeting assistant for fresh graduates and early-career workers in Dhaka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ToastProvider>
          <Navbar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

