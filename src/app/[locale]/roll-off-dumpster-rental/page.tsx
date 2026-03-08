import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Truck, Clock, Shield, ArrowRight, HardHat, Home, Building } from "lucide-react";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Roll Off Dumpster Rental | Open-Top Container Delivery",
  description: "Roll off dumpster rental from $495. Open-top containers delivered to your driveway. 10-40 yard sizes for construction, renovations & cleanouts. Same-day delivery available.",
  keywords: "roll off dumpster rental, roll off container, roll off dumpster near me, open top dumpster, roll off rental",
};

const ROLL_OFF_SIZES = [
  {
    size: 10,
    price: "$495",
    dimensions: "12' x 8' x 3.5'",
    capacity: "3-4 pickup truck loads",
    bestFor: ["Small cleanouts", "Bathroom remodels", "Garage cleanups"],
    bestForEs: ["Limpiezas pequeñas", "Remodelaciones de baño", "Limpiezas de garaje"],
  },
  {
    size: 15,
    price: "$550",
    dimensions: "16' x 7.5' x 4'",
    capacity: "5-6 pickup truck loads",
    bestFor: ["Medium renovations", "Deck removal", "Flooring projects"],
    bestForEs: ["Renovaciones medianas", "Demolición de terrazas", "Proyectos de pisos"],
  },
  {
    size: 20,
    price: "$595",
    dimensions: "22' x 7.5' x 4.5'",
    capacity: "7-8 pickup truck loads",
    bestFor: ["Kitchen remodels", "Roof tear-offs", "Large cleanouts"],
    bestForEs: ["Remodelaciones de cocina", "Desmontaje de techo", "Limpiezas grandes"],
    popular: true,
  },
  {
    size: 30,
    price: "$695",
    dimensions: "22' x 7.5' x 6'",
    capacity: "10-12 pickup truck loads",
    bestFor: ["Major renovations", "New construction", "Estate cleanouts"],
    bestForEs: ["Renovaciones mayores", "Nueva construcción", "Limpiezas de herencia"],
  },
  {
    size: 40,
    price: "$795",
    dimensions: "22' x 7.5' x 8'",
    capacity: "14-16 pickup truck loads",
    bestFor: ["Commercial projects", "Whole house demos", "Large construction"],
    bestForEs: ["Proyectos comerciales", "Demoliciones de casa completa", "Construcción grande"],
  },
];

const WHAT_IS_ROLL_OFF = [
  {
    title: "Open-Top Design",
    titleEs: "Diseño de Tapa Abierta",
    description: "Roll off dumpsters have an open top for easy loading from any angle. Toss debris over the sides or use the rear swing door for heavy items.",
    descriptionEs: "Los contenedores roll off tienen tapa abierta para carga fácil desde cualquier ángulo. Lanza escombros por los lados o usa la puerta trasera para artículos pesados.",
    icon: Truck,
  },
  {
    title: "Wheels for Delivery",
    titleEs: "Ruedas para Entrega",
    description: "Small wheels allow the container to 'roll off' the delivery truck directly onto your driveway or job site. No crane or special equipment needed.",
    descriptionEs: "Las pequeñas ruedas permiten que el contenedor 'ruede' del camión directamente a tu entrada o sitio de trabajo. No se necesita grúa ni equipo especial.",
    icon: ArrowRight,
  },
  {
    title: "Temporary Rental",
    titleEs: "Alquiler Temporal",
    description: "Unlike permanent dumpsters at businesses, roll offs are delivered for your project and picked up when you're done. Standard rental is 7 days.",
    descriptionEs: "A diferencia de los contenedores permanentes en negocios, los roll off se entregan para tu proyecto y se recogen cuando terminas. El alquiler estándar es de 7 días.",
    icon: Clock,
  },
];

const USE_CASES = [
  {
    title: "Home Renovations",
    titleEs: "Renovaciones del Hogar",
    description: "Kitchen remodels, bathroom updates, flooring replacement, and room additions generate debris that needs to go somewhere.",
    descriptionEs: "Remodelaciones de cocina, actualizaciones de baño, reemplazo de pisos y adiciones de cuartos generan escombros que necesitan un lugar.",
    icon: Home,
    sizes: "15-30 yard",
  },
  {
    title: "Construction Sites",
    titleEs: "Sitios de Construcción",
    description: "New builds, additions, and major construction projects require large-capacity containers for lumber, drywall, and materials.",
    descriptionEs: "Nuevas obras, adiciones y grandes proyectos de construcción requieren contenedores de gran capacidad para madera, tablero de yeso y materiales.",
    icon: HardHat,
    sizes: "30-40 yard",
  },
  {
    title: "Commercial Projects",
    titleEs: "Proyectos Comerciales",
    description: "Office cleanouts, retail renovations, and commercial construction need reliable waste removal on a schedule.",
    descriptionEs: "Vaciados de oficinas, renovaciones de locales y construcción comercial necesitan eliminación de residuos confiable según un horario.",
    icon: Building,
    sizes: "20-40 yard",
  },
  {
    title: "Estate Cleanouts",
    titleEs: "Limpieza de Herencias",
    description: "Clearing out a home after a loved one passes or preparing a property for sale often requires multiple loads of debris removal.",
    descriptionEs: "Vaciar la casa de un ser querido o preparar una propiedad para venta a menudo requiere múltiples cargas de escombros.",
    icon: Home,
    sizes: "20-30 yard",
  },
];

