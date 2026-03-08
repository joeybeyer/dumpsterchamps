import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, Truck, Clock, Shield, Ruler, ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Small Dumpster Rental | 10 & 15 Yard Containers",
  description: "Small dumpster rental from $495. 10 and 15 yard dumpsters perfect for garage cleanouts, bathroom remodels & small projects. Fits in any driveway. Same-day delivery.",
  keywords: "small dumpster rental, 10 yard dumpster, 15 yard dumpster, mini dumpster rental, small roll off dumpster",
};

const SMALL_SIZES = [
  {
    size: 10,
    price: "$495",
    weightLimit: "2 tons (4,000 lbs)",
    dimensions: "12' L x 8' W x 3.5' H",
    capacity: "3-4 pickup truck loads",
    projects: [
      "Garage cleanout",
      "Small bathroom remodel",
      "Deck removal (small)",
      "Single room cleanout",
      "Yard debris cleanup",
    ],
    projectsEs: [
      "Limpieza de garaje",
      "Remodelación de baño pequeño",
      "Demolición de terraza (pequeña)",
      "Limpieza de un cuarto",
      "Limpieza de residuos del jardín",
    ],
    good: true,
  },
  {
    size: 15,
    price: "$550",
    weightLimit: "3 tons (6,000 lbs)",
    dimensions: "16' L x 7.5' W x 4' H",
    capacity: "5-6 pickup truck loads",
    projects: [
      "Kitchen remodel",
      "Flooring replacement",
      "Attic cleanout",
      "Medium renovation",
      "Multiple room cleanout",
    ],
    projectsEs: [
      "Remodelación de cocina",
      "Reemplazo de pisos",
      "Limpieza de ático",
      "Renovación mediana",
      "Limpieza de varios cuartos",
    ],
    popular: true,
  },
];

const COMPARISON = [
  { feature: "Fits in driveway", featureEs: "Cabe en la entrada", small: true, large: true },
  { feature: "Easy to load (low sides)", featureEs: "Fácil de cargar (lados bajos)", small: true, large: false },
  { feature: "Garage cleanout", featureEs: "Limpieza de garaje", small: true, large: false },
  { feature: "Major renovation", featureEs: "Renovación mayor", small: false, large: true },
  { feature: "Whole house cleanout", featureEs: "Limpieza de casa completa", small: false, large: true },
  { feature: "Lower cost", featureEs: "Menor costo", small: true, large: false },
];

const WHEN_SMALL = [
  {
    project: "Garage Cleanout",
    projectEs: "Limpieza de Garaje",
    description: "Clearing out years of accumulated stuff from a 2-car garage typically fills a 10-yard dumpster perfectly.",
    descriptionEs: "Limpiar años de cosas acumuladas de un garaje de 2 autos generalmente llena perfectamente un contenedor de 10 yardas.",
  },
  {
    project: "Bathroom Remodel",
    projectEs: "Remodelación de Baño",
    description: "A single bathroom generates a toilet, vanity, tile, and drywall. 10-yard handles it with room to spare.",
    descriptionEs: "Un baño genera un inodoro, lavabo, azulejos y tablero de yeso. El de 10 yardas lo maneja con espacio de sobra.",
  },
  {
    project: "Deck Removal",
    projectEs: "Demolición de Terraza",
    description: "A small deck (up to 200 sq ft) fits in a 10-yard. Larger decks may need a 15 or 20-yard.",
    descriptionEs: "Una terraza pequeña (hasta 200 sq ft) cabe en 10 yardas. Las terrazas más grandes pueden necesitar 15 o 20 yardas.",
  },
  {
    project: "Flooring Project",
    projectEs: "Proyecto de Pisos",
    description: "Carpet, padding, and old flooring from 1-3 rooms fits comfortably in a 10-15 yard dumpster.",
    descriptionEs: "Alfombra, almohadilla y pisos viejos de 1-3 cuartos caben cómodamente en un contenedor de 10-15 yardas.",
  },
  {
    project: "Yard Cleanup",
    projectEs: "Limpieza del Jardín",
    description: "Branches, brush, and yard waste are bulky but light. A 10-yard holds a lot of green waste.",
    descriptionEs: "Las ramas, arbustos y residuos del jardín son voluminosos pero livianos. Un contenedor de 10 yardas aguanta mucho material verde.",
  },
  {
    project: "Estate/Moving Cleanout",
    projectEs: "Limpieza de Herencia/Mudanza",
    description: "Clearing furniture and junk from a few rooms. Start with 15-yard; upgrade if needed.",
    descriptionEs: "Limpiar muebles y basura de algunos cuartos. Comienza con 15 yardas; actualiza si es necesario.",
  },
];

