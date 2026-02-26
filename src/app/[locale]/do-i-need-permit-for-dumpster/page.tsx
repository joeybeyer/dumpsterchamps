import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, CheckCircle, AlertTriangle, FileText, MapPin, Building, Home } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Do I Need a Permit for a Dumpster? [2026] Complete Guide",
  description: "Most dumpster rentals don't need a permit if placed on your driveway. Street placement requires a permit in most cities. Learn the rules and costs. Call (888) 860-0710.",
  keywords: "dumpster permit, do i need permit for dumpster, dumpster rental permit, roll off dumpster permit, street permit dumpster",
  openGraph: {
    title: "Do I Need a Permit for a Dumpster? [2026] Complete Guide",
    description: "Most dumpster rentals don't need a permit if placed on your driveway. Street placement requires a permit.",
    url: "https://www.dumpsterchamps.com/do-i-need-permit-for-dumpster",
    type: "article",
  },
};

const faqs = [
  {
    question: "Do I need a permit for a dumpster?",
    questionEs: "¿Necesito un permiso para un contenedor?",
    answer: "You typically do NOT need a permit if the dumpster is placed on your private property (driveway, yard, or parking lot). You WILL need a permit if placing the dumpster on public property like a street, sidewalk, or alley. Most residential dumpster rentals are placed on driveways and require no permit.",
    answerEs: "Típicamente NO necesitas un permiso si el contenedor se coloca en tu propiedad privada (entrada, jardín o estacionamiento). SÍ necesitarás un permiso si lo colocas en propiedad pública como una calle, acera o callejón. La mayoría de alquileres residenciales de contenedores se colocan en entradas y no requieren permiso.",
  },
  {
    question: "How much does a dumpster permit cost?",
    questionEs: "¿Cuánto cuesta un permiso de contenedor?",
    answer: "Dumpster permit costs range from $10-$150 depending on your city. Most cities charge $25-$75 for a 7-14 day street placement permit. Some cities like Los Angeles and New York charge higher fees. Rural areas often have lower fees or no permit requirement.",
    answerEs: "Los costos de permisos de contenedor van de $10 a $150 según tu ciudad. La mayoría de ciudades cobran $25-$75 por un permiso de colocación en la calle de 7-14 días. Algunas ciudades como Los Ángeles y Nueva York cobran tarifas más altas. Las zonas rurales a menudo tienen tarifas más bajas o no requieren permiso.",
  },
  {
    question: "How do I get a dumpster permit?",
    questionEs: "¿Cómo obtengo un permiso de contenedor?",
    answer: "Contact your city's public works or permits department. Most cities allow online permit applications. You'll typically need your address, dumpster size, placement dates, and the rental company name. Processing takes 1-5 business days in most areas.",
    answerEs: "Contacta el departamento de obras públicas o permisos de tu ciudad. La mayoría de ciudades permiten solicitudes de permisos en línea. Generalmente necesitarás tu dirección, el tamaño del contenedor, las fechas de colocación y el nombre de la empresa de alquiler. El procesamiento toma 1-5 días hábiles en la mayoría de áreas.",
  },
  {
    question: "What happens if I don't get a permit?",
    questionEs: "¿Qué pasa si no obtengo un permiso?",
    answer: "Placing a dumpster on public property without a permit can result in fines ranging from $50-$500, immediate removal of the dumpster, and potential liability if the dumpster causes traffic issues or accidents. It's always better to get the proper permit.",
    answerEs: "Colocar un contenedor en propiedad pública sin permiso puede resultar en multas de $50-$500, retiro inmediato del contenedor, y posible responsabilidad si el contenedor causa problemas de tráfico o accidentes. Siempre es mejor obtener el permiso adecuado.",
  },
  {
    question: "Can my dumpster company get the permit for me?",
    questionEs: "¿Puede mi empresa de contenedores obtener el permiso por mí?",
    answer: "Many dumpster rental companies, including Dumpster Champs, can help you understand permit requirements for your area. Some companies will obtain the permit on your behalf for an additional fee. We recommend asking about this service when you book.",
    answerEs: "Muchas empresas de alquiler de contenedores, incluyendo Dumpster Champs, pueden ayudarte a entender los requisitos de permisos para tu área. Algunas empresas obtendrán el permiso en tu nombre por una tarifa adicional. Recomendamos preguntar sobre este servicio cuando reserves.",
  },
];

