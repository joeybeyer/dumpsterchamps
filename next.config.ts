import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Only use standalone output for self-hosted servers, not Vercel
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  // Standalone output only for self-hosted deployment
  ...(isVercel ? {} : {
    output: "standalone",
    outputFileTracingRoot: __dirname,
  }),

  // Enable Turbopack for faster development (optional)
  // turbopack: {},

  // Experimental features for performance
  experimental: {
    // Optimize CSS loading - reduces render-blocking CSS
    optimizeCss: true,
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },

  // Enable gzip/brotli compression headers
  compress: true,

  // Power by header (reduces response size slightly)
  poweredByHeader: false,

  // Headers for caching static assets
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ============ OLD MILWAUKEE NEIGHBORHOOD URLS ============
      { source: "/Brady-Street-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/Downtown-Milwaukee-Wisconsin", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/East-Side-of-Milwaukee", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/Historic-Third-Ward-milwaukee", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/North-Shore-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/Riverwest-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/West-Allis-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },

      // ============ TOURISM/LANDMARK PAGES (REDIRECT TO RELEVANT CITY) ============
      { source: "/beaches-in-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/brewery-tour-in-milwaukee", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/brewery-tour-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/jacksonville-riverwalk", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/miller-park", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/milwaukee-county-parks", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/milwaukee-county-zoo", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/museum-of-science-and-history", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/pabst-mansion", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/riverside-arts-market", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/riverside-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },

      // ============ FLORIDA CITIES WITH -FL SUFFIX → ACTUAL PAGES (without suffix) ============
      { source: "/dumpster-rental-boynton-beach-fl", destination: "/dumpster-rental-boynton-beach", permanent: true },
      { source: "/dumpster-rental-clearwater-fl", destination: "/dumpster-rental-clearwater", permanent: true },
      { source: "/dumpster-rental-coconut-creek-fl", destination: "/dumpster-rental-coconut-creek", permanent: true },
      { source: "/dumpster-rental-coral-gables-fl", destination: "/dumpster-rental-coral-gables", permanent: true },
      { source: "/dumpster-rental-daytona-beach-fl", destination: "/dumpster-rental-daytona-beach", permanent: true },
      { source: "/dumpster-rental-delray-beach-fl", destination: "/dumpster-rental-delray-beach", permanent: true },
      { source: "/dumpster-rental-hialeah-fl", destination: "/dumpster-rental-hialeah", permanent: true },
      { source: "/dumpster-rental-hollywood-fl", destination: "/dumpster-rental-hollywood", permanent: true },
      { source: "/dumpster-rental-jupiter-fl", destination: "/dumpster-rental-jupiter", permanent: true },
      { source: "/dumpster-rental-lakeland-fl", destination: "/dumpster-rental-lakeland", permanent: true },
      { source: "/dumpster-rental-lauderdale-lakes-fl", destination: "/dumpster-rental-lauderdale-lakes", permanent: true },
      { source: "/dumpster-rental-melbourne-fl", destination: "/dumpster-rental-melbourne", permanent: true },
      { source: "/dumpster-rental-ocoee-fl", destination: "/dumpster-rental-ocoee", permanent: true },
      { source: "/dumpster-rental-ormond-beach-fl", destination: "/dumpster-rental-ormond-beach", permanent: true },
      { source: "/dumpster-rental-palm-bay-fl", destination: "/dumpster-rental-palm-bay", permanent: true },
      { source: "/dumpster-rental-palm-beach-gardens-fl", destination: "/dumpster-rental-palm-beach-gardens", permanent: true },
      { source: "/dumpster-rental-palm-coast-fl", destination: "/dumpster-rental-palm-coast", permanent: true },
      { source: "/dumpster-rental-pembroke-pines-fl", destination: "/dumpster-rental-pembroke-pines", permanent: true },
      { source: "/dumpster-rental-plantation-fl", destination: "/dumpster-rental-plantation", permanent: true },
      { source: "/dumpster-rental-pompano-beach-fl", destination: "/dumpster-rental-pompano-beach", permanent: true },
      { source: "/dumpster-rental-port-orange-fl", destination: "/dumpster-rental-port-orange", permanent: true },
      { source: "/dumpster-rental-port-st-lucie-fl", destination: "/dumpster-rental-port-st-lucie", permanent: true },
      { source: "/dumpster-rental-riviera-beach-fl", destination: "/dumpster-rental-riviera-beach", permanent: true },
      { source: "/dumpster-rental-royal-palm-beach-fl", destination: "/dumpster-rental-royal-palm-beach", permanent: true },
      { source: "/dumpster-rental-st-petersburg-fl", destination: "/dumpster-rental-st-petersburg", permanent: true },
      { source: "/dumpster-rental-wellington-fl", destination: "/dumpster-rental-wellington", permanent: true },
      { source: "/dumpster-rental-west-palm-beach-fl", destination: "/dumpster-rental-west-palm-beach", permanent: true },
      { source: "/dumpster-rental-weston-fl", destination: "/dumpster-rental-weston", permanent: true },
      { source: "/dumpster-rental-winter-haven-fl", destination: "/dumpster-rental-winter-haven", permanent: true },
      { source: "/dumpster-rental-winter-springs-fl", destination: "/dumpster-rental-winter-springs", permanent: true },

      // ============ NEW JERSEY CITIES ============
      { source: "/dumpster-rental-jersey-city-nj", destination: "/dumpster-rental-jersey-city", permanent: true },

      // ============ CORRUPTED/MALFORMED SLUGS ============
      { source: "/dumpster-rental-jackson-al81662586", destination: "/dumpster-rental-jackson-al", permanent: true },

      // ============ MORE FLORIDA CITIES WITH -FL SUFFIX ============
      { source: "/dumpster-rental-miami-gardens-fl", destination: "/dumpster-rental-miami-gardens", permanent: true },
      { source: "/dumpster-rental-altamonte-springs-fl", destination: "/dumpster-rental-altamonte-springs", permanent: true },
      { source: "/dumpster-rental-north-miami-fl", destination: "/dumpster-rental-north-miami", permanent: true },
      { source: "/dumpster-rental-north-lauderdale-fl", destination: "/dumpster-rental-north-lauderdale", permanent: true },
      { source: "/dumpster-rental-pinellas-park-fl", destination: "/dumpster-rental-pinellas-park", permanent: true },
      { source: "/dumpster-rental-pensacola-fl", destination: "/dumpster-rental-pensacola", permanent: true },
      { source: "/dumpster-rental-ocala-fl", destination: "/dumpster-rental-ocala", permanent: true },
      { source: "/dumpster-rental-tamarac-fl", destination: "/dumpster-rental-tamarac", permanent: true },
      { source: "/dumpster-rental-margate-fl", destination: "/dumpster-rental-margate", permanent: true },
      { source: "/dumpster-rental-hallandale-beach-fl", destination: "/dumpster-rental-hallandale-beach", permanent: true },
      { source: "/dumpster-rental-davie-fl", destination: "/dumpster-rental-davie", permanent: true },
      { source: "/dumpster-rental-coral-springs-fl", destination: "/dumpster-rental-coral-springs", permanent: true },
      { source: "/dumpster-rental-apopka-fl", destination: "/dumpster-rental-apopka", permanent: true },
      { source: "/dumpster-rental-north-miami-beach-fl", destination: "/dumpster-rental-north-miami-beach", permanent: true },
      { source: "/dumpster-rental-sanford-fl", destination: "/dumpster-rental-sanford", permanent: true },
      { source: "/dumpster-rental-bradenton-fl", destination: "/dumpster-rental-bradenton", permanent: true },

      // ============ MORE MILWAUKEE TOURISM/LANDMARKS ============
      { source: "/milwaukee-county-war-memorial-center", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/milwaukee-public-market", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/harley-davidson-museum", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/milwaukee-art-museum", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/Walkers-Point-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/Bay-View-milwaukee-wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },

      // ============ MORE JACKSONVILLE TOURISM/NEIGHBORHOODS ============
      { source: "/southside-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/avondale-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/jacksonville-zoo-and-gardens", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/kingsley-plantation", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/beaches-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/ortega-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/five-points-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/fishing-st-johns-river", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/cummer-museum-of-art-and-gardens", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/springfield-neighborhood-jacksonville", destination: "/dumpster-rental-jacksonville-fl", permanent: true },

      // ============ MORE MILWAUKEE TOURISM/LANDMARKS ============
      { source: "/milwaukee-riverwalk", destination: "/dumpster-rental-milwaukee-wi", permanent: true },

      // ============ SYSTEM/FEED PAGES ============
      { source: "/tos", destination: "/", permanent: true },
      { source: "/feed/rss2", destination: "/blog", permanent: true },

      // ============ CASE SENSITIVITY FIXES ============
      { source: "/dumpster-rental-Victorville-CA", destination: "/dumpster-rental-victorville-ca", permanent: true },
      { source: "/Construction-dumpsters", destination: "/construction-dumpster-rental", permanent: true },
      { source: "/construction-dumpsters", destination: "/construction-dumpster-rental", permanent: true },

      // ============ MISSING STATE SUFFIX (GSC 404s) ============
      { source: "/dumpster-rental-bristol", destination: "/dumpster-rental-bristol-ct", permanent: true },

      // ============ MISC 404 FIXES ============
      { source: "/Brewers-Hill-Milwaukee-Wi", destination: "/dumpster-rental-milwaukee-wi", permanent: true },
      { source: "/dumpster-rental-augusta", destination: "/dumpster-rental-augusta-ga", permanent: true },
      { source: "/dumpster-rental-kansas-city", destination: "/dumpster-rental-kansas-city-mo", permanent: true },
      { source: "/cdn-cgi/:path*", destination: "/", permanent: false }, // Cloudflare paths
      { source: "/_next/static/css/:path*", destination: "/", permanent: false }, // Old CSS paths

      // ============ MALFORMED/CASE URLS ============
      { source: "/dumpster-rental-Costa-Mesa-CA", destination: "/dumpster-rental-costa-mesa-ca", permanent: true },
      { source: "/dumpster-rental-in-weston--fl", destination: "/dumpster-rental-weston", permanent: true },
      { source: "/dumpster-rental-in-weston-fl", destination: "/dumpster-rental-weston", permanent: true },
      { source: "/dumpster-rental-nationwide", destination: "/locations", permanent: true },

      // ============ CATCH-ALL: "in-" PREFIX PATTERN ============
      // Redirects /dumpster-rental-in-{city}-{state} to /dumpster-rental-{city}
      // This catches URLs like /dumpster-rental-in-miami-fl → /dumpster-rental-miami
      { source: "/dumpster-rental-in-:city-fl", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ca", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-tx", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ny", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ga", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-az", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-nc", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-oh", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-pa", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-il", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-mi", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-nj", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-va", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-wa", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-co", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-tn", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-wi", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ma", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-md", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-mn", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-mo", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-in", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-sc", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-al", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-la", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ky", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-or", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ok", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ct", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-nv", destination: "/dumpster-rental-:city", permanent: true },
      { source: "/dumpster-rental-in-:city-ut", destination: "/dumpster-rental-:city", permanent: true },

      // ============ 404 FIXES FROM GOOGLE SEARCH CONSOLE ============
      { source: "/st-johns-town-center", destination: "/dumpster-rental-jacksonville-fl", permanent: true },
      { source: "/dumpster-rental-fairfield", destination: "/locations", permanent: false },

      // ============ SLASH-SEPARATED DUMPSTER RENTAL URLS ============
      { source: "/dumpster-rental/:state", destination: "/dumpster-rental-:state", permanent: true },

      // ============ GENERIC NEIGHBORHOOD-CITY PATTERN ============
      { source: "/:slug*-neighborhood-:city", destination: "/locations", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
