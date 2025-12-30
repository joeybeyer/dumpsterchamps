import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/ui/StickyCallButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Dumpster Rentals at an Affordable Price | Dumpster Champs",
    template: "%s | Dumpster Champs",
  },
  description:
    "Rent a dumpster for your next project. We offer 10, 15, 20, 30, and 40 yard roll-off dumpsters for residential and commercial use. Get a free quote today!",
  keywords: [
    "dumpster rental",
    "roll off dumpster",
    "construction dumpster",
    "residential dumpster",
    "waste removal",
    "junk removal",
  ],
  authors: [{ name: "Dumpster Champs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dumpsterchamps.com",
    siteName: "Dumpster Champs",
    title: "Dumpster Rentals at an Affordable Price | Dumpster Champs",
    description:
      "Rent a dumpster for your next project. We offer 10, 15, 20, 30, and 40 yard roll-off dumpsters for residential and commercial use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rentals at an Affordable Price | Dumpster Champs",
    description:
      "Rent a dumpster for your next project. We offer 10, 15, 20, 30, and 40 yard roll-off dumpsters for residential and commercial use.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyCallButton phone={process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710"} />
      </body>
    </html>
  );
}
