import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, CheckCircle, DollarSign, Truck, Clock, Shield } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide",
  description: "Dumpster rental costs $300-$500 for a 7-day rental of a 15-20 yard container. Get transparent pricing from Dumpster Champs with no hidden fees. Call (888) 860-0710.",
  keywords: "dumpster rental cost, how much does dumpster rental cost, dumpster prices, roll off dumpster pricing, dumpster rental rates",
  openGraph: {
    title: "How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide",
    description: "Dumpster rental costs $300-$500 for a 7-day rental. Transparent pricing with no hidden fees.",
    url: "https://www.dumpsterchamps.com/how-much-does-dumpster-rental-cost",
    type: "article",
  },
};

const faqs = [
  {
    question: "How much does it cost to rent a dumpster?",
    questionEs: "¿Cuánto cuesta alquilar un contenedor?",
    answer: "Dumpster rental costs $300-$500 for a 7-day rental of a 15-20 yard container in most US markets. Prices vary by location, size, and debris type. Dumpster Champs offers transparent flat-rate pricing starting at $495 with delivery, pickup, and disposal included.",
    answerEs: "El alquiler de contenedores cuesta $300-$500 por un alquiler de 7 días de un contenedor de 15-20 yardas en la mayoría de mercados de EE.UU. Los precios varían por ubicación, tamaño y tipo de escombros. Dumpster Champs ofrece precios transparentes de tarifa plana desde $495 con entrega, recogida y disposición incluidas.",
  },
  {
    question: "What is the cheapest dumpster to rent?",
    questionEs: "¿Cuál es el contenedor más económico para alquilar?",
    answer: "A 10-yard dumpster is the cheapest option, typically costing $250-$350 for a 7-day rental. This size is ideal for small cleanouts, single room remodels, or garage cleanouts with 2-3 pickup truck loads of debris.",
    answerEs: "Un contenedor de 10 yardas es la opción más económica, con un costo típico de $250-$350 por un alquiler de 7 días. Este tamaño es ideal para limpiezas pequeñas, remodelaciones de un solo cuarto o limpiezas de garaje con 2-3 cargas de camioneta.",
  },
  {
    question: "How much does a 20 yard dumpster cost?",
    questionEs: "¿Cuánto cuesta un contenedor de 20 yardas?",
    answer: "A 20-yard dumpster costs $350-$450 for a 7-day rental. This is the most popular size for home renovation projects, kitchen and bathroom remodels, and roofing jobs. It holds approximately 6 pickup truck loads of debris.",
    answerEs: "Un contenedor de 20 yardas cuesta $350-$450 por un alquiler de 7 días. Este es el tamaño más popular para proyectos de renovación del hogar, remodelaciones de cocina y baño, y trabajos de techado. Cabe aproximadamente 6 cargas de camioneta de escombros.",
  },
  {
    question: "Are there hidden fees with dumpster rental?",
    questionEs: "¿Hay cargos ocultos en el alquiler de contenedores?",
    answer: "Many dumpster companies charge hidden fees for fuel surcharges, environmental fees, and overweight charges. Dumpster Champs offers transparent pricing with delivery, pickup, 7-day rental, and disposal included. Overweight fees only apply if you exceed the weight limit.",
    answerEs: "Muchas empresas de contenedores cobran cargos ocultos por combustible, cargos ambientales y exceso de peso. Dumpster Champs ofrece precios transparentes con entrega, recogida, alquiler de 7 días y disposición incluidos. Los cargos por exceso de peso solo aplican si superas el límite de peso.",
  },
  {
    question: "What factors affect dumpster rental prices?",
    questionEs: "¿Qué factores afectan los precios de alquiler de contenedores?",
    answer: "Dumpster rental prices are affected by container size, rental duration, debris type (mixed waste vs. heavy materials), your location, and local disposal fees. Heavy materials like concrete cost more due to weight limits.",
    answerEs: "Los precios de alquiler de contenedores se ven afectados por el tamaño del contenedor, la duración del alquiler, el tipo de escombros (residuos mixtos vs. materiales pesados), tu ubicación y las tarifas locales de disposición. Los materiales pesados como concreto cuestan más por los límites de peso.",
  },
];

const pricingData = [
  { size: "10 Yard", price: "$495", dimensions: '12\' x 8\' x 3.5\'', capacity: "2-3 pickup loads", bestFor: "Small cleanouts, single room remodels", bestForEs: "Limpiezas pequeñas, remodelaciones de un cuarto" },
  { size: "15 Yard", price: "$550", dimensions: '14\' x 8\' x 4\'', capacity: "4-5 pickup loads", bestFor: "Medium projects, garage cleanouts", bestForEs: "Proyectos medianos, limpiezas de garaje" },
  { size: "20 Yard", price: "$595", dimensions: '22\' x 8\' x 4\'', capacity: "6 pickup loads", bestFor: "Kitchen/bath remodels, roofing", bestForEs: "Remodelaciones de cocina/baño, techado" },
  { size: "30 Yard", price: "$695", dimensions: '22\' x 8\' x 6\'', capacity: "9 pickup loads", bestFor: "Large renovations, estate cleanouts", bestForEs: "Renovaciones grandes, limpiezas de herencia" },
  { size: "40 Yard", price: "$795", dimensions: '22\' x 8\' x 8\'', capacity: "12 pickup loads", bestFor: "Commercial projects, new construction", bestForEs: "Proyectos comerciales, nueva construcción" },
];