export default async function RollOffDumpsterPage({ params }: PageProps) {
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
            <span className="text-secondary-900">{isEs ? 'Contenedores Roll Off' : 'Roll Off Dumpsters'}</span>
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
                {isEs ? 'Alquiler de Contenedor Roll Off' : 'Roll Off Container Rental'}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                {isEs ? 'Alquiler de Contenedor Roll Off' : 'Roll Off Dumpster Rental'}
              </h1>
              <p className="text-xl text-secondary-600 mb-6">
                {isEs
                  ? <>Contenedores de tapa abierta entregados directamente a su ubicación. Nuestros contenedores roll off son perfectos para escombros de construcción, residuos de renovación y grandes proyectos de limpieza. Precios desde <strong className="text-primary-600">$495</strong> con todo incluido.</>
                  : <>Open-top containers delivered directly to your location. Our roll off dumpsters are perfect for construction debris, renovation waste, and large cleanout projects. Prices start at <strong className="text-primary-600">$495</strong> with everything included.</>}
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
                  href="/dumpster-rental-prices"
                  className="border-2 border-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
                >
                  {isEs ? 'Ver Todos los Precios' : 'View All Prices'}
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/services/roll-off-dumpster-rental.jpg"
                alt="Roll off dumpster being delivered to residential driveway"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is a Roll Off */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? '¿Qué es un Contenedor Roll Off?' : 'What is a Roll Off Dumpster?'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-3xl mx-auto">
            {isEs
              ? 'Un contenedor roll off es un gran recipiente rectangular de tapa abierta que se entrega en un camión especial. El contenedor "rueda" desde la parte trasera del camión a tu propiedad, de ahí el nombre.'
              : 'A roll off dumpster is a large, rectangular, open-top waste container that gets delivered on a special truck. The container "rolls off" the back of the truck onto your property — hence the name.'}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {WHAT_IS_ROLL_OFF.map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{isEs ? item.titleEs : item.title}</h3>
                <p className="text-secondary-600">{isEs ? item.descriptionEs : item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Options */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Tamaños y Precios de Contenedores Roll Off' : 'Roll Off Dumpster Sizes & Prices'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs
              ? 'Todos los precios incluyen entrega, recogida, alquiler de 7 días, asignación de peso y disposición.'
              : 'All prices include delivery, pickup, 7-day rental, weight allowance, and disposal.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ROLL_OFF_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-6 shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    {isEs ? 'Más Popular' : 'Most Popular'}
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-4xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-secondary-600">{isEs ? 'Yardas' : 'Yard'}</span>
                </div>
                <div className="text-2xl font-bold text-secondary-900 mt-2">{item.price}</div>
                <div className="text-sm text-secondary-500 mb-4">{isEs ? 'Todo incluido' : 'All-inclusive'}</div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">{isEs ? 'Dimensiones:' : 'Dimensions:'}</span>
                    <span className="text-secondary-900">{item.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">{isEs ? 'Capacidad:' : 'Capacity:'}</span>
                    <span className="text-secondary-900">{item.capacity}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-secondary-700 mb-2">{isEs ? 'Ideal para:' : 'Best for:'}</p>
                  <ul className="space-y-1">
                    {(isEs ? item.bestForEs : item.bestFor).map((use) => (
                      <li key={use} className="text-sm text-secondary-600 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-6 block text-center bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isEs ? 'Ver Detalles' : 'View Details'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Usos Comunes para Contenedores Roll Off' : 'Common Uses for Roll Off Dumpsters'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs
              ? 'Los contenedores roll off manejan una gran variedad de proyectos. Aquí están los usos más comunes:'
              : 'Roll off containers handle a wide variety of projects. Here are the most common uses:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {USE_CASES.map((item) => (
              <div key={item.title} className="bg-secondary-50 rounded-xl p-6 flex gap-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">{isEs ? item.titleEs : item.title}</h3>
                  <p className="text-secondary-600 text-sm mb-2">{isEs ? item.descriptionEs : item.description}</p>
                  <p className="text-primary-600 text-sm font-medium">{isEs ? `Recomendado: ${item.sizes}` : `Recommended: ${item.sizes}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Qué Está Incluido con Cada Alquiler de Contenedor Roll Off' : "What's Included with Every Roll Off Rental"}
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Truck className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? 'Entrega Gratis' : 'Free Delivery'}</h3>
              <p className="text-sm text-secondary-600">{isEs ? 'Entregado a tu entrada o sitio de trabajo' : 'Delivered to your driveway or job site'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Clock className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? 'Alquiler de 7 Días' : '7-Day Rental'}</h3>
              <p className="text-sm text-secondary-600">{isEs ? 'Semana completa incluida en el precio' : 'Full week included in the price'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Shield className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? 'Peso Incluido' : 'Weight Included'}</h3>
              <p className="text-sm text-secondary-600">{isEs ? '2-6 toneladas según el tamaño del contenedor' : '2-6 tons based on dumpster size'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Truck className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? 'Recogida Gratis' : 'Free Pickup'}</h3>
              <p className="text-sm text-secondary-600">{isEs ? 'Lo llevamos cuando termines' : "We haul it away when you're done"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Preguntas Frecuentes sobre Contenedores Roll Off' : 'Roll Off Dumpster FAQs'}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cuál es la diferencia entre un roll off y un contenedor regular?' : "What's the difference between a roll off and a regular dumpster?"}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Los contenedores roll off son temporales, se entregan en un camión y se colocan en tu ubicación para un proyecto específico. Los contenedores regulares (de carga frontal) son instalaciones permanentes en negocios que se vacían semanalmente. Los roll off tienen tapa abierta para carga fácil, mientras que los de carga frontal tienen tapas y son más pequeños.'
                  : 'Roll off dumpsters are temporary containers delivered on a truck and placed at your location for a specific project. Regular dumpsters (front-load) are permanent fixtures at businesses emptied on a weekly schedule. Roll offs are open-top for easy loading, while front-load dumpsters have lids and are smaller.'}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Cuánto espacio necesito para un contenedor roll off?' : 'How much space do I need for a roll off dumpster?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Necesitas unos 18 metros de espacio recto para el camión de entrega, más la huella del contenedor (3 a 7 metros de largo por 2.5 metros de ancho). El área debe ser plana y accesible — las entradas funcionan muy bien. Colocaremos tablas bajo las ruedas para proteger tu superficie.'
                  : "You need about 60 feet of straight clearance for the delivery truck, plus the footprint of the dumpster itself (10-22 feet long by 8 feet wide). The area should be flat and accessible — driveways work great. We'll place boards under the wheels to protect your surface."}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Puedo colocar un contenedor roll off en la calle?' : 'Can I put a roll off dumpster on the street?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Muchas ciudades permiten la colocación en la calle con un permiso. Los requisitos varían según la ubicación — algunas ciudades son estrictas con los permisos y límites de tiempo, otras son más flexibles. Podemos ayudarte a entender los requisitos locales cuando llames para ordenar.'
                  : 'Many cities allow street placement with a permit. Requirements vary by location — some cities are strict about permits and time limits, others are more flexible. We can help you understand local requirements when you call to order.'}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Qué tan lleno puedo cargar un contenedor roll off?' : 'How full can I load a roll off dumpster?'}
              </h3>
              <p className="text-secondary-600">
                {isEs
                  ? 'Los escombros no deben sobrepasar el borde superior del contenedor. Este es un requisito de seguridad y legal — los contenedores sobrecargados no pueden transportarse en vías públicas. Si tu contenedor se está llenando, llámanos para cambiarlo por uno vacío.'
                  : "Debris should not extend above the top edge of the container. This is a safety and legal requirement — overfilled dumpsters can't be transported on public roads. If your dumpster is getting full, call us to swap it out for an empty one."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{isEs ? '¿Listo para Ordenar tu Contenedor Roll Off?' : 'Ready to Order Your Roll Off Dumpster?'}</h2>
          <p className="text-xl text-secondary-300 mb-8">
            {isEs
              ? 'Entrega el mismo día disponible en la mayoría de las áreas. Precios todo incluido sin cargos ocultos.'
              : 'Same-day delivery available in most areas. All-inclusive pricing with no hidden fees.'}
          </p>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            {isEs ? `Llamar ${phone}` : `Call ${phone}`}
          </a>
          <p className="text-secondary-400 mt-4">
            {isEs ? 'Sirviendo a clientes residenciales y comerciales en todo el país' : 'Serving residential and commercial customers nationwide'}
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
          { name: "Roll Off Dumpster Rental", url: "https://www.dumpsterchamps.com/roll-off-dumpster-rental" },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "What's the difference between a roll off and a regular dumpster?", answer: "Roll off dumpsters are temporary containers delivered on a truck and placed at your location for a specific project. Regular dumpsters (front-load) are permanent fixtures at businesses emptied on a weekly schedule. Roll offs are open-top for easy loading, while front-load dumpsters have lids and are smaller." },
          { question: "How much space do I need for a roll off dumpster?", answer: "You need about 60 feet of straight clearance for the delivery truck, plus the footprint of the dumpster itself (10-22 feet long by 8 feet wide). The area should be flat and accessible — driveways work great. We'll place boards under the wheels to protect your surface." },
          { question: "Can I put a roll off dumpster on the street?", answer: "Many cities allow street placement with a permit. Requirements vary by location — some cities are strict about permits and time limits, others are more flexible. We can help you understand local requirements when you call to order." },
          { question: "How full can I load a roll off dumpster?", answer: "Debris should not extend above the top edge of the container. This is a safety and legal requirement — overfilled dumpsters can't be transported on public roads. If your dumpster is getting full, call us to swap it out for an empty one." },
        ]}
      />
    </>
  );
}
