import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Truck, Home, Clock, Shield, Sparkles, TreeDeciduous } from "lucide-react";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Residential Dumpster Rental | Home Cleanout & Renovation",
  description: "Residential dumpster rental from $495. Perfect for home cleanouts, renovations, yard waste & decluttering. Driveway-friendly sizes. Same-day delivery available.",
  keywords: "residential dumpster rental, home dumpster rental, dumpster for home use, house cleanout dumpster, driveway dumpster",
};

const RESIDENTIAL_SIZES = [
  {
    size: 10,
    price: "$495",
    weightLimit: "1 ton",
    dimensions: "12' x 8' x 3.5'",
    truckLoads: "3-4 pickup trucks",
    projects: ["Garage cleanout", "Bathroom remodel", "Small basement cleanout", "Deck removal"],
    projectsEs: ["Limpieza de garaje", "Remodelación de baño", "Limpieza de sótano pequeño", "Demolición de terraza"],
    drivewaySafe: true,
  },
  {
    size: 15,
    price: "$550",
    weightLimit: "1 ton",
    dimensions: "16' x 7.5' x 4'",
    truckLoads: "5-6 pickup trucks",
    projects: ["Kitchen remodel", "Flooring project", "Attic cleanout", "Medium renovation"],
    projectsEs: ["Remodelación de cocina", "Proyecto de pisos", "Limpieza de ático", "Renovación mediana"],
    drivewaySafe: true,
    popular: true,
  },
  {
    size: 20,
    price: "$595",
    weightLimit: "2 tons",
    dimensions: "22' x 7.5' x 4.5'",
    truckLoads: "7-8 pickup trucks",
    projects: ["Whole house cleanout", "Large renovation", "Estate cleanout", "Moving cleanout"],
    projectsEs: ["Limpieza completa de casa", "Renovación grande", "Limpieza de herencia", "Limpieza por mudanza"],
    drivewaySafe: true,
  },
];

const HOME_PROJECTS = [
  {
    title: "Decluttering & Cleanouts",
    titleEs: "Desorden y Limpieza",
    description: "Finally clear out years of accumulated stuff. Basements, attics, garages — we've seen it all.",
    descriptionEs: "Por fin elimina años de cosas acumuladas. Sótanos, áticos, garajes — lo hemos visto todo.",
    icon: Sparkles,
    recommended: "10-15 yard",
  },
  {
    title: "Home Renovations",
    titleEs: "Renovaciones del Hogar",
    description: "Kitchen remodels, bathroom updates, flooring replacement. Demo debris adds up fast.",
    descriptionEs: "Remodelaciones de cocina, actualizaciones de baño, reemplazo de pisos. Los escombros se acumulan rápido.",
    icon: Home,
    recommended: "15-20 yard",
  },
  {
    title: "Yard Waste & Landscaping",
    titleEs: "Residuos de Jardín y Paisajismo",
    description: "Tree trimming, shrub removal, sod replacement. Note: Dirt and rocks are heavy!",
    descriptionEs: "Poda de árboles, retiro de arbustos, reemplazo de césped. Nota: ¡La tierra y las rocas son pesadas!",
    icon: TreeDeciduous,
    recommended: "10-15 yard",
  },
  {
    title: "Estate Cleanouts",
    titleEs: "Limpieza de Herencias",
    description: "Clearing a loved one's home is hard. We make the waste removal part simple.",
    descriptionEs: "Limpiar la casa de un ser querido es difícil. Hacemos que la parte de eliminación de residuos sea simple.",
    icon: Home,
    recommended: "15-20 yard",
  },
];

const HOMEOWNER_TIPS = [
  {
    tip: "Protect your driveway",
    tipEs: "Protege tu entrada",
    detail: "We place wooden boards under the wheels to prevent driveway damage. Let us know if you have concerns about your surface.",
    detailEs: "Colocamos tablas de madera bajo las ruedas para distribuir el peso y prevenir daños. Avísanos si tienes preocupaciones sobre tu superficie.",
  },
  {
    tip: "Check HOA rules",
    tipEs: "Verifica las reglas de la HOA",
    detail: "Some HOAs have rules about dumpsters. Check before ordering to avoid fines or forced removal.",
    detailEs: "Algunas HOAs tienen reglas sobre contenedores. Verifica antes de ordenar para evitar multas o retiro forzado.",
  },
  {
    tip: "Plan for permits",
    tipEs: "Planifica los permisos",
    detail: "Placing a dumpster on the street (not your driveway) usually requires a city permit. We can guide you through this.",
    detailEs: "Colocar un contenedor en la calle generalmente requiere un permiso municipal. Podemos orientarte en este proceso.",
  },
  {
    tip: "Don't overfill",
    tipEs: "No lo llenes demasiado",
    detail: "Debris cannot extend above the top edge. This is for safe transport — overfilled containers can't go on public roads.",
    detailEs: "Los escombros no pueden extenderse más allá del borde superior. Los contenedores sobrellenados no pueden circular en vías públicas.",
  },
];