const includedFeatures = [
  { icon: Truck, text: "Free delivery to your location", textEs: "Entrega gratis a tu ubicación" },
  { icon: Clock, text: "7-day rental period included", textEs: "Período de alquiler de 7 días incluido" },
  { icon: Truck, text: "Free pickup when you're done", textEs: "Recogida gratis cuando termines" },
  { icon: DollarSign, text: "Disposal fees included (up to weight limit)", textEs: "Tarifas de disposición incluidas (hasta el límite de peso)" },
  { icon: Shield, text: "Driveway protection boards", textEs: "Tablas de protección para la entrada" },
  { icon: CheckCircle, text: "No hidden fuel surcharges", textEs: "Sin recargos ocultos por combustible" },
];

export default async function HowMuchDoesDumpsterRentalCostPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <>
      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Rental Cost", url: "https://www.dumpsterchamps.com/how-much-does-dumpster-rental-cost" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600">{isEs ? 'Inicio' : 'Home'}</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary-900">{isEs ? 'Costo de Alquiler de Contenedor' : 'Dumpster Rental Cost'}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Answer Box - Critical for PAA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-lg font-bold text-blue-900 mb-2">{isEs ? 'Respuesta Rápida' : 'Quick Answer'}</h2>
            <p className="text-blue-800 mb-2">
              {isEs ? <><strong>¿Cuánto cuesta alquilar un contenedor?</strong></> : <><strong>How much does it cost to rent a dumpster?</strong></>}
            </p>
            <p className="text-blue-700">
              {isEs ? <>El alquiler de contenedores cuesta <strong>$300-$500</strong> por un alquiler de 7 días de un contenedor de 15-20 yardas. El propietario promedio paga <strong>$375-$450</strong> por un contenedor residencial estándar. En Dumpster Champs, nuestros precios de tarifa plana empiezan en <strong>$495</strong> sin cargos ocultos.</> : <>Dumpster rental costs <strong>$300-$500</strong> for a 7-day rental of a 15-20 yard container. The average homeowner pays <strong>$375-$450</strong> for a standard residential dumpster. At Dumpster Champs, our flat-rate pricing starts at <strong>$495</strong> with no hidden fees.</>}
            </p>
          </div>

          {/* H1 with year for freshness */}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            {isEs ? '¿Cuánto Cuesta Alquilar un Contenedor? [2026] Guía de Precios' : 'How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide'}
          </h1>

          <p className="text-lg text-secondary-700 mb-8">
            {isEs ? 'Los precios de alquiler de contenedores dependen del tamaño del contenedor, la duración del alquiler, el tipo de escombros y tu ubicación. En Dumpster Champs, ofrecemos precios transparentes de tarifa plana con entrega, recogida y disposición incluidos — sin cargos sorpresa al final.' : 'Dumpster rental pricing depends on container size, rental duration, debris type, and your location. At Dumpster Champs, we offer straightforward flat-rate pricing with delivery, pickup, and disposal included—no surprise fees at the end.'}
          </p>

          {/* Pricing Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Costo de Alquiler de Contenedor por Tamaño' : 'Dumpster Rental Cost by Size'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Tamaño' : 'Size'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Precio' : 'Price'}</th>
                    <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">{isEs ? 'Dimensiones' : 'Dimensions'}</th>
                    <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">{isEs ? 'Capacidad' : 'Capacity'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Ideal Para' : 'Best For'}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((item, index) => (
                    <tr key={item.size} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-4 font-semibold text-secondary-900">{item.size}</td>
                      <td className="px-4 py-4 text-primary-600 font-bold text-lg">{item.price}</td>
                      <td className="px-4 py-4 text-secondary-600 hidden md:table-cell">{item.dimensions}</td>
                      <td className="px-4 py-4 text-secondary-600 hidden sm:table-cell">{item.capacity}</td>
                      <td className="px-4 py-4 text-secondary-700">{isEs ? item.bestForEs : item.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-secondary-500 mt-4">
              {isEs ? '* Los precios mostrados son de tarifa plana por alquiler de 7 días incluyendo entrega, recogida y disposición. Los precios pueden variar según la ubicación.' : '* Prices shown are flat-rate for 7-day rental including delivery, pickup, and disposal. Prices may vary by location.'}
            </p>
          </section>

          {/* What's Included */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? '¿Qué Está Incluido en el Precio?' : "What's Included in the Price?"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {includedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <feature.icon className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-secondary-700">{isEs ? feature.textEs : feature.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Factors Affecting Price */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? '¿Qué Factores Afectan los Precios de Alquiler de Contenedores?' : 'What Factors Affect Dumpster Rental Prices?'}
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">{isEs ? '1. Tamaño del Contenedor' : '1. Container Size'}</h3>
                <p className="text-secondary-600">{isEs ? 'Los contenedores más grandes cuestan más. Un contenedor de 40 yardas cuesta aproximadamente un 60% más que uno de 10 yardas.' : 'Larger dumpsters cost more. A 40-yard dumpster costs roughly 60% more than a 10-yard.'}</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">{isEs ? '2. Duración del Alquiler' : '2. Rental Duration'}</h3>
                <p className="text-secondary-600">{isEs ? 'Los alquileres estándar incluyen 7 días. Las extensiones típicamente cuestan $10-20 por día.' : 'Standard rentals include 7 days. Extensions typically cost $10-20 per day.'}</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">{isEs ? '3. Tipo de Escombros' : '3. Debris Type'}</h3>
                <p className="text-secondary-600">{isEs ? 'Los materiales pesados como concreto, ladrillo o tierra pueden incurrir en cargos adicionales por los límites de peso.' : 'Heavy materials like concrete, brick, or dirt may incur additional fees due to weight limits.'}</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">{isEs ? '4. Tu Ubicación' : '4. Your Location'}</h3>
                <p className="text-secondary-600">{isEs ? 'Los precios varían por región según las tarifas locales de disposición y la competencia del mercado.' : 'Prices vary by region based on local disposal fees and market competition.'}</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">{isEs ? '5. Exceso de Peso' : '5. Weight Overages'}</h3>
                <p className="text-secondary-600">{isEs ? 'Superar los límites de peso típicamente cuesta $50-100 por tonelada sobre la asignación incluida.' : 'Exceeding weight limits typically costs $50-100 per ton over the included allowance.'}</p>
              </div>
            </div>
          </section>

          {/* Related Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Preguntas Relacionadas' : 'Related Questions'}
            </h2>

            <div className="space-y-4">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/what-size-dumpster-do-i-need" className="hover:text-primary-600">
                    {isEs ? '¿Qué tamaño de contenedor necesito?' : 'What size dumpster do I need?'}
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  {isEs ? <>La mayoría de propietarios necesita un contenedor de 15-20 yardas. Usa nuestra <Link href="/calculator" className="text-primary-600 hover:underline">calculadora de tamaños gratis</Link>{" "}para obtener una recomendación personalizada basada en tu proyecto.</> : <>Most homeowners need a 15-20 yard dumpster. Use our{" "}<Link href="/calculator" className="text-primary-600 hover:underline">free size calculator</Link>{" "}to get a personalized recommendation based on your project.</>}
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/do-i-need-permit-for-dumpster" className="hover:text-primary-600">
                    {isEs ? '¿Necesito un permiso para un contenedor?' : 'Do I need a permit for a dumpster?'}
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  {isEs ? 'Solo si lo colocas en propiedad pública (calle o acera). El colocarlo en la entrada no requiere permiso en la mayoría de ciudades.' : 'Only if placing on public property (street or sidewalk). Driveway placement requires no permit in most cities.'}
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? '¿Por Cuánto Tiempo Puedo Tener un Contenedor?' : 'How long can I keep a dumpster?'}</h3>
                <p className="text-secondary-600">
                  {isEs ? 'Los alquileres estándar incluyen 7 días. ¿Necesitas más tiempo? Las extensiones están disponibles por $10-20 por día según tu ubicación.' : 'Standard rentals include 7 days. Need more time? Extensions are available for $10-20 per day depending on your location.'}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-secondary-200 rounded-lg p-4">
                  <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? faq.questionEs : faq.question}</h3>
                  <p className="text-secondary-600">{isEs ? faq.answerEs : faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isEs ? 'Obtén el Precio de tu Contenedor en 60 Segundos' : 'Get Your Dumpster Price in 60 Seconds'}
            </h2>
            <p className="text-primary-100 mb-6">
              {isEs ? 'Llama ahora para precios instantáneos u obtén una cotización gratis en línea. Sin cargos ocultos, sin sorpresas.' : 'Call now for instant pricing or get a free quote online. No hidden fees, no surprises.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18888600710"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (888) 860-0710
              </a>

              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors border border-primary-500"
              >
                {isEs ? 'Obtener Cotización Gratis en Línea' : 'Get Free Quote Online'}
              </Link>
            </div>
          </section>

          {/* Last Updated - Freshness signal for AI */}
          <p className="text-center text-sm text-secondary-400 mt-8">
            {isEs ? 'Última actualización: Enero 2026' : 'Last updated: January 2026'}
          </p>
        </div>
      </main>
    </>
  );
}
