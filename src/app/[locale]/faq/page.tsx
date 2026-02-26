import { Metadata } from "next";
import { LocalFAQAccordion } from "@/components/city/LocalFAQAccordion";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? "Preguntas Frecuentes sobre Alquiler de Contenedores | Dumpster Champs"
      : "Dumpster Rental FAQ - Pricing, Sizes & Delivery | Dumpster Champs",
    description: isEs
      ? "Respuestas a preguntas frecuentes sobre costos, tamaños, entrega y restricciones de alquiler de contenedores. Precios transparentes desde $350."
      : "Get answers to frequently asked questions about dumpster rental costs, sizing, delivery, permits, and restrictions. Transparent pricing from $350.",
    openGraph: {
      title: isEs
        ? "Preguntas Frecuentes sobre Alquiler de Contenedores"
        : "Dumpster Rental FAQ - Pricing, Sizes & Delivery",
      description: isEs
        ? "Guía completa de preguntas frecuentes sobre alquiler de contenedores, costos, tamaños, tiempos de entrega y qué puede desechar."
        : "Complete guide to dumpster rental FAQs including costs, sizing, delivery times, and what you can dispose of.",
    },
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  // AIO-Optimized FAQs: 40-60 words each, brand in first sentence, direct answer first
  const comprehensiveFAQs = isEs ? [
    // Spanish versions - Pricing
    {
      question: "¿Cuánto cuesta un contenedor de 10 yardas?",
      answer: "Dumpster Champs ofrece contenedores de 10 yardas desde $350. Este precio incluye entrega, recogida, período de alquiler de 7 días y hasta 2 toneladas de eliminación. El tamaño de 10 yardas es ideal para pequeñas limpiezas, organización de garaje o proyectos menores de renovación."
    },
    {
      question: "¿Cuánto cuesta un contenedor de 20 yardas?",
      answer: "Dumpster Champs alquila contenedores de 20 yardas desde $495. El precio cubre entrega, recogida, alquiler de 7 días y hasta 3 toneladas de eliminación. Este popular contenedor mediano funciona bien para remodelaciones de cocina, proyectos de techado hasta 1,500 pies cuadrados y limpiezas medianas."
    },
    {
      question: "¿Cuánto cuesta un contenedor de 30 yardas?",
      answer: "Dumpster Champs ofrece contenedores de 30 yardas desde $595. Esto incluye entrega, recogida, alquiler de 7 días y hasta 4 toneladas de eliminación. El contenedor de 30 yardas es ideal para proyectos grandes de renovación, escombros de construcción nueva y limpiezas comerciales importantes."
    },
    {
      question: "¿Cuánto cuesta un contenedor de 40 yardas?",
      answer: "Dumpster Champs ofrece contenedores de 40 yardas desde $695. La tarifa incluye entrega, recogida, alquiler de 7 días y hasta 5 toneladas de eliminación. Este tamaño más grande maneja demolición comercial, limpiezas de almacén y proyectos de construcción a gran escala eficientemente."
    },
    {
      question: "¿Hay cargos ocultos con el alquiler de contenedores?",
      answer: "Dumpster Champs usa precios transparentes sin cargos ocultos. Su precio cotizado incluye entrega, recogida, período de alquiler y límite de peso. Los cargos adicionales aplican solo si excede el límite de peso o mantiene el contenedor más allá del período de alquiler—ambos divulgados por adelantado."
    },
    // Spanish - Delivery
    {
      question: "¿Qué tan rápido puedo recibir un contenedor?",
      answer: "Dumpster Champs ofrece entrega tan rápido como el siguiente día hábil en la mayoría de las áreas de servicio. Llame antes de las 10 AM y la entrega el mismo día puede estar disponible dependiendo de su ubicación y disponibilidad actual. La entrega de fin de semana está disponible en mercados selectos."
    },
    {
      question: "¿Cómo funciona la entrega del contenedor?",
      answer: "Dumpster Champs entrega su contenedor directamente a su entrada o sitio de trabajo. Nuestro conductor coloca el contenedor donde usted especifique, usando tablas de madera para proteger su superficie. Recibirá una llamada 30 minutos antes de la llegada para guiar la colocación si es necesario."
    },
    {
      question: "¿Cómo programo la recogida del contenedor?",
      answer: "Dumpster Champs hace la recogida fácil—simplemente llame o vaya en línea cuando termine de llenar su contenedor. Típicamente recogemos dentro de 24-48 horas de su solicitud. No necesita estar en casa; solo asegúrese de que el contenedor sea accesible y no esté demasiado lleno."
    },
    {
      question: "¿Puedo recibir un contenedor los fines de semana?",
      answer: "Dumpster Champs proporciona entrega los sábados en la mayoría de los mercados. La entrega los domingos es limitada pero disponible en áreas selectas. Los alquileres de fin de semana siguen los mismos precios que el servicio entre semana. Reserve temprano para entrega de fin de semana ya que los espacios se llenan rápidamente durante temporadas altas."
    },
    // Spanish - Size & Capacity
    {
      question: "¿Qué tamaño de contenedor necesito para una limpieza del hogar?",
      answer: "Dumpster Champs recomienda un contenedor de 10 yardas para limpiezas de una habitación o uno de 20 yardas para proyectos de toda la casa. El de 10 yardas sostiene aproximadamente 3-4 cargas de camioneta pickup, mientras que el de 20 yardas maneja 7-8 cargas—suficiente para la mayoría de los trabajos residenciales de limpieza."
    },
    {
      question: "¿Qué tamaño de contenedor necesito para un proyecto de techado?",
      answer: "Dumpster Champs sugiere un contenedor de 20 yardas para techos hasta 1,500 pies cuadrados o uno de 30 yardas para techos más grandes hasta 3,000 pies cuadrados. Las tejas son pesadas, así que los límites de peso del contenedor importan más que el volumen para estos proyectos."
    },
    {
      question: "¿Qué tamaño de contenedor necesito para una renovación?",
      answer: "Dumpster Champs recomienda un contenedor de 20 yardas para remodelaciones de cocina o baño y uno de 30 yardas para renovaciones de toda la casa. Considere los materiales involucrados—paneles de yeso y madera llenan espacio rápidamente, mientras que baldosas y concreto agregan peso. Nuestro equipo puede ayudarle a elegir el tamaño correcto."
    },
    {
      question: "¿Cuánto peso puede sostener un contenedor?",
      answer: "Los límites de peso de Dumpster Champs varían por tamaño: 10 yardas sostiene 2 toneladas, 20 yardas sostiene 3 toneladas, 30 yardas sostiene 4 toneladas, y 40 yardas sostiene 5 toneladas. Exceder su límite de peso incurre cargos adicionales de $50-75 por tonelada adicional, dependiendo de su ubicación."
    },
    // Spanish - Rental Terms
    {
      question: "¿Por cuánto tiempo puedo mantener un contenedor de alquiler?",
      answer: "Dumpster Champs incluye un período de alquiler estándar de 7 días con cada contenedor. ¿Necesita más tiempo? Las extensiones están disponibles por $10-15 por día adicional, dependiendo de su ubicación. Solo llame antes de que termine su período de alquiler para evitar interrupciones del servicio."
    },
    {
      question: "¿Puedo extender mi período de alquiler del contenedor?",
      answer: "Dumpster Champs ofrece extensiones de alquiler flexibles a $10-15 por día más allá del período incluido de 7 días. Llámenos o envíenos un mensaje antes de que expire su alquiler para extender. Mantendremos su contenedor en su lugar tanto tiempo como lo necesite para su proyecto."
    },
    // Spanish - Permits
    {
      question: "¿Necesito un permiso para un contenedor?",
      answer: "Los clientes de Dumpster Champs que colocan contenedores en propiedad privada—como una entrada—típicamente no necesitan permisos. La colocación en calles o aceras generalmente requiere un permiso de la ciudad. Los requisitos varían por municipio, así que consulte con su departamento de obras públicas local o pregúntenos por orientación en su área."
    },
    {
      question: "¿Puedo colocar un contenedor en la calle?",
      answer: "Dumpster Champs puede entregar a ubicaciones en la calle donde las regulaciones locales lo permitan. La mayoría de las ciudades requieren un permiso de derecho de paso para colocación en la calle, que típicamente cuesta $25-100 y toma 1-3 días obtener. Recomendamos la colocación en entrada cuando sea posible para evitar requisitos de permisos."
    },
    // Spanish - Acceptable Items
    {
      question: "¿Qué puedo poner en un contenedor?",
      answer: "Dumpster Champs acepta la mayoría de escombros del hogar y construcción incluyendo muebles, electrodomésticos, paneles de yeso, madera, tejas de techado, concreto, desechos de jardín y basura general. Nosotros manejamos la clasificación y reciclaje. Si no está seguro sobre un artículo específico, llámenos antes de cargar."
    },
    {
      question: "¿Qué artículos no están permitidos en un contenedor?",
      answer: "Dumpster Champs prohíbe materiales peligrosos incluyendo pintura, químicos, baterías, llantas, asbesto, desechos médicos y líquidos inflamables. Los electrodomésticos que contienen freón (refrigeradores, unidades de AC) requieren manejo especial. Los colchones pueden tener cargos adicionales en algunas áreas. Contáctenos con preguntas sobre artículos específicos."
    },
    {
      question: "¿Puedo poner concreto o tierra en un contenedor?",
      answer: "Dumpster Champs acepta concreto, ladrillo y tierra pero recomienda nuestro contenedor de 10 yardas para 'escombros pesados' diseñado para estos materiales densos. Los contenedores estándar tienen límites de peso que el concreto y la tierra alcanzan rápidamente. Mezclar materiales pesados con escombros regulares puede resultar en cargos adicionales."
    },
    // Spanish - Service Area
    {
      question: "¿Dumpster Champs entrega en mi área?",
      answer: "Dumpster Champs sirve a clientes en todo Estados Unidos con entrega en la mayoría de áreas metropolitanas y suburbios circundantes. Ingrese su código postal en nuestro sitio web para confirmar disponibilidad del servicio y obtener precios instantáneos para su ubicación específica. Las áreas rurales pueden tener disponibilidad limitada."
    },
    // Spanish - Process
    {
      question: "¿Cómo alquilo un contenedor de Dumpster Champs?",
      answer: "Dumpster Champs hace el alquiler fácil: ingrese su código postal en línea, seleccione el tamaño de su contenedor, elija una fecha de entrega y complete su reserva. Todo el proceso toma aproximadamente 60 segundos. También puede llamarnos directamente para hablar con un especialista en alquiler."
    },
    {
      question: "¿Qué pasa después de llenar mi contenedor?",
      answer: "Dumpster Champs recoge su contenedor dentro de 24-48 horas después de que solicite la remoción. Lo transportamos a una instalación con licencia donde los materiales reciclables se clasifican. Recibirá confirmación una vez que la recogida esté completa. No necesita estar presente—solo asegure acceso claro."
    },
    // Spanish - Logistics (Gemini recommended)
    {
      question: "¿Cuánto espacio se necesita para la entrega del contenedor?",
      answer: "Dumpster Champs requiere un camino despejado de aproximadamente 3 metros de ancho y 6 metros de altura libre para una entrega segura. El área de colocación debe tener al menos 6 metros de largo para acomodar el contenedor. Asegúrese de que no haya cables bajos, ramas de árboles o vehículos estacionados bloqueando el acceso del camión."
    },
    {
      question: "¿Puedo mezclar diferentes tipos de desechos en un contenedor?",
      answer: "Dumpster Champs permite mezclar la mayoría de escombros del hogar y construcción en un contenedor. Sin embargo, materiales pesados como concreto, ladrillo y tierra deben cargarse por separado en nuestros contenedores para escombros pesados. Mezclar materiales densos con basura general frecuentemente excede los límites de peso. Especifique su tipo de escombros al ordenar."
    },
    {
      question: "¿Necesito estar en casa para la entrega o recogida?",
      answer: "Dumpster Champs no requiere que esté presente para la entrega o recogida siempre que el área de descarga esté despejada. Proporcione instrucciones específicas de colocación al ordenar para que nuestros conductores sepan exactamente dónde posicionar el contenedor. Asegúrese de que las puertas estén desbloqueadas y los vehículos movidos antes de la hora programada."
    }
  ] : [
    // English versions - AIO optimized (40-60 words, brand first, direct answer)
    // Pricing FAQs (with internal links)
    {
      question: "How much does a 10-yard dumpster cost?",
      answer: "Dumpster Champs offers <a href=\"/10-yard-dumpster\">10-yard dumpster rentals</a> starting at $350. This flat-rate price includes delivery, pickup, a 7-day rental period, and up to 2 tons of waste disposal. The 10-yard size is ideal for small cleanouts, garage organizing, or minor renovation projects.",
      html: true
    },
    {
      question: "How much does a 20-yard dumpster cost?",
      answer: "Dumpster Champs rents <a href=\"/20-yard-dumpster\">20-yard dumpsters</a> starting at $495. The price covers delivery, pickup, 7-day rental, and up to 3 tons of disposal. This popular mid-size container works well for kitchen remodels, roofing projects up to 1,500 square feet, and medium-sized home cleanouts.",
      html: true
    },
    {
      question: "How much does a 30-yard dumpster cost?",
      answer: "Dumpster Champs provides <a href=\"/30-yard-dumpster\">30-yard dumpster rentals</a> from $595. This includes delivery, pickup, a 7-day rental, and up to 4 tons of disposal. The 30-yard container suits large renovation projects, new construction debris, and major estate or commercial cleanouts.",
      html: true
    },
    {
      question: "How much does a 40-yard dumpster cost?",
      answer: "Dumpster Champs offers <a href=\"/40-yard-dumpster\">40-yard dumpsters</a> starting at $695. The flat rate includes delivery, pickup, 7-day rental, and up to 5 tons of waste removal. This largest size handles commercial demolition, warehouse cleanouts, and large-scale construction projects efficiently.",
      html: true
    },
    {
      question: "Are there any hidden fees with dumpster rental?",
      answer: "Dumpster Champs uses transparent flat-rate pricing with no hidden fees. Your quoted price includes delivery, pickup, rental period, and weight allowance. Additional charges apply only if you exceed the weight limit or keep the dumpster beyond the rental period—both disclosed upfront."
    },
    // Delivery & Pickup FAQs
    {
      question: "How fast can I get a dumpster delivered?",
      answer: "Dumpster Champs offers delivery as fast as next business day in most service areas. Call before 10 AM and same-day delivery may be available depending on your location and current availability. Weekend delivery is available in select markets."
    },
    {
      question: "How does dumpster delivery work?",
      answer: "Dumpster Champs delivers your container directly to your driveway or job site. Our driver places the dumpster where you specify, using wooden boards to protect your surface. You'll receive a call 30 minutes before arrival so you can guide placement if needed."
    },
    {
      question: "How do I schedule a dumpster pickup?",
      answer: "Dumpster Champs makes pickup easy—just call or go online when you're done filling your container. We typically pick up within 24-48 hours of your request. You don't need to be home; just ensure the dumpster is accessible and not overfilled."
    },
    {
      question: "Can I get a dumpster delivered on weekends?",
      answer: "Dumpster Champs provides Saturday delivery in most markets. Sunday delivery is limited but available in select areas. Weekend rentals follow the same flat-rate pricing as weekday service. Book early for weekend delivery as slots fill quickly during peak seasons."
    },
    // Size & Capacity FAQs (with internal links)
    {
      question: "What size dumpster do I need for a home cleanout?",
      answer: "Dumpster Champs recommends a <a href=\"/10-yard-dumpster\">10-yard dumpster</a> for single-room cleanouts or a <a href=\"/20-yard-dumpster\">20-yard</a> for whole-house projects. The 10-yard holds about 3-4 pickup truck loads, while the 20-yard handles 7-8 loads—enough for most residential decluttering and cleanout jobs.",
      html: true
    },
    {
      question: "What size dumpster do I need for a roofing project?",
      answer: "Dumpster Champs suggests a <a href=\"/20-yard-dumpster\">20-yard dumpster</a> for roofs up to 1,500 square feet or a <a href=\"/30-yard-dumpster\">30-yard</a> for larger roofs up to 3,000 square feet. Roofing shingles are heavy, so container weight limits matter more than volume for these projects.",
      html: true
    },
    {
      question: "What size dumpster do I need for a renovation?",
      answer: "Dumpster Champs recommends a <a href=\"/20-yard-dumpster\">20-yard container</a> for kitchen or bathroom remodels and a <a href=\"/30-yard-dumpster\">30-yard</a> for whole-home renovations. Consider the materials involved—drywall and wood fill space quickly, while tile and concrete add weight. Our team can help you choose the right size.",
      html: true
    },
    {
      question: "How much weight can a dumpster hold?",
      answer: "Dumpster Champs weight limits vary by size: 10-yard holds 2 tons, 20-yard holds 3 tons, 30-yard holds 4 tons, and 40-yard holds 5 tons. Exceeding your weight allowance incurs overage fees of $50-75 per additional ton, depending on your location."
    },
    // Rental Terms FAQs
    {
      question: "How long can I keep a rental dumpster?",
      answer: "Dumpster Champs includes a standard 7-day rental period with every container. Need more time? Extensions are available for $10-15 per additional day, depending on your location. Just call before your rental period ends to avoid any service interruptions."
    },
    {
      question: "Can I extend my dumpster rental period?",
      answer: "Dumpster Champs offers flexible rental extensions at $10-15 per day beyond the included 7-day period. Call or message us before your rental expires to extend. We'll keep your dumpster in place as long as you need it for your project."
    },
    // Permits & Regulations FAQs
    {
      question: "Do I need a permit for a dumpster?",
      answer: "Dumpster Champs customers placing containers on private property—like a driveway—typically don't need permits. Street or sidewalk placement usually requires a city permit. Requirements vary by municipality, so check with your local public works department or ask us for guidance in your area."
    },
    {
      question: "Can I place a dumpster on the street?",
      answer: "Dumpster Champs can deliver to street locations where local regulations allow. Most cities require a right-of-way permit for street placement, which typically costs $25-100 and takes 1-3 days to obtain. We recommend driveway placement when possible to avoid permit requirements."
    },
    // Acceptable Items FAQs
    {
      question: "What can I put in a dumpster?",
      answer: "Dumpster Champs accepts most household and construction debris including furniture, appliances, drywall, wood, roofing shingles, concrete, yard waste, and general trash. We handle the sorting and recycling. If you're unsure about a specific item, call us before loading."
    },
    {
      question: "What items are not allowed in a dumpster?",
      answer: "Dumpster Champs prohibits hazardous materials including paint, chemicals, batteries, tires, asbestos, medical waste, and flammable liquids. Appliances containing freon (refrigerators, AC units) require special handling. Mattresses may have additional fees in some areas. Contact us with questions about specific items."
    },
    {
      question: "Can I put concrete or dirt in a dumpster?",
      answer: "Dumpster Champs accepts concrete, brick, and dirt but recommends our 10-yard heavy debris container designed for these dense materials. Standard dumpsters have weight limits that concrete and dirt reach quickly. Mixing heavy materials with regular debris may result in overage charges."
    },
    // Service Area FAQs
    {
      question: "Does Dumpster Champs deliver to my area?",
      answer: "Dumpster Champs serves customers across the United States with delivery in most metropolitan areas and surrounding suburbs. Enter your zip code on our website to confirm service availability and get instant pricing for your specific location. Rural areas may have limited availability."
    },
    {
      question: "Do you offer dumpster rental nationwide?",
      answer: "Dumpster Champs provides dumpster rental service throughout major cities and their surrounding areas nationwide. Visit our locations page or enter your zip code for instant confirmation of service in your area. New markets are added regularly based on customer demand."
    },
    // Process FAQs
    {
      question: "How do I rent a dumpster from Dumpster Champs?",
      answer: "Dumpster Champs makes renting easy: enter your zip code online, select your dumpster size, choose a delivery date, and complete your booking. The entire process takes about 60 seconds. You can also call us directly to speak with a rental specialist."
    },
    {
      question: "What happens after I fill my dumpster?",
      answer: "Dumpster Champs picks up your container within 24-48 hours after you request removal. We transport it to a licensed facility where recyclable materials are sorted. You'll receive confirmation once pickup is complete. No need to be present—just ensure clear access."
    },
    // Logistics FAQs (Gemini recommended)
    {
      question: "How much space is required for dumpster delivery?",
      answer: "Dumpster Champs requires a clear path approximately 10 feet wide and 20 feet of overhead clearance for safe delivery. The placement area should be at least 20 feet long to accommodate the container. Ensure no low-hanging wires, tree branches, or parked vehicles block truck access to the drop-off location."
    },
    {
      question: "Can I mix different types of waste in one dumpster?",
      answer: "Dumpster Champs allows mixing most household and construction debris in one container. However, heavy materials like concrete, brick, and dirt should be loaded separately in our heavy debris containers. Mixing dense materials with general trash often exceeds weight limits. Specify your debris type when ordering for proper disposal."
    },
    {
      question: "Do I need to be home for delivery or pickup?",
      answer: "Dumpster Champs does not require you to be present for delivery or pickup as long as the drop-off area is clear. Provide specific placement instructions when ordering so our drivers know exactly where to position the container. Ensure gates are unlocked and vehicles are moved before the scheduled arrival."
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {isEs ? 'Volver al Inicio' : 'Back to Home'}
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {isEs ? 'Preguntas Frecuentes sobre Alquiler de Contenedores' : 'Dumpster Rental FAQ'}
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                {isEs
                  ? 'Todo lo que necesita saber sobre costos, tamaños, entrega y restricciones de alquiler de contenedores. Respuestas transparentes sin cargos ocultos.'
                  : 'Everything you need to know about dumpster rental costs, sizing, delivery, and restrictions. Get transparent answers with no hidden fees.'}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <LocalFAQAccordion
                faqs={comprehensiveFAQs}
                cityName={isEs ? 'su área' : 'your area'}
                stateName={isEs ? 'su estado' : 'your state'}
              />
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                {isEs ? '¿Aún Tiene Preguntas?' : 'Still Have Questions?'}
              </h2>
              <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
                {isEs
                  ? 'Nuestro equipo está disponible para ayudarle a elegir el contenedor correcto para su proyecto y responder cualquier pregunta.'
                  : 'Our team is standing by to help you choose the right dumpster for your project and answer any questions you may have.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isEs ? 'Obtener Cotización Gratis' : 'Get Free Quote'}
                </Link>
                <a
                  href="tel:8888600710"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
                >
                  {isEs ? 'Llame Ahora: (888) 860-0710' : 'Call Now: (888) 860-0710'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Schema Markup for FAQ - JSON-LD auto-generated */}
      <FAQSchema faqs={comprehensiveFAQs} />
    </>
  );
}
