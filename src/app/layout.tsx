import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// Metadata is defined in [locale]/layout.tsx to support i18n

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
