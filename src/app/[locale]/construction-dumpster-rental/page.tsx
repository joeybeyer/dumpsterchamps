import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Truck, HardHat, Clock, Shield, Recycle, AlertTriangle } from "lucide-react";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Construction Dumpster Rental | Contractor Waste Solutions",
  description: "Construction dumpster rental for contractors & job sites. 20-40 yard roll offs for debris, lumber, drywall & roofing. Same-day delivery. Volume discounts available.",
  keywords: "construction dumpster rental, contractor dumpster, job site dumpster, construction debris removal, construction waste container",
};

const CONSTRUCTION_SIZES = [
  {
    size: 20,
    price: "$595",
    weightLimit: "2 tons",
    dimensions: "22' x 7.5' x 4.5'",
    bestFor: "Small additions, single-room remodels, roof repairs",
    bestForEs: "Pequeñas adiciones, remodelaciones de un cuarto, reparaciones de techo",
  },
  {
    size: 30,
    price: "$695",
    weightLimit: "3 tons",
    dimensions: "22' x 7.5' x 6'",
    bestFor: "Major renovations, multi-room remodels, new construction",
    bestForEs: "Renovaciones mayores, remodelaciones de varios cuartos, nueva construcción",
    popular: true,
  },
  {
    size: 40,
    price: "$795",
    weightLimit: "4 tons",
    dimensions: "22' x 7.5' x 8'",
    bestFor: "Large commercial projects, whole house builds, demolition",
    bestForEs: "Proyectos comerciales grandes, construcción de casa completa, demolición",
  },
];

const ACCEPTED_MATERIALS = [
  "Lumber & wood scraps",
  "Drywall & sheetrock",
  "Roofing shingles",
  "Concrete & masonry (limited)",
  "Metal & siding",
  "Flooring materials",
  "Insulation",
  "Tile & fixtures",
  "Windows & doors",
  "Cardboard & packaging",
];

const ACCEPTED_MATERIALS_ES = [
  "Madera y recortes de madera",
  "Tablero de yeso y sheetrock",
  "Tejas de techo",
  "Concreto y mampostería (limitado)",
  "Metal y revestimiento",
  "Materiales de pisos",
  "Aislamiento",
  "Azulejos y accesorios",
  "Ventanas y puertas",
  "Cartón y embalaje",
];

const NOT_ACCEPTED = [
  "Hazardous materials",
  "Paint & solvents",
  "Asbestos-containing materials",
  "Chemicals & oils",
  "Batteries",
  "Appliances with freon",
];

const NOT_ACCEPTED_ES = [
  "Materiales peligrosos",
  "Pintura y solventes",
  "Materiales con asbesto",
  "Químicos y aceites",
  "Baterías",
  "Electrodomésticos con freón",
];

const CONTRACTOR_BENEFITS = [
  {
    title: "Same-Day Delivery",
    titleEs: "Entrega el Mismo Día",
    description: "Get a dumpster on site the same day you call. Don't let waste slow down your project.",
    descriptionEs: "Obtén un contenedor en el sitio el mismo día que llames. No dejes que los residuos retrasen tu proyecto.",
    icon: Truck,
  },
  {
    title: "Flexible Scheduling",
    titleEs: "Horarios Flexibles",
    description: "Swap outs, extensions, and pickups scheduled around your timeline — not ours.",
    descriptionEs: "Intercambios, extensiones y recogidas programadas según tu cronograma — no el nuestro.",
    icon: Clock,
  },
  {
    title: "Volume Discounts",
    titleEs: "Descuentos por Volumen",
    description: "Regular contractors save with volume pricing. The more you rent, the more you save.",
    descriptionEs: "Los contratistas regulares ahorran con precios por volumen. Cuanto más alquiles, más ahorras.",
    icon: Shield,
  },
  {
    title: "Clean Load Pricing",
    titleEs: "Precios por Carga Limpia",
    description: "Separating materials? Ask about discounted rates for clean concrete, metal, or wood loads.",
    descriptionEs: "¿Separas materiales? Pregunta por tarifas con descuento para cargas limpias de concreto, metal o madera.",
    icon: Recycle,
  },
];

