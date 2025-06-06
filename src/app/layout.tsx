import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RegisterLicense from "@/components/RegisterLicense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HPH Travel Agency Dashboard",
  description:
    "HPH Travel Agency Dashboard is a modern and efficient admin dashboard application built with Next.js, TypeScript, and Tailwind CSS.",
  authors: [
    {
      name: "Hoang Phuc Huynh",
      url: "https://hoangphuchuynh-portfolio.vercel.app/",
    },
  ],
  icons: {
    icon: "/icons/logo.svg",
  },
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
        <RegisterLicense>{children}</RegisterLicense>
      </body>
    </html>
  );
}