export default async function ResidentialDumpsterPage({ params }: PageProps) {
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
            <span className="text-secondary-900">{isEs ? 'Contenedores Residenciales' : 'Residential Dumpsters'}</span>
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
                {isEs ? 'Contenedores Residenciales' : 'Residential Dumpsters'}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                {isEs ? 'Alquiler de Contenedores Residenciales' : 'Residential Dumpster Rental'}
              </h1>
              <p className="text-xl text-secondary-600 mb-6">
                {isEs
                  ? <>Alquiler de contenedores perfecto para propietarios. Ideal para limpieza de garajes, renovaciones del hogar, residuos de jardín, mudanzas y limpiezas de herencias. Precios desde <strong className="text-primary-600">$495</strong> con todo incluido.</>
                  : <>Dumpster rentals perfect for homeowners. Ideal for garage cleanouts, home renovations, yard waste, moving, and estate cleanups. Prices start at <strong className="text-primary-600">$495</strong> with everything included.</>}
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
                src="/images/services/residential-dumpsters.jpg"
                alt="Residential dumpster rental in driveway for home cleanout project"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Homeowners Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Por Qué los Propietarios Eligen Dumpster Champs' : 'Why Homeowners Choose Dumpster Champs'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? 'Hacemos que alquilar un contenedor para su proyecto del hogar sea simple y sin estrés.' : 'We make renting a dumpster for your home project simple and stress-free.'}
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? 'Entrega en la Entrada' : 'Driveway Delivery'}</h3>
              <p className="text-secondary-600 text-sm">{isEs ? 'Colocado cuidadosamente en tu entrada con tablas para proteger la superficie' : 'Placed carefully on your driveway with boards to protect the surface'}</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? 'Alquiler de 7 Días' : '7-Day Rental'}</h3>
              <p className="text-secondary-600 text-sm">{isEs ? 'Tómate tu tiempo — una semana completa está incluida en el precio' : 'Take your time — a full week is included in the price'}</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? 'Precio Todo Incluido' : 'All-Inclusive Price'}</h3>
              <p className="text-secondary-600 text-sm">{isEs ? 'Entrega, recogida, peso y eliminación — sin cargos ocultos' : 'Delivery, pickup, weight, and disposal — no hidden fees'}</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">{isEs ? 'Amigable para Propietarios' : 'Homeowner Friendly'}</h3>
              <p className="text-secondary-600 text-sm">{isEs ? 'No se necesita cuenta de contratista — pedido fácil para cualquier persona' : 'No contractor account needed — easy ordering for anyone'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Sizes */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Tamaños de Contenedores para Proyectos del Hogar' : 'Dumpster Sizes for Home Projects'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? 'La mayoría de proyectos residenciales se sirven mejor con contenedores de 10, 15 o 20 yardas. Caben en entradas estándar y manejan proyectos típicos del hogar.' : 'Most residential projects are best served by our 10, 15, or 20-yard dumpsters. These sizes fit in standard driveways and handle typical home projects.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {RESIDENTIAL_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-6 shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    {isEs ? 'Mejor para la Mayoría de Proyectos' : 'Best for Most Home Projects'}
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-5xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-secondary-600 text-lg">{isEs ? 'Yardas' : 'Yard'}</span>
                </div>
                <div className="text-3xl font-bold text-secondary-900 mt-2">{item.price}</div>
                <div className="text-sm text-secondary-500 mb-4">{isEs ? 'Todo incluido' : 'Everything included'}</div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <p className="text-secondary-600"><strong>{isEs ? 'Capacidad:' : 'Holds:'}</strong> {item.truckLoads}</p>
                  <p className="text-secondary-600"><strong>{isEs ? 'Peso:' : 'Weight:'}</strong> {item.weightLimit} {isEs ? 'incluido' : 'included'}</p>
                  <p className="text-secondary-600"><strong>{isEs ? 'Tamaño:' : 'Size:'}</strong> {item.dimensions}</p>
                  {item.drivewaySafe && (
                    <p className="text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      {isEs ? 'Cabe en entrada estándar' : 'Fits in standard driveway'}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-secondary-700 mb-2">{isEs ? 'Perfecto para:' : 'Perfect for:'}</p>
                  <ul className="space-y-1">
                    {(isEs ? item.projectsEs : item.projects).map((project) => (
                      <li key={project} className="text-sm text-secondary-600 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-6 block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {isEs ? 'Más Información' : 'Learn More'}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-secondary-600 mt-8">
            {isEs ? (
              <>¿Tiene un proyecto más grande? También ofrecemos contenedores de <Link href="/30-yard-dumpster" className="text-primary-600 hover:underline">30 yardas</Link> y <Link href="/40-yard-dumpster" className="text-primary-600 hover:underline">40 yardas</Link>.</>
            ) : (
              <>Have a larger project? We also offer{" "}<Link href="/30-yard-dumpster" className="text-primary-600 hover:underline">30-yard</Link> and{" "}<Link href="/40-yard-dumpster" className="text-primary-600 hover:underline">40-yard</Link> containers.</>
            )}
          </p>
        </div>
      </section>

      {/* Common Home Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            {isEs ? 'Proyectos del Hogar Comunes con los que Ayudamos' : 'Common Home Projects We Help With'}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            {isEs ? 'Cualquiera que sea tu proyecto, hemos ayudado a propietarios como tú a lograrlo.' : 'Whatever your project, we\'ve helped homeowners just like you get it done.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {HOME_PROJECTS.map((project) => (
              <div key={project.title} className="bg-secondary-50 rounded-xl p-6 flex gap-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <project.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">{isEs ? project.titleEs : project.title}</h3>
                  <p className="text-secondary-600 text-sm mb-2">{isEs ? project.descriptionEs : project.description}</p>
                  <p className="text-primary-600 text-sm font-medium">
                    {isEs ? `Tamaño recomendado: ${project.recommended}` : `Recommended size: ${project.recommended}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Homeowners */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Consejos para Primeros Arrendatarios' : 'Tips for First-Time Renters'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {HOMEOWNER_TIPS.map((item) => (
              <div key={item.tip} className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-secondary-900 mb-2">{isEs ? item.tipEs : item.tip}</h3>
                <p className="text-secondary-600 text-sm">{isEs ? item.detailEs : item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Can Go In */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? '¿Qué Puede ir en un Contenedor Residencial?' : 'What Can Go in a Residential Dumpster?'}
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  {isEs ? 'Sí — Estos Están Permitidos' : 'Yes — These Are Fine'}
                </h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>• {isEs ? 'Basura y desorden del hogar' : 'Household junk & clutter'}</li>
                  <li>• {isEs ? 'Muebles viejos' : 'Old furniture'}</li>
                  <li>• {isEs ? 'Electrodomésticos (sin freón)' : 'Appliances (no freon)'}</li>
                  <li>• {isEs ? 'Colchones' : 'Mattresses'}</li>
                  <li>• {isEs ? 'Residuos de jardín (ramas, hojas)' : 'Yard waste (branches, leaves)'}</li>
                  <li>• {isEs ? 'Escombros de renovación' : 'Renovation debris'}</li>
                  <li>• {isEs ? 'Pisos y alfombras' : 'Flooring & carpet'}</li>
                  <li>• {isEs ? 'Tablero de yeso y madera' : 'Drywall & lumber'}</li>
                  <li>• {isEs ? 'Tejas de techo' : 'Roofing shingles'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-lg">✕</span>
                  {isEs ? 'No — Estos Necesitan Disposición Especial' : 'No — These Need Special Disposal'}
                </h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>• {isEs ? 'Residuos peligrosos (químicos, aceite)' : 'Hazardous waste (chemicals, oil)'}</li>
                  <li>• {isEs ? 'Botes de pintura (látex OK si está seco)' : 'Paint cans (latex OK if dried)'}</li>
                  <li>• {isEs ? 'Baterías' : 'Batteries'}</li>
                  <li>• {isEs ? 'Llantas' : 'Tires'}</li>
                  <li>• {isEs ? 'Electrónicos (algunas áreas)' : 'Electronics (some areas)'}</li>
                  <li>• {isEs ? 'Refrigeradores/AC con freón' : 'Refrigerators/AC units with freon'}</li>
                  <li>• {isEs ? 'Residuos médicos' : 'Medical waste'}</li>
                </ul>
                <p className="text-sm text-secondary-500 mt-4">
                  {isEs ? '¿No estás seguro? Solo pregunta — con gusto te ayudamos a encontrar opciones de disposición.' : 'Not sure? Just ask — we\'re happy to help you figure out disposal options.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Preguntas Frecuentes de Propietarios' : 'Homeowner FAQs'}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Un contenedor dañará mi entrada?' : 'Will a dumpster damage my driveway?'}
              </h3>
              <p className="text-secondary-600">
                {isEs ? 'Colocamos tablas de madera bajo las ruedas para distribuir el peso y prevenir daños. La mayoría de entradas manejan contenedores sin problemas. Si tiene preocupaciones sobre su superficie, avísenos y tomaremos precauciones adicionales.' : 'We place wooden boards under the wheels to distribute weight and prevent damage. Most driveways handle dumpsters without issue. If you have a newer driveway or concerns about your surface, let us know and we\'ll take extra precautions.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Por Cuánto Tiempo Puedo Tener el Contenedor?' : 'How long can I keep the dumpster?'}
              </h3>
              <p className="text-secondary-600">
                {isEs ? 'El alquiler estándar es de 7 días, incluido en su precio. ¿Necesita más tiempo? Las extensiones son $10-$20 por día según el tamaño. Llame antes de que termine su período de alquiler.' : 'Standard rental is 7 days, included in your price. Need more time? Extensions are $10-$20 per day depending on size. Just call before your rental period ends.'}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Qué Pasa si Ordeno un Tamaño Muy Pequeño?' : 'What if I order too small a size?'}
              </h3>
              <p className="text-secondary-600">
                {isEs ? (
                  <>Si lo llena antes de terminar su proyecto, podemos cambiarlo por un contenedor vacío. Hay un cargo adicional de transporte por los cambios. Nuestra <Link href="/calculator" className="text-primary-600 hover:underline">herramienta calculadora</Link> le ayuda a elegir el tamaño correcto desde el inicio.</>
                ) : (
                  <>If you fill up before your project is done, we can swap it for an empty dumpster. There&apos;s an additional haul fee for swaps. Our{" "}<Link href="/calculator" className="text-primary-600 hover:underline">calculator tool</Link>{" "}helps you choose the right size upfront.</>
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                {isEs ? '¿Necesito Estar en Casa para la Entrega?' : 'Do I need to be home for delivery?'}
              </h3>
              <p className="text-secondary-600">
                {isEs ? 'No. Solo avísenos dónde quiere que coloquemos el contenedor y asegúrese de que el área esté despejada y accesible. Lo entregaremos y le enviaremos una confirmación.' : 'No. Just let us know where you want the dumpster placed, and make sure the area is clear and accessible. We\'ll deliver it and send you a confirmation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{isEs ? '¿Listo para Abordar su Proyecto del Hogar?' : 'Ready to Tackle Your Home Project?'}</h2>
          <p className="text-xl text-secondary-300 mb-8">
            {isEs ? 'Entrega el mismo día disponible en la mayoría de las áreas. Precios simples, sin sorpresas.' : 'Same-day delivery available in most areas. Simple pricing, no surprises.'}
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
              {isEs ? 'Usar Calculadora de Tamaños' : 'Use Size Calculator'}
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
          { name: "Residential Dumpster Rental", url: "https://www.dumpsterchamps.com/residential-dumpster-rental" },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "What can I put in a residential dumpster?", answer: "Residential dumpsters accept most household debris including furniture, appliances, carpeting, flooring, drywall, construction debris, yard waste, and general clutter. Prohibited items include hazardous materials, tires, batteries, and electronics." },
          { question: "How long can I keep a residential dumpster?", answer: "Standard rental is 7 days, but extensions are available if needed. We understand home projects can take longer than expected." },
          { question: "Will a dumpster damage my driveway?", answer: "We place protective boards under the dumpster wheels to protect your driveway from marks and damage. Our drivers are careful and experienced." },
          { question: "Do I need a permit for a residential dumpster?", answer: "Most residential properties don't require a permit for dumpster placement in your driveway. If you need to place it on the street, you'll typically need a permit from your city." },
        ]}
      />
    </>
  );
}
