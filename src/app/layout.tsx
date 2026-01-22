import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dumpster Rental Near Me from $495 [2026] | Dumpster Champs",
    template: "%s | Dumpster Champs",
  },
  description:
    "Dumpster rental near me from $495. Same-day delivery on 10, 15, 20, 30 & 40 yard roll-off dumpsters. All-inclusive pricing, no hidden fees. Get a free quote!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
