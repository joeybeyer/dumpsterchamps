// Dumpster pricing - flat rate includes delivery, pickup, 7-day rental, weight allowance
export const DUMPSTER_PRICING = {
  10: {
    size: 10,
    price: 495,
    weight: "1 ton",
    dimensions: "12' x 8' x 3.5'",
    capacity: "2-3 pickup truck loads",
    idealFor: [
      "Small bathroom remodels",
      "Garage cleanouts",
      "Small landscaping projects",
      "Deck removal (small)",
    ],
  },
  15: {
    size: 15,
    price: 550,
    weight: "1 ton",
    dimensions: "16' x 7.5' x 4'",
    capacity: "4-5 pickup truck loads",
    idealFor: [
      "Medium renovations",
      "Flooring removal",
      "Yard debris cleanup",
      "Estate cleanouts (small)",
    ],
  },
  20: {
    size: 20,
    price: 595,
    weight: "2 tons",
    dimensions: "22' x 7.5' x 4.5'",
    capacity: "6-8 pickup truck loads",
    popular: true,
    idealFor: [
      "Kitchen remodels",
      "Roofing projects (up to 25 squares)",
      "Large cleanouts",
      "Deck removal (large)",
    ],
  },
  30: {
    size: 30,
    price: 695,
    weight: "3 tons",
    dimensions: "22' x 7.5' x 6'",
    capacity: "9-12 pickup truck loads",
    idealFor: [
      "Major renovations",
      "Construction debris",
      "Commercial cleanouts",
      "Large roofing projects",
    ],
  },
  40: {
    size: 40,
    price: 795,
    weight: "4 tons",
    dimensions: "22' x 7.5' x 8'",
    capacity: "12-16 pickup truck loads",
    idealFor: [
      "New construction",
      "Major demolition",
      "Large commercial projects",
      "Whole-house cleanouts",
    ],
  },
} as const;

export type DumpsterSize = keyof typeof DUMPSTER_PRICING;
export type DumpsterInfo = (typeof DUMPSTER_PRICING)[DumpsterSize];

// Helper to get all sizes as array
export const DUMPSTER_SIZES = Object.values(DUMPSTER_PRICING);

// Format price for display
export function formatPrice(price: number): string {
  return `$${price}`;
}

// Get overage fee per ton
export const OVERAGE_FEE_PER_TON = 75;

// Rental period
export const STANDARD_RENTAL_DAYS = 7;
export const EXTENSION_FEE_PER_DAY = 15;
