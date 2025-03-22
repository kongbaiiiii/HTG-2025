import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from 'next/font/google'
import Navbar from "@/utils/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Smart Finance",
  description:
    "Smart Finance is a platform for learning essential money skills that school doesn't teach you. Build financial confidence for life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pt-0 px-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
