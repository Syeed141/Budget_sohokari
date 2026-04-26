import type { Metadata } from "next";
import { Courier_Prime, Special_Elite } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const displayFont = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

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
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className={`${bodyFont.className} min-h-screen antialiased`}>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

