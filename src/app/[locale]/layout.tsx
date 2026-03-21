import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/ui/StickyCallButton";
import { StickyMobileFooter } from "@/components/ui/StickyMobileFooter";
import { StickyScarcityBanner } from "@/components/ui/StickyScarcityBanner";
import { FloatingTrustBadge } from "@/components/ui/FloatingTrustBadge";
import { QuoteFormProvider } from "@/context/QuoteFormContext";
import { ClickToCallTracker } from "@/components/tracking/ClickToCallTracker";
import { locales, type Locale } from "@/i18n/config";

const GTM_ID = "GTM-WSW4PWX";
const FB_PIXEL_ID = "871249178511414";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Dumpster Rental | Same-Day from $495 | No Hidden Fees | Dumpster Champs",
    template: "%s | Dumpster Champs",
  },
  description:
    "Dumpster rental from $495. Same-day delivery on 10, 15, 20, 30 & 40 yard roll-off dumpsters nationwide. All-inclusive pricing, no hidden fees. Get a free quote!",
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
    title: "Dumpster Rental | Same-Day from $495 | No Hidden Fees | Dumpster Champs",
    description:
      "Dumpster rental from $495. Same-day delivery on 10-40 yard roll-off dumpsters nationwide. All-inclusive pricing, no hidden fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental | Same-Day from $495 | No Hidden Fees | Dumpster Champs",
    description:
      "Dumpster rental from $495. Same-day delivery on 10-40 yard roll-off dumpsters nationwide. All-inclusive pricing, no hidden fees.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#df5f12" />

        {/* Organization Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dumpster Champs",
              "url": "https://www.dumpsterchamps.com",
              "logo": "https://www.dumpsterchamps.com/logo.png",
              "telephone": "(888) 860-0710",
              "priceRange": "$$$$",
              "sameAs": [
                "https://facebook.com/dumpsterchamps",
                "https://instagram.com/dumpsterchamps"
              ]
            })
          }}
        />

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
        {/* Facebook Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* Click-to-call tracking for Facebook Pixel + GTM dataLayer */}
        <Script
          id="click-to-call-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                var link = e.target.closest('a[href^="tel:"]');
                if (!link) return;
                var phone = link.getAttribute('href').replace('tel:', '');
                var page = window.location.pathname;
                // Facebook Pixel
                if (typeof fbq === 'function') {
                  fbq('track', 'Contact', {
                    content_name: 'click_to_call',
                    content_category: 'phone_call',
                    value: 15.00,
                    currency: 'USD'
                  });
                }
                // GTM dataLayer
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'click_to_call',
                  phone_number: phone,
                  page_url: page
                });
              });
            `,
          }}
        />

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
        <NextIntlClientProvider messages={messages}>
          <QuoteFormProvider>
            <Header />
            <main className="min-h-screen pb-40 lg:pb-0">{children}</main>
            <Footer />
            <StickyCallButton phone={phone} />
            <ClickToCallTracker />
            <StickyMobileFooter />
            <StickyScarcityBanner />
            <FloatingTrustBadge />
          </QuoteFormProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
