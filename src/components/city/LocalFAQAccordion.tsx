"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  /** If true, answer will be rendered as HTML (for internal links) */
  html?: boolean;
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
              {faq.html ? (
                <p 
                  className="text-secondary-600 leading-relaxed [&_a]:text-primary-600 [&_a]:underline [&_a]:hover:text-primary-700"
                  dangerouslySetInnerHTML={{ __html: processText(faq.answer) }}
                />
              ) : (
                <p className="text-secondary-600 leading-relaxed">
                  {processText(faq.answer)}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Default FAQs in Spanish with geo placeholders
export const DEFAULT_CITY_FAQS_ES: FAQ[] = [
  {
    question: "¿Cuánto cuesta el alquiler de un contenedor en [CITY]?",
    answer:
      "Los precios de alquiler de contenedores en [CITY] van desde $495 por un contenedor de 10 yardas hasta $795 por uno de 40 yardas. Nuestros precios fijos incluyen entrega, recogida, un período de alquiler de 7 días y tolerancia de peso. Sin cargos ocultos ni sorpresas.",
  },
  {
    question: "¿Necesito un permiso para un contenedor en [CITY], [STATE]?",
    answer:
      "Si coloca el contenedor en su propiedad privada (entrada de auto, patio), generalmente no necesita permiso en [CITY]. Sin embargo, si necesita colocarlo en la vía pública, es posible que necesite un permiso de Obras Públicas de [CITY]. Le ayudamos con el proceso si es necesario.",
  },
  {
    question: "¿Cuán rápido puedo recibir un contenedor en [CITY]?",
    answer:
      "Ofrecemos entrega el mismo día o al día siguiente en [CITY] y áreas cercanas. Para proyectos urgentes, llámenos directamente y haremos lo posible para ajustarnos a su horario. La mayoría de entregas se pueden coordinar en 24 horas.",
  },
  {
    question: "¿Qué tamaño de contenedor necesito para mi proyecto en [CITY]?",
    answer:
      "El tamaño correcto depende de su proyecto: 10 yardas para limpiezas pequeñas y remodelaciones de baño, 20 yardas (el más popular) para renovaciones de cocina y techos, 30-40 yardas para construcciones mayores o limpieza de toda la casa. ¿No está seguro? Llámenos.",
  },
  {
    question: "¿Qué puedo poner en un contenedor en [CITY]?",
    answer:
      "Se aceptan la mayoría de desechos domésticos y de construcción: muebles, electrodomésticos (sin refrigerantes), desechos de jardín, materiales de construcción, tejas y basura general. Artículos prohibidos: materiales peligrosos, neumáticos, baterías, pintura y electrónicos.",
  },
  {
    question: "¿Por cuánto tiempo puedo tener el contenedor en [CITY]?",
    answer:
      "Nuestro período estándar de alquiler es de 7 días, suficiente para la mayoría de proyectos residenciales en [CITY]. ¿Necesita más tiempo? Las extensiones están disponibles por solo $15/día. Solo avísenos antes de que termine su período.",
  },
  {
    question: "¿Ofrecen alquiler de contenedores para obras de construcción en [CITY]?",
    answer:
      "¡Sí! Servimos a contratistas y empresas de construcción en [CITY] y [STATE]. Ofrecemos contenedores de 20, 30 y 40 yardas ideales para desechos de construcción, demolición y remodelación. Podemos organizar recogidas regulares para proyectos en curso.",
  },
  {
    question: "¿Qué pasa si supero el límite de peso en [CITY]?",
    answer:
      "Si su contenedor supera la tolerancia de peso incluida, hay un cargo adicional de $75 por tonelada extra. Solo cobramos por el exceso real. Para evitarlo, elija un tamaño mayor si dispone de materiales pesados como concreto o tejas.",
  },
  {
    question: "¿Puedo colocar un contenedor en mi entrada en [CITY] sin dañarla?",
    answer:
      "¡Sí! Usamos tablas protectoras bajo las ruedas del contenedor para evitar daños a su entrada en [CITY]. Nuestros conductores son expertos en la colocación cuidadosa y trabajarán con usted para encontrar el mejor lugar.",
  },
  {
    question: "¿Qué áreas sirven cerca de [CITY]?",
    answer:
      "Servimos [CITY] y todas las comunidades cercanas. Ya sea que esté en el centro de [CITY] o en los suburbios, podemos entregar un contenedor en su ubicación. Contáctenos para confirmar el servicio en su vecindario.",
  },
];

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