const placementRules = [
  {
    icon: Home,
    title: "Private Property (No Permit)",
    titleEs: "Propiedad Privada (Sin Permiso)",
    description: "Driveways, yards, private parking lots",
    descriptionEs: "Entradas, jardines, estacionamientos privados",
    items: [
      "Your driveway or parking area",
      "Your yard (with ground protection)",
      "Private parking lots with owner permission",
      "Commercial properties you own/lease",
    ],
    itemsEs: [
      "Tu entrada o área de estacionamiento",
      "Tu jardín (con protección del suelo)",
      "Estacionamientos privados con permiso del dueño",
      "Propiedades comerciales que posees/arriendas",
    ],
    color: "green",
  },
  {
    icon: Building,
    title: "Public Property (Permit Required)",
    titleEs: "Propiedad Pública (Permiso Requerido)",
    description: "Streets, sidewalks, alleys, public lots",
    descriptionEs: "Calles, aceras, callejones, lotes públicos",
    items: [
      "Public street in front of your home",
      "City sidewalks or curb areas",
      "Public alleys",
      "Municipal parking lots",
    ],
    itemsEs: [
      "Calle pública frente a tu casa",
      "Aceras o bordillos de la ciudad",
      "Callejones públicos",
      "Estacionamientos municipales",
    ],
    color: "orange",
  },
];

const cityExamples = [
  { city: "Most Small/Medium Cities", cityEs: "Mayoría de Ciudades Pequeñas/Medianas", cost: "$25-$50", timeframe: "1-3 days" },
  { city: "Chicago, IL", cost: "$50-$100", timeframe: "3-5 days" },
  { city: "Los Angeles, CA", cost: "$75-$150", timeframe: "5-7 days" },
  { city: "New York, NY", cost: "$100-$200", timeframe: "5-10 days" },
  { city: "Miami, FL", cost: "$50-$75", timeframe: "2-5 days" },
  { city: "Phoenix, AZ", cost: "$25-$50", timeframe: "1-3 days" },
];

const timeframeTranslations: Record<string, string> = {
  "1-3 days": "1-3 días",
  "3-5 days": "3-5 días",
  "5-7 days": "5-7 días",
  "5-10 days": "5-10 días",
  "2-5 days": "2-5 días",
};

const permitSteps = [
  {
    step: 1,
    title: "Determine if You Need One",
    titleEs: "Determina si Necesitas Uno",
    description: "If placing on your driveway, you likely don't need a permit. Only street/public placement requires permits.",
    descriptionEs: "Si lo colocas en tu entrada, probablemente no necesitas permiso. Solo la colocación en calle/propiedad pública requiere permisos.",
  },
  {
    step: 2,
    title: "Contact Your City",
    titleEs: "Contacta tu Ciudad",
    description: "Call your city's public works or permits department, or check their website for online applications.",
    descriptionEs: "Llama al departamento de obras públicas o permisos de tu ciudad, o consulta su sitio web para solicitudes en línea.",
  },
  {
    step: 3,
    title: "Gather Information",
    titleEs: "Reúne Información",
    description: "You'll need: your address, dumpster size, placement dates, rental company name, and site plan/photo.",
    descriptionEs: "Necesitarás: tu dirección, tamaño del contenedor, fechas de colocación, nombre de la empresa de alquiler y plan/foto del sitio.",
  },
  {
    step: 4,
    title: "Submit Application",
    titleEs: "Envía la Solicitud",
    description: "Apply online or in person. Pay the permit fee. Most cities process within 1-5 business days.",
    descriptionEs: "Solicita en línea o en persona. Paga la tarifa del permiso. La mayoría de ciudades procesan en 1-5 días hábiles.",
  },
  {
    step: 5,
    title: "Display Your Permit",
    titleEs: "Muestra tu Permiso",
    description: "Once approved, keep your permit visible near the dumpster for inspector verification.",
    descriptionEs: "Una vez aprobado, mantén tu permiso visible cerca del contenedor para verificación del inspector.",
  },
];