export default async function SmallDumpsterPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary-400 font-semibold mb-2">{isEs ? 'Contenedores Compactos' : 'Compact Containers'}</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {isEs ? 'Alquiler de Contenedores Pequeños' : 'Small Dumpster Rental'}
            </h1>
            <p className="text-xl text-secondary-200 mb-6">
              {isEs
                ? <>No pague más de lo que necesita. Nuestros contenedores de 10 y 15 yardas son perfectos para proyectos más pequeños — limpieza de garaje, remodelación de baño y limpieza de jardín. Desde solo <strong className="text-white">$495</strong>.</>
                : <>Don&apos;t pay for more than you need. Our 10 and 15-yard dumpsters are perfect for smaller projects — garage cleanouts, bathroom remodels, and yard cleanup. Starting at just <strong className="text-white">$495</strong>.</>}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                {isEs ? `Ordenar Ahora: ${phone}` : `Order Now: ${phone}`}
              </a>
              <Link
                href="/calculator"
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary-900 transition-colors"
              >
                {isEs ? 'Calcular Tu Tamaño' : 'Calculate Your Size'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Nuestras Opciones de Contenedores Pequeños' : 'Our Small Dumpster Options'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? 'Ambos tamaños caben en entradas estándar y son fáciles de cargar gracias a sus lados más bajos.' : 'Both sizes fit in standard driveways and are easy to load thanks to their lower sides.'}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SMALL_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-8 shadow-lg border-2 ${
                  item.popular ? "border-primary-500" : "border-secondary-100"
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-sm px-4 py-1 rounded-full">
                    {isEs ? 'Tamaño Pequeño Más Popular' : 'Most Popular Small Size'}
                  </span>
                )}
                {item.good && (
                  <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full">
                    {isEs ? 'Mejor Valor' : 'Best Value'}
                  </span>
                )}

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-6xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-2xl text-secondary-600">{isEs ? 'Yardas' : 'Yard'}</span>
                </div>
                <div className="text-4xl font-bold text-secondary-900 mt-3">{item.price}</div>
                <div className="text-secondary-500 mb-6">{isEs ? 'Precios todo incluido' : 'All-inclusive pricing'}</div>

                <div className="bg-secondary-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.weightLimit} included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{isEs ? 'Alquiler de 7 días incluido' : '7-day rental included'}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-semibold text-secondary-900 mb-3">{isEs ? 'Perfecto para:' : 'Perfect for:'}</p>
                  <ul className="space-y-2">
                    {(isEs ? item.projectsEs : item.projects).map((project) => (
                      <li key={project} className="flex items-center gap-2 text-secondary-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-8 block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isEs ? `Ordenar Contenedor de ${item.size} Yardas` : `Order ${item.size} Yard Dumpster`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose Small */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? '¿Cuándo es un Contenedor Pequeño la Opción Correcta?' : 'When is a Small Dumpster the Right Choice?'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? 'Los contenedores pequeños son excelentes para proyectos enfocados, de un solo cuarto, o de fin de semana.' : 'Small dumpsters work great for focused, single-room, or weekend projects.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHEN_SMALL.map((item) => (
              <div key={item.project} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">{isEs ? item.projectEs : item.project}</h3>
                <p className="text-secondary-600 text-sm">{isEs ? item.descriptionEs : item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small vs Large Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Contenedores Pequeños vs. Grandes' : 'Small vs. Large Dumpsters'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? '¿No estás seguro si el pequeño es para ti? Aquí hay una comparación rápida.' : "Not sure if small is right for you? Here's a quick comparison."}
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary-50 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary-800 text-white p-4 font-semibold">
                <div>{isEs ? 'Característica' : 'Feature'}</div>
                <div className="text-center">{isEs ? 'Pequeño (10-15 yds)' : 'Small (10-15 yd)'}</div>
                <div className="text-center">{isEs ? 'Grande (20-40 yds)' : 'Large (20-40 yd)'}</div>
              </div>
              {COMPARISON.map((item, idx) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-3 p-4 ${idx % 2 === 0 ? "bg-white" : "bg-secondary-50"}`}
                >
                  <div className="text-secondary-900">{isEs ? item.featureEs : item.feature}</div>
                  <div className="text-center">
                    {item.small ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-secondary-300">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {item.large ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-secondary-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-secondary-600 mb-4">{isEs ? '¿Necesitas algo más grande?' : 'Need something bigger?'}</p>
            <Link
              href="/dumpster-sizes"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              {isEs ? 'Ver Todos los Tamaños de Contenedores' : 'View All Dumpster Sizes'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits of Small */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Beneficios de Elegir un Contenedor Más Pequeño' : 'Benefits of Choosing a Smaller Dumpster'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">$100+</div>
              <p className="text-secondary-900 font-semibold mb-1">{isEs ? 'Ahorra Dinero' : 'Save Money'}</p>
              <p className="text-secondary-600 text-sm">
                {isEs ? 'Paga solo por la capacidad que necesitas. Un contenedor de 10 yardas cuesta $100 menos que uno de 20 yardas.' : 'Pay only for the capacity you need. A 10-yard is $100 less than a 20-yard.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">3.5&apos;</div>
              <p className="text-secondary-900 font-semibold mb-1">{isEs ? 'Lados Más Bajos' : 'Lower Sides'}</p>
              <p className="text-secondary-600 text-sm">
                {isEs ? 'Más fácil para cargar artículos pesados. Menos esfuerzo significa menos estrés.' : 'Easier to load heavy items. Less lifting means less strain.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">12&apos;</div>
              <p className="text-secondary-900 font-semibold mb-1">{isEs ? 'Espacio Compacto' : 'Compact Footprint'}</p>
              <p className="text-secondary-600 text-sm">
                {isEs ? 'Cabe en espacios reducidos. Todavía hay espacio para tu auto en la entrada.' : "Fits in tight spaces. Still room for your car in the driveway."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Preguntas Frecuentes sobre Contenedores Pequeños' : 'Small Dumpster FAQs'}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cuál es el contenedor más pequeño que puedo alquilar?' : "What's the smallest dumpster I can rent?"}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Nuestro contenedor de 10 yardas es nuestro tamaño más pequeño. Mide 12 pies de largo por 8 pies de ancho por 3.5 pies de alto — aproximadamente el tamaño de un auto pequeño. Aguanta 3-4 cargas de camioneta de escombros.'
                  : 'Our 10-yard dumpster is our smallest size. It measures 12 feet long by 8 feet wide by 3.5 feet high — about the size of a small car. It holds 3-4 pickup truck loads of debris.'}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cuánto cuesta un contenedor pequeño?' : 'How much does a small dumpster cost?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Nuestro contenedor de 10 yardas cuesta $495 y el de 15 yardas $550. Ambos precios incluyen entrega, recogida, un período de alquiler de 7 días, límite de peso (2-3 toneladas) y cargos de disposición. Sin cargos ocultos.'
                  : 'Our 10-yard is $495 and our 15-yard is $550. Both prices include delivery, pickup, a 7-day rental period, weight allowance (2-3 tons), and disposal fees. No hidden charges.'}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Qué pasa si lo lleno y necesito más espacio?' : 'What if I fill it up and need more space?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Podemos cambiar tu contenedor lleno por uno vacío. Hay un cargo adicional por el cambio. Si crees que podrías necesitar más espacio, a menudo es más económico ordenar el siguiente tamaño desde el principio.'
                  : "We can swap your full dumpster for an empty one. There's an additional haul fee for the swap. If you think you might need more space, it's often more economical to order the next size up from the start."}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cabe un contenedor pequeño en mi entrada?' : 'Will a small dumpster fit in my driveway?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Sí. Nuestro contenedor de 10 yardas mide solo 12 pies de largo — aproximadamente el largo de un auto compacto. El de 15 yardas mide 16 pies de largo. Ambos caben cómodamente en entradas residenciales estándar con espacio de sobra.'
                  : 'Yes. Our 10-yard is just 12 feet long — about the length of a compact car. The 15-yard is 16 feet long. Both fit comfortably in standard residential driveways with room to spare.'}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cómo sé si el pequeño es suficientemente grande?' : 'How do I know if small is big enough?'}
              </h3>
              <p className="text-secondary-600">
                {isEs ? (
                  <>
                    Usa nuestra{" "}
                    <Link href="/calculator" className="text-primary-600 hover:underline">calculadora de tamaño</Link>{" "}
                    para obtener una recomendación basada en tu proyecto específico. O llámanos — hemos ayudado a miles de clientes a elegir el tamaño correcto y estamos felices de asesorarte.
                  </>
                ) : (
                  <>
                    Use our{" "}
                    <Link href="/calculator" className="text-primary-600 hover:underline">size calculator</Link>{" "}
                    to get a recommendation based on your specific project. Or call us — we&apos;ve helped thousands of customers choose the right size and are happy to advise.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{isEs ? '¿Listo para Ordenar tu Contenedor Pequeño?' : 'Ready to Order Your Small Dumpster?'}</h2>
          <p className="text-xl text-secondary-300 mb-8">
            {isEs ? 'Entrega el mismo día disponible. Precios todo incluido desde $495.' : 'Same-day delivery available. All-inclusive pricing starting at $495.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
            >
              <Phone className="h-6 w-6" />
              {isEs ? `Llamar ${phone}` : `Call ${phone}`}
            </a>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-secondary-900 transition-colors"
            >
              {isEs ? '¿No estás seguro? Usa la Calculadora' : 'Not Sure? Use Calculator'}
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
          { name: "Small Dumpster Rental", url: "https://www.dumpsterchamps.com/small-dumpster-rental" },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "What is the smallest dumpster size available?", answer: "Our smallest option is the 10-yard dumpster, which is perfect for small cleanouts, garage sales, or minor renovation projects. It holds about 3-4 pickup truck loads of debris." },
          { question: "Will a small dumpster fit in my driveway?", answer: "Yes, our 10-yard dumpsters are compact and fit in most residential driveways. They measure about 12 feet long by 8 feet wide, making them ideal for tight spaces." },
          { question: "How much can I put in a small dumpster?", answer: "A 10-yard dumpster includes 2 tons (4,000 lbs) of debris allowance. This is perfect for furniture, appliances, carpeting, and small renovation debris." },
          { question: "Can I extend my rental if needed?", answer: "Yes, we offer rental extensions for all our dumpsters. Contact us before your rental period ends to arrange an extension." },
        ]}
      />
    </>
  );
}
