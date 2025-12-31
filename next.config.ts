import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

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

      // ============ FLORIDA CITIES MISSING -FL SUFFIX ============
      { source: "/dumpster-rental-boynton-beach", destination: "/dumpster-rental-boynton-beach-fl", permanent: true },
      { source: "/dumpster-rental-clearwater", destination: "/dumpster-rental-clearwater-fl", permanent: true },
      { source: "/dumpster-rental-coconut-creek", destination: "/dumpster-rental-coconut-creek-fl", permanent: true },
      { source: "/dumpster-rental-coral-gables", destination: "/dumpster-rental-coral-gables-fl", permanent: true },
      { source: "/dumpster-rental-daytona-beach", destination: "/dumpster-rental-daytona-beach-fl", permanent: true },
      { source: "/dumpster-rental-delray-beach", destination: "/dumpster-rental-delray-beach-fl", permanent: true },
      { source: "/dumpster-rental-hialeah", destination: "/dumpster-rental-hialeah-fl", permanent: true },
      { source: "/dumpster-rental-hollywood", destination: "/dumpster-rental-hollywood-fl", permanent: true },
      { source: "/dumpster-rental-jupiter", destination: "/dumpster-rental-jupiter-fl", permanent: true },
      { source: "/dumpster-rental-lakeland", destination: "/dumpster-rental-lakeland-fl", permanent: true },
      { source: "/dumpster-rental-lauderdale-lakes", destination: "/dumpster-rental-lauderdale-lakes-fl", permanent: true },
      { source: "/dumpster-rental-melbourne", destination: "/dumpster-rental-melbourne-fl", permanent: true },
      { source: "/dumpster-rental-ocoee", destination: "/dumpster-rental-ocoee-fl", permanent: true },
      { source: "/dumpster-rental-ormond-beach", destination: "/dumpster-rental-ormond-beach-fl", permanent: true },
      { source: "/dumpster-rental-palm-bay", destination: "/dumpster-rental-palm-bay-fl", permanent: true },
      { source: "/dumpster-rental-palm-beach-gardens", destination: "/dumpster-rental-palm-beach-gardens-fl", permanent: true },
      { source: "/dumpster-rental-palm-coast", destination: "/dumpster-rental-palm-coast-fl", permanent: true },
      { source: "/dumpster-rental-pembroke-pines", destination: "/dumpster-rental-pembroke-pines-fl", permanent: true },
      { source: "/dumpster-rental-plantation", destination: "/dumpster-rental-plantation-fl", permanent: true },
      { source: "/dumpster-rental-pompano-beach", destination: "/dumpster-rental-pompano-beach-fl", permanent: true },
      { source: "/dumpster-rental-port-orange", destination: "/dumpster-rental-port-orange-fl", permanent: true },
      { source: "/dumpster-rental-port-st-lucie", destination: "/dumpster-rental-port-st-lucie-fl", permanent: true },
      { source: "/dumpster-rental-riviera-beach", destination: "/dumpster-rental-riviera-beach-fl", permanent: true },
      { source: "/dumpster-rental-royal-palm-beach", destination: "/dumpster-rental-royal-palm-beach-fl", permanent: true },
      { source: "/dumpster-rental-st-petersburg", destination: "/dumpster-rental-st-petersburg-fl", permanent: true },
      { source: "/dumpster-rental-wellington", destination: "/dumpster-rental-wellington-fl", permanent: true },
      { source: "/dumpster-rental-west-palm-beach", destination: "/dumpster-rental-west-palm-beach-fl", permanent: true },
      { source: "/dumpster-rental-weston", destination: "/dumpster-rental-weston-fl", permanent: true },
      { source: "/dumpster-rental-winter-haven", destination: "/dumpster-rental-winter-haven-fl", permanent: true },
      { source: "/dumpster-rental-winter-springs", destination: "/dumpster-rental-winter-springs-fl", permanent: true },

      // ============ NEW JERSEY CITIES ============
      { source: "/dumpster-rental-jersey-city", destination: "/dumpster-rental-jersey-city-nj", permanent: true },

      // ============ CORRUPTED/MALFORMED SLUGS ============
      { source: "/dumpster-rental-jackson-al81662586", destination: "/dumpster-rental-jackson-al", permanent: true },

      // ============ MORE FLORIDA CITIES MISSING -FL ============
      { source: "/dumpster-rental-miami-gardens", destination: "/dumpster-rental-miami-gardens-fl", permanent: true },
      { source: "/dumpster-rental-altamonte-springs", destination: "/dumpster-rental-altamonte-springs-fl", permanent: true },
      { source: "/dumpster-rental-north-miami", destination: "/dumpster-rental-north-miami-fl", permanent: true },
      { source: "/dumpster-rental-north-lauderdale", destination: "/dumpster-rental-north-lauderdale-fl", permanent: true },
      { source: "/dumpster-rental-pinellas-park", destination: "/dumpster-rental-pinellas-park-fl", permanent: true },
      { source: "/dumpster-rental-pensacola", destination: "/dumpster-rental-pensacola-fl", permanent: true },
      { source: "/dumpster-rental-ocala", destination: "/dumpster-rental-ocala-fl", permanent: true },
      { source: "/dumpster-rental-tamarac", destination: "/dumpster-rental-tamarac-fl", permanent: true },
      { source: "/dumpster-rental-margate", destination: "/dumpster-rental-margate-fl", permanent: true },
      { source: "/dumpster-rental-hallandale-beach", destination: "/dumpster-rental-hallandale-beach-fl", permanent: true },
      { source: "/dumpster-rental-davie", destination: "/dumpster-rental-davie-fl", permanent: true },
      { source: "/dumpster-rental-coral-springs", destination: "/dumpster-rental-coral-springs-fl", permanent: true },
      { source: "/dumpster-rental-apopka", destination: "/dumpster-rental-apopka-fl", permanent: true },
      { source: "/dumpster-rental-north-miami-beach", destination: "/dumpster-rental-north-miami-beach-fl", permanent: true },
      { source: "/dumpster-rental-sanford", destination: "/dumpster-rental-sanford-fl", permanent: true },
      { source: "/dumpster-rental-bradenton", destination: "/dumpster-rental-bradenton-fl", permanent: true },

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

      // ============ SYSTEM/FEED PAGES ============
      { source: "/tos", destination: "/", permanent: true },
      { source: "/feed/rss2", destination: "/blog", permanent: true },

      // ============ CASE SENSITIVITY FIXES ============
      { source: "/dumpster-rental-Victorville-CA", destination: "/dumpster-rental-victorville-ca", permanent: true },
    ];
  },
};

export default nextConfig;