export default async function DoINeedPermitForDumpsterPage({ params }: PageProps) {
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
          { name: "Dumpster Permit Guide", url: "https://www.dumpsterchamps.com/do-i-need-permit-for-dumpster" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600">{isEs ? 'Inicio' : 'Home'}</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary-900">{isEs ? 'Guía de Permisos de Contenedores' : 'Dumpster Permit Guide'}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Answer Box - Critical for PAA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-lg font-bold text-blue-900 mb-2">{isEs ? 'Respuesta Rápida' : 'Quick Answer'}</h2>
            <p className="text-blue-800 mb-2">
              {isEs ? <><strong>¿Necesito un permiso para un contenedor?</strong></> : <><strong>Do I need a permit for a dumpster?</strong></>}
            </p>
            <p className="text-blue-700">
              {isEs ? <><strong>No se necesita permiso</strong> si el contenedor se coloca en tu <strong>propiedad privada</strong> (entrada, jardín o estacionamiento). <strong>Necesitarás permiso</strong> si lo colocas en <strong>propiedad pública</strong> (calle, acera o callejón). La mayoría de alquileres residenciales van en entradas — no se requiere permiso.</> : <><strong>No permit needed</strong> if the dumpster is placed on your <strong>private property</strong> (driveway, yard, or parking lot). You <strong>will need a permit</strong> if placing on <strong>public property</strong> (street, sidewalk, or alley). Most residential dumpster rentals go on driveways—no permit required.</>}
            </p>
          </div>

          {/* H1 with year for freshness */}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            {isEs ? '¿Necesito un Permiso para un Contenedor? [2026] Guía Completa' : 'Do I Need a Permit for a Dumpster? [2026] Complete Guide'}
          </h1>

          <p className="text-lg text-secondary-700 mb-8">
            {isEs ? 'La buena noticia: la mayoría de alquileres residenciales de contenedores no requieren ningún permiso. Si estás colocando el contenedor en tu propia entrada o propiedad, generalmente puedes proceder. Esta guía cubre todo lo que necesitas saber sobre cuándo se requieren permisos, cómo obtener uno y cuánto cuesta.' : 'The good news: most residential dumpster rentals don\'t require any permits. If you\'re placing the dumpster on your own driveway or property, you\'re typically free to proceed. This guide covers everything you need to know about when permits are required, how to get one, and what it costs.'}
          </p>

          {/* Private vs Public Placement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? '¿Cuándo Necesitas un Permiso?' : 'When Do You Need a Permit?'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {placementRules.map((rule) => (
                <div
                  key={rule.title}
                  className={`border-2 rounded-xl p-6 ${
                    rule.color === "green"
                      ? "border-green-300 bg-green-50"
                      : "border-orange-300 bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <rule.icon
                      className={`w-8 h-8 ${
                        rule.color === "green" ? "text-green-600" : "text-orange-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-bold text-secondary-900">{isEs ? rule.titleEs : rule.title}</h3>
                      <p className="text-sm text-secondary-600">{isEs ? rule.descriptionEs : rule.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {(isEs ? rule.itemsEs : rule.items).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            rule.color === "green" ? "text-green-600" : "text-orange-600"
                          }`}
                        />
                        <span className="text-secondary-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Permit Costs by City */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Costos de Permisos de Contenedor por Ciudad' : 'Dumpster Permit Costs by City'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Ubicación' : 'Location'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Costo Típico' : 'Typical Cost'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Tiempo de Procesamiento' : 'Processing Time'}</th>
                  </tr>
                </thead>
                <tbody>
                  {cityExamples.map((item, index) => (
                    <tr key={item.city} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-4 font-semibold text-secondary-900">
                        {isEs ? (item.cityEs ?? item.city) : item.city}
                      </td>
                      <td className="px-4 py-4 text-primary-600 font-bold">{item.cost}</td>
                      <td className="px-4 py-4 text-secondary-600">
                        {isEs ? (timeframeTranslations[item.timeframe] ?? item.timeframe) : item.timeframe}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-secondary-500 mt-4">
              {isEs ? '* Los costos de permisos varían según la ciudad y el condado. Contacta tu oficina local de permisos para precios exactos.' : '* Permit costs vary by city and county. Contact your local permits office for exact pricing.'}
            </p>
          </section>

          {/* How to Get a Permit */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Cómo Obtener un Permiso de Contenedor (5 Pasos)' : 'How to Get a Dumpster Permit (5 Steps)'}
            </h2>

            <div className="space-y-4">
              {permitSteps.map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-secondary-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{isEs ? item.titleEs : item.title}</h3>
                    <p className="text-secondary-600">{isEs ? item.descriptionEs : item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Warning Section */}
          <section className="mb-12">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">{isEs ? '¿Qué Pasa Sin un Permiso?' : 'What Happens Without a Permit?'}</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• {isEs ? <><strong>Multas:</strong> $50-$500 según tu ciudad</> : <><strong>Fines:</strong> $50-$500 depending on your city</>}</li>
                    <li>• {isEs ? <><strong>Retiro forzado:</strong> La ciudad puede requerir el retiro inmediato del contenedor</> : <><strong>Forced removal:</strong> City may require immediate dumpster removal</>}</li>
                    <li>• {isEs ? <><strong>Responsabilidad:</strong> Podrías ser responsable de accidentes o problemas de tráfico</> : <><strong>Liability:</strong> You could be liable for accidents or traffic issues</>}</li>
                    <li>• {isEs ? <><strong>Retrasos del proyecto:</strong> Es posible que tengas que reprogramar tu proyecto</> : <><strong>Project delays:</strong> May have to reschedule your project</>}</li>
                  </ul>
                  <p className="mt-4 text-red-700">
                    {isEs ? 'Siempre es mejor gastar $25-$75 en un permiso que arriesgarte a cientos en multas.' : 'It\'s always better to spend $25-$75 on a permit than risk hundreds in fines.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tip Section */}
          <section className="mb-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                {isEs ? 'Consejo Pro: Evita los Permisos por Completo' : 'Pro Tip: Avoid Permits Entirely'}
              </h3>
              <p className="text-green-800 mb-4">
                {isEs ? 'La forma más fácil de evitar problemas con permisos es colocar tu contenedor en tu entrada. La mayoría de las entradas pueden acomodar un contenedor de 15-20 yardas, que maneja la mayoría de proyectos del hogar.' : 'The easiest way to avoid permit hassles is to place your dumpster on your driveway. Most driveways can accommodate a 15-20 yard dumpster, which handles the majority of home projects.'}
              </p>
              <p className="text-green-700">
                {isEs ? <>¿No estás seguro si cabe un contenedor? Usa nuestra <Link href="/calculator" className="text-primary-600 font-semibold hover:underline">calculadora de tamaños gratis</Link>{" "}o llámanos — te ayudaremos a encontrar la mejor ubicación.</> : <>Not sure if a dumpster will fit? Use our{" "}<Link href="/calculator" className="text-primary-600 font-semibold hover:underline">free size calculator</Link>{" "}or call us—we'll help you figure out the best placement.</>}
              </p>
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
                  <Link href="/how-much-does-dumpster-rental-cost" className="hover:text-primary-600">
                    {isEs ? '¿Cuánto cuesta alquilar un contenedor?' : 'How much does it cost to rent a dumpster?'}
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  {isEs ? 'El alquiler de contenedores cuesta $300-$500 por 7 días de alquiler. Nuestros precios de tarifa plana comienzan en $495 con entrega, recogida y disposición incluidos — sin cargos ocultos.' : 'Dumpster rental costs $300-$500 for a 7-day rental. Our flat-rate pricing starts at $495 with delivery, pickup, and disposal included—no hidden fees.'}
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/what-size-dumpster-do-i-need" className="hover:text-primary-600">
                    {isEs ? '¿Qué tamaño de contenedor necesito?' : 'What size dumpster do I need?'}
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  {isEs ? <>La mayoría de propietarios necesita un contenedor de 15-20 yardas. Usa nuestra <Link href="/calculator" className="text-primary-600 hover:underline">calculadora gratis</Link>{" "}para obtener una recomendación personalizada según el tipo de proyecto.</> : <>Most homeowners need a 15-20 yard dumpster. Use our{" "}<Link href="/calculator" className="text-primary-600 hover:underline">free calculator</Link>{" "}to get a personalized recommendation based on your project type.</>}
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
              {isEs ? '¿Necesitas Ayuda con los Requisitos de Permisos?' : 'Need Help With Permit Requirements?'}
            </h2>
            <p className="text-primary-100 mb-6">
              {isEs ? 'Nuestro equipo conoce los requisitos de permisos para cada ciudad que servimos. Llámanos y te diremos exactamente lo que necesitas — o te ayudaremos a encontrar una colocación en la entrada que evite permisos por completo.' : 'Our team knows the permit requirements for every city we serve. Call us and we\'ll tell you exactly what you need—or help you find a driveway placement that avoids permits entirely.'}
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
