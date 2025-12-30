"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

interface LocalFAQAccordionProps {
  faqs: FAQ[];
  cityName: string;
  stateName: string;
}

export function LocalFAQAccordion({ faqs, cityName, stateName }: LocalFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Replace placeholders in questions/answers with city/state
  const processText = (text: string): string => {
    return text
      .replace(/\[CITY\]/g, cityName)
      .replace(/\[STATE\]/g, stateName)
      .replace(/\{city\}/gi, cityName)
      .replace(/\{state\}/gi, stateName);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.id || index}
          className="bg-white rounded-lg border border-secondary-200 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-secondary-50 transition-colors"
          >
            <span className="font-semibold text-secondary-900">
              {processText(faq.question)}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-secondary-500 transition-transform flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-secondary-600 leading-relaxed">
                {processText(faq.answer)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Default FAQs with geo placeholders - PAA optimized with geo modifiers
export const DEFAULT_CITY_FAQS: FAQ[] = [
  {
    question: "How much does dumpster rental cost in [CITY]?",
    answer:
      "Dumpster rental prices in [CITY] range from $495 for a 10-yard container to $795 for a 40-yard container. Our flat-rate pricing includes delivery, pickup, a 7-day rental period, and weight allowance. No hidden fees or surprise charges.",
  },
  {
    question: "Do I need a permit for a dumpster in [CITY], [STATE]?",
    answer:
      "If you're placing the dumpster on your private property (driveway, yard), you typically don't need a permit in [CITY]. However, if you need to place it on a public street or right-of-way, you may need a permit from [CITY] Public Works. We can help guide you through the permit process if needed.",
  },
  {
    question: "How fast can I get a dumpster delivered in [CITY]?",
    answer:
      "We offer same-day and next-day dumpster delivery throughout [CITY] and surrounding areas. For urgent projects, call us directly and we'll do our best to accommodate your schedule. Most deliveries can be arranged within 24 hours.",
  },
  {
    question: "What size dumpster do I need for my project in [CITY]?",
    answer:
      "The right size depends on your project: 10-yard for small cleanouts and bathroom remodels, 20-yard (our most popular) for kitchen renovations and roofing projects, 30-40 yard for major construction or whole-house cleanouts. Not sure? Call us and we'll help you choose the right size for your [CITY] project.",
  },
  {
    question: "What can I put in a dumpster in [CITY]?",
    answer:
      "Most household and construction debris is accepted: furniture, appliances (without refrigerants), yard waste, construction materials, roofing shingles, and general junk. Prohibited items include hazardous materials, tires, batteries, paint, and electronics. [CITY] may have additional recycling requirements - we can advise on local regulations.",
  },
  {
    question: "How long can I keep the dumpster in [CITY]?",
    answer:
      "Our standard rental period is 7 days, which works for most [CITY] residential projects. Need more time? Extensions are available for just $15/day. Just let us know before your rental period ends.",
  },
  {
    question: "Do you offer dumpster rental for construction sites in [CITY]?",
    answer:
      "Yes! We serve contractors and construction companies throughout [CITY] and [STATE]. We offer 20, 30, and 40-yard dumpsters ideal for construction debris, demolition, and remodeling projects. We can arrange regular pickups for ongoing projects.",
  },
  {
    question: "What happens if I go over the weight limit in [CITY]?",
    answer:
      "If your dumpster exceeds the included weight allowance, there's an overage fee of $75 per additional ton. We'll weigh the container at the disposal facility and only charge for actual overage. To avoid this, choose a larger size if you're disposing of heavy materials like concrete or roofing shingles.",
  },
  {
    question: "Can I place a dumpster on my driveway in [CITY] without damage?",
    answer:
      "Yes! We use driveway protection boards under the dumpster wheels to prevent damage to your [CITY] driveway. Our drivers are experienced in careful placement and will work with you to find the best spot that's accessible for loading and pickup.",
  },
  {
    question: "What areas do you serve near [CITY]?",
    answer:
      "We serve [CITY] and all surrounding communities. Whether you're in downtown [CITY] or the suburbs, we can deliver a dumpster to your location. Contact us to confirm service in your specific neighborhood.",
  },
];
