import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/ui/StickyCallButton";

const GTM_ID = "GTM-WSW4PWX";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dumpster Rental Near Me from $495 [2026] | Dumpster Champs",
    template: "%s | Dumpster Champs",
  },
  description:
    "Dumpster rental near me from $495. Same-day delivery on 10, 15, 20, 30 & 40 yard roll-off dumpsters. All-inclusive pricing, no hidden fees. Get a free quote!",
  keywords: [
    "dumpster rental near me",
    "dumpster rental",
    "roll off dumpster",
    "dumpster rentals",
    "dumpsters near me",
    "construction dumpster",
    "residential dumpster",
    "waste removal",
  ],
  authors: [{ name: "Dumpster Champs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dumpsterchamps.com",
    siteName: "Dumpster Champs",
    title: "Dumpster Rental Near Me from $495 [2026] | Dumpster Champs",
    description:
      "Dumpster rental near me from $495. Same-day delivery on 10-40 yard roll-off dumpsters. All-inclusive pricing, no hidden fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental Near Me from $495 [2026] | Dumpster Champs",
    description:
      "Dumpster rental near me from $495. Same-day delivery on 10-40 yard roll-off dumpsters. All-inclusive pricing, no hidden fees.",
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
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#df5f12" />

        {/* Preload critical hero images for LCP improvement */}
        <link
          rel="preload"
          href="/images/hero/hero-homeowner-desktop.jpg"
          as="image"
          type="image/jpeg"
          media="(min-width: 1024px)"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* GTM - Load after page is interactive for better LCP */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyCallButton phone={process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710"} />
      </body>
    </html>
  );
}