export default async function ConstructionDumpsterPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary-100 border-b border-secondary-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-secondary-600">
            <Link href="/" className="hover:text-primary-600">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-primary-600">{isEs ? 'Servicios' : 'Services'}</Link>
            <span>›</span>
            <span className="text-secondary-900">{isEs ? 'Contenedores de Construcción' : 'Construction Dumpsters'}</span>
          </nav>
          <LastUpdated date="2026-01-11" className="mt-1" />
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {isEs ? 'Contenedores de Construcción' : 'Construction Dumpsters'}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                {isEs ? 'Alquiler de Contenedores para Construcción' : 'Construction Dumpster Rental'}
              </h1>
              <p className="text-xl text-secondary-600 mb-6">
                {isEs
                  ? 'Mantenga su sitio de trabajo limpio y productivo con eliminación de residuos confiable. Nuestros contenedores de construcción manejan madera, tablero de yeso, techado y todo tipo de escombros de construcción. Descuentos por volumen disponibles para contratistas.'
                  : 'Keep your job site clean and productive with reliable waste removal. Our construction dumpsters handle lumber, drywall, roofing, and all types of construction debris. Volume discounts available for contractors.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  {isEs ? `Precios para Contratistas: ${phone}` : `Get Contractor Pricing: ${phone}`}
                </a>
                <Link
                  href="/dumpster-rental-prices"
                  className="border-2 border-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
                >
                  {isEs ? 'Ver Todos los Precios' : 'View All Prices'}
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/services/construction-dumpsters.jpg"
                alt="Construction dumpster rental at job site with construction debris"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Por Qué los Contratistas Nos Eligen' : 'Why Contractors Choose Us'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs
              ? 'Entendemos que los plazos de construcción son ajustados. Nuestro servicio está diseñado para contratistas que necesitan eliminación de residuos confiable sin complicaciones.'
              : 'We understand construction timelines are tight. Our service is built for contractors who need reliable waste removal without the hassle.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {CONTRACTOR_BENEFITS.map((item) => (
              <div key={item.title} className="bg-secondary-50 rounded-xl p-6 text-center">
                <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{isEs ? item.titleEs : item.title}</h3>
                <p className="text-secondary-600 text-sm">{isEs ? item.descriptionEs : item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Sizes */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Tamaños de Contenedores de Construcción' : 'Construction Dumpster Sizes'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs
              ? 'Para proyectos de construcción, recomendamos contenedores de 20 yardas o más grandes. Estos tamaños manejan el volumen de escombros típico en sitios de trabajo.'
              : 'For construction projects, we recommend 20-yard or larger containers. These sizes handle the volume of debris typical on job sites.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CONSTRUCTION_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-6 shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    {isEs ? 'Más Popular para Construcción' : 'Most Popular for Construction'}
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-5xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-secondary-600 text-lg">{isEs ? 'Yardas' : 'Yard'}</span>
                </div>
                <div className="text-3xl font-bold text-secondary-900 mt-2">{item.price}</div>
                <div className="text-sm text-secondary-500 mb-4">{isEs ? 'Precios todo incluido' : 'All-inclusive pricing'}</div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">{isEs ? `Peso incluido: ${item.weightLimit}` : `Weight included: ${item.weightLimit}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">{isEs ? 'Período de alquiler de 7 días' : '7-day rental period'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">{isEs ? 'Entrega y recogida incluidas' : 'Delivery & pickup included'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-secondary-500">{isEs ? `Dimensiones: ${item.dimensions}` : `Dimensions: ${item.dimensions}`}</p>
                  <p className="text-sm text-secondary-700 mt-2">{isEs ? <><strong>Ideal para:</strong> {item.bestForEs}</> : <><strong>Best for:</strong> {item.bestFor}</>}</p>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-6 block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isEs ? `Ordenar ${item.size} Yardas` : `Order ${item.size} Yard`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Goes In */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Escombros de Construcción que Aceptamos' : 'Construction Debris We Accept'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="font-bold text-secondary-900 text-lg">{isEs ? 'Materiales Aceptados' : 'Accepted Materials'}</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {(isEs ? ACCEPTED_MATERIALS_ES : ACCEPTED_MATERIALS).map((material) => (
                  <li key={material} className="text-secondary-700 text-sm flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-bold text-secondary-900 text-lg">{isEs ? 'No Aceptados' : 'Not Accepted'}</h3>
              </div>
              <ul className="space-y-2">
                {(isEs ? NOT_ACCEPTED_ES : NOT_ACCEPTED).map((material) => (
                  <li key={material} className="text-secondary-700 text-sm flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    {material}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-red-700 mt-4">
                {isEs
                  ? 'Los materiales peligrosos requieren disposición especializada. Contáctenos para orientación sobre opciones de disposición adecuadas.'
                  : 'Hazardous materials require specialized disposal. Contact us for guidance on proper disposal options.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heavy Materials Note */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex gap-4">
            <HardHat className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? 'Nota sobre Materiales Pesados' : 'Note on Heavy Materials'}</h3>
              <p className="text-secondary-700">
                {isEs
                  ? 'El concreto, ladrillo, tierra y tejas de techo son pesados. Un montón pequeño puede alcanzar rápidamente los límites de peso. Para proyectos de material pesado, recomendamos:'
                  : 'Concrete, brick, dirt, and roofing shingles are heavy. A small pile can quickly reach weight limits. For heavy material projects, we recommend:'}
              </p>
              <ul className="mt-3 space-y-1 text-secondary-600">
                <li>• {isEs ? <><strong>Cargas de concreto limpio:</strong> Pregunte por tarifas de disposición con descuento</> : <><strong>Clean concrete loads:</strong> Ask about discounted disposal rates</>}</li>
                <li>• {isEs ? <><strong>Escombros pesados mixtos:</strong> Considera un contenedor más pequeño para mantenerte bajo los límites de peso</> : <><strong>Mixed heavy debris:</strong> Consider a smaller dumpster to stay under weight limits</>}</li>
                <li>• {isEs ? <><strong>Desmontaje completo de techo:</strong> Los contenedores de 30 yardas manejan la mayoría de techos residenciales</> : <><strong>Full roof tear-offs:</strong> 30-yard containers handle most residential roofs</>}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Tips */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Consejos para Gestionar los Residuos de Construcción' : 'Tips for Managing Construction Waste'}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? '1. Ordena el Tamaño Correcto' : '1. Order the Right Size'}</h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Quedarse sin espacio a mitad del proyecto significa pagar por un intercambio. Generalmente es más rentable ordenar un tamaño más grande del que crees necesitar. Llámanos para hablar sobre tu proyecto — te ayudaremos a elegir el tamaño correcto.'
                  : 'Running out of space mid-project means paying for a swap. It\'s usually more cost-effective to order one size larger than you think you need. Call us to discuss your project — we\'ll help you pick the right size.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? '2. Posiciona para la Eficiencia' : '2. Position for Efficiency'}</h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Coloca el contenedor cerca de donde se generan los escombros. Para trabajos en varios pisos, posiciónalo bajo las ventanas para una disposición fácil. Deja espacio para que el camión de entrega maniobre los días de intercambio.'
                  : 'Place the dumpster close to where debris is generated. For multi-story work, position it under windows for easy disposal. Leave room for the delivery truck to maneuver on swap days.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? '3. Separa Materiales Cuando Sea Posible' : '3. Separate Materials When Possible'}</h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Las cargas limpias de concreto, metal o madera pueden calificar para tarifas de disposición con descuento. Si tienes una gran cantidad de un solo material, pregunta por nuestros precios de carga limpia.'
                  : 'Clean loads of concrete, metal, or wood may qualify for discounted disposal rates. If you have a large amount of one material, ask about our clean load pricing.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? '4. Programa Intercambios con Anticipación' : '4. Schedule Swaps in Advance'}</h3>
              <p className="text-secondary-600">
                {isEs
                  ? '¿Sabes cuándo se llenará tu contenedor? Programa el intercambio con anticipación para evitar tiempos de inactividad. Ofrecemos intercambios el mismo día cuando es posible, pero el aviso previo garantiza la disponibilidad.'
                  : 'Know when your dumpster will be full? Schedule the swap-out ahead of time to avoid downtime. We offer same-day swaps when possible, but advance notice guarantees availability.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{isEs ? '¿Necesita un Contenedor de Construcción?' : 'Need a Construction Dumpster?'}</h2>
          <p className="text-xl text-secondary-300 mb-8">
            {isEs ? 'Entrega el mismo día disponible. Descuentos por volumen para contratistas frecuentes. Precios todo incluido.' : 'Same-day delivery available. Volume discounts for repeat contractors. All-inclusive pricing.'}
          </p>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            {isEs ? `Llamar ${phone}` : `Call ${phone}`}
          </a>
          <p className="text-secondary-400 mt-4">
            {isEs ? 'Atendiendo contratistas y obras en todo el país' : 'Serving contractors and job sites nationwide'}
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
          { name: "Construction Dumpster Rental", url: "https://www.dumpsterchamps.com/construction-dumpster-rental" },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "What size dumpster do I need for a construction project?", answer: "For construction projects, we typically recommend 20-40 yard dumpsters. A 20-yard is suitable for medium renovations, while 30-40 yards are best for new construction, major renovations, and large demolition projects." },
          { question: "Can construction debris include mixed materials?", answer: "Yes, our construction dumpsters accept mixed debris including lumber, drywall, flooring, roofing materials, fixtures, and general construction waste. Certain materials may have restrictions." },
          { question: "Do you offer roll-off dumpsters for commercial construction sites?", answer: "Yes, we offer dumpsters for commercial construction sites of all sizes. We provide scheduled pickups, same-day delivery, and can accommodate multiple containers on large job sites." },
          { question: "What is the weight limit for construction debris?", answer: "Weight limits vary by dumpster size: 10-15 yard dumpsters include 2 tons, 20-30 yard dumpsters include 3 tons, and 40 yard dumpsters include 4 tons. Additional weight fees apply for exceeding these limits." },
        ]}
      />
    </>
  );
}
