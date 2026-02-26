import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, Calculator, Home, Hammer, Wrench, Package, Trash2, Ruler, Truck } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "What Size Dumpster Do I Need? [2026] Size Guide + Calculator",
  description: "Most homeowners need a 15-20 yard dumpster. Find the right size for your project with our free calculator. 10-yard for small cleanouts, 30-40 yard for major renovations.",
  keywords: "what size dumpster do i need, dumpster size guide, dumpster size calculator, 10 yard dumpster, 20 yard dumpster, 30 yard dumpster",
  openGraph: {
    title: "What Size Dumpster Do I Need? [2026] Size Guide + Calculator",
    description: "Most homeowners need a 15-20 yard dumpster. Find the right size for your project.",
    url: "https://www.dumpsterchamps.com/what-size-dumpster-do-i-need",
    type: "article",
  },
};

const faqs = [
  {
    question: "What size dumpster do I need?",
    answer: "Most homeowners need a 15-20 yard dumpster. A 10-yard dumpster handles small cleanouts (2-3 pickup loads), while a 20-yard is ideal for kitchen or bathroom remodels (6 pickup loads). For large renovations or estate cleanouts, choose a 30-40 yard dumpster.",
    questionEs: "¿Qué tamaño de contenedor necesito?",
    answerEs: "La mayoría de propietarios necesita un contenedor de 15-20 yardas. Un contenedor de 10 yardas maneja limpiezas pequeñas (2-3 cargas de camioneta), mientras que uno de 20 yardas es ideal para remodelaciones de cocina o baño (6 cargas). Para renovaciones grandes o limpiezas de herencia, elige un contenedor de 30-40 yardas.",
  },
  {
    question: "What size dumpster for a bathroom remodel?",
    answer: "A 10-yard dumpster is sufficient for most bathroom remodels, holding approximately 2-3 pickup truck loads of debris including old fixtures, tile, drywall, and flooring.",
    questionEs: "¿Qué tamaño de contenedor necesito para una remodelación de baño?",
    answerEs: "Un contenedor de 10 yardas es suficiente para la mayoría de remodelaciones de baño, con capacidad para aproximadamente 2-3 cargas de camioneta de escombros incluyendo accesorios viejos, azulejos, tablero de yeso y pisos.",
  },
  {
    question: "What size dumpster for a kitchen remodel?",
    answer: "A 15-20 yard dumpster handles most kitchen renovations including cabinets, countertops, flooring, and appliances. Choose 20 yards if removing an island or doing a complete gut renovation.",
    questionEs: "¿Qué tamaño de contenedor necesito para una remodelación de cocina?",
    answerEs: "Un contenedor de 15-20 yardas maneja la mayoría de renovaciones de cocina incluyendo gabinetes, encimeras, pisos y electrodomésticos. Elige 20 yardas si retiras una isla o haces una renovación completa.",
  },
  {
    question: "What size dumpster for roofing?",
    answer: "Roofing jobs typically require a 20-yard dumpster. One roofing square (100 sq ft) of shingles weighs approximately 250 lbs. A typical 2,000 sq ft roof generates 4,000-5,000 lbs of debris.",
    questionEs: "¿Qué tamaño de contenedor necesito para un techo?",
    answerEs: "Los trabajos de techado generalmente requieren un contenedor de 20 yardas. Un cuadrado de techo (100 sq ft) de tejas pesa aproximadamente 250 lbs. Un techo típico de 2,000 sq ft genera 4,000-5,000 lbs de escombros.",
  },
  {
    question: "What size dumpster for a house cleanout?",
    answer: "Whole house cleanouts typically need a 30-yard dumpster. Estate cleanouts average 20-30 cubic yards of material including furniture, appliances, clothing, and household items.",
    questionEs: "¿Qué tamaño de contenedor necesito para limpiar una casa?",
    answerEs: "Las limpiezas de casa completa generalmente necesitan un contenedor de 30 yardas. Las limpiezas de herencia promedian 20-30 yardas cúbicas de material incluyendo muebles, electrodomésticos, ropa y artículos del hogar.",
  },
];

const sizeData = [
  {
    size: "10 Yard",
    nickname: "The Starter",
    nicknameEs: "El Básico",
    dimensions: '12\' L x 8\' W x 3.5\' H',
    capacity: "2-3 pickup truck loads",
    truckLoads: 3,
    weight: "1 ton",
    icon: Package,
    color: "bg-blue-100 text-blue-700",
    projects: ["Small bathroom remodel", "Single room cleanout", "Garage cleanout", "Deck removal (up to 250 sq ft)"],
    projectsEs: ["Remodelación de baño pequeño", "Limpieza de un cuarto", "Limpieza de garaje", "Demolición de terraza (hasta 250 sq ft)"],
  },
  {
    size: "15 Yard",
    nickname: "The Mid-Size",
    nicknameEs: "El Mediano",
    dimensions: '14\' L x 8\' W x 4\' H',
    capacity: "4-5 pickup truck loads",
    truckLoads: 5,
    weight: "1 ton",
    icon: Home,
    color: "bg-green-100 text-green-700",
    projects: ["Medium bathroom remodel", "Small kitchen remodel", "Basement cleanout", "Small roofing job"],
    projectsEs: ["Remodelación de baño mediano", "Remodelación de cocina pequeña", "Limpieza de sótano", "Trabajo de techado pequeño"],
  },
  {
    size: "20 Yard",
    nickname: "The Homeowner Special",
    nicknameEs: "El Especial del Propietario",
    dimensions: '22\' L x 8\' W x 4\' H',
    capacity: "6 pickup truck loads",
    truckLoads: 6,
    weight: "2 tons",
    icon: Hammer,
    color: "bg-primary-100 text-primary-700",
    popular: true,
    projects: ["Kitchen remodel", "Full bathroom gut", "Roofing (up to 3,000 sq ft)", "Multiple room renovation"],
    projectsEs: ["Remodelación de cocina", "Vaciado completo de baño", "Techado (hasta 3,000 sq ft)", "Renovación de varios cuartos"],
  },
  {
    size: "30 Yard",
    nickname: "The Remodeler",
    nicknameEs: "El Renovador",
    dimensions: '22\' L x 8\' W x 6\' H',
    capacity: "9 pickup truck loads",
    truckLoads: 9,
    weight: "3 tons",
    icon: Wrench,
    color: "bg-orange-100 text-orange-700",
    projects: ["Whole house cleanout", "Estate cleanout", "Large renovation", "New construction debris"],
    projectsEs: ["Limpieza de casa completa", "Limpieza de herencia", "Renovación grande", "Escombros de nueva construcción"],
  },
  {
    size: "40 Yard",
    nickname: "The Monster",
    nicknameEs: "El Grande",
    dimensions: '22\' L x 8\' W x 8\' H',
    capacity: "12 pickup truck loads",
    truckLoads: 12,
    weight: "4 tons",
    icon: Trash2,
    color: "bg-red-100 text-red-700",
    projects: ["Commercial projects", "Major demolition", "New home construction", "Large commercial cleanout"],
    projectsEs: ["Proyectos comerciales", "Demolición mayor", "Construcción de nueva casa", "Limpieza comercial grande"],
  },
];

const projectGuide = [
  { project: "Bathroom remodel", projectEs: "Remodelación de baño", recommended: "10 Yard", notes: "15 yard if full gut with tile", notesEs: "15 yardas si es vaciado completo con azulejos" },
  { project: "Kitchen remodel", projectEs: "Remodelación de cocina", recommended: "15-20 Yard", notes: "20 yard for island removal", notesEs: "20 yardas para retiro de isla" },
  { project: "Single room cleanout", projectEs: "Limpieza de un cuarto", recommended: "10 Yard", notes: "Perfect for bedroom or office", notesEs: "Perfecto para dormitorio u oficina" },
  { project: "Garage cleanout", projectEs: "Limpieza de garaje", recommended: "10-15 Yard", notes: "15 yard if heavily packed", notesEs: "15 yardas si está muy lleno" },
  { project: "Basement cleanout", projectEs: "Limpieza de sótano", recommended: "15-20 Yard", notes: "Depends on accumulation", notesEs: "Depende de la acumulación" },
  { project: "Roofing (1,500 sq ft)", projectEs: "Techado (1,500 sq ft)", recommended: "15 Yard", notes: "Shingles are heavy!", notesEs: "¡Las tejas son pesadas!" },
  { project: "Roofing (3,000 sq ft)", projectEs: "Techado (3,000 sq ft)", recommended: "20 Yard", notes: "May need 30 for 2 layers", notesEs: "Puede necesitar 30 para 2 capas" },
  { project: "Deck removal", projectEs: "Demolición de terraza", recommended: "15-20 Yard", notes: "Depends on deck size", notesEs: "Depende del tamaño de la terraza" },
  { project: "Whole house cleanout", projectEs: "Limpieza de casa completa", recommended: "30 Yard", notes: "40 yard for large homes", notesEs: "40 yardas para casas grandes" },
  { project: "Estate cleanout", projectEs: "Limpieza de herencia", recommended: "30 Yard", notes: "May need multiple hauls", notesEs: "Puede necesitar múltiples viajes" },
  { project: "New construction", projectEs: "Nueva construcción", recommended: "30-40 Yard", notes: "Depends on project scope", notesEs: "Depende del alcance del proyecto" },
];

export default async function WhatSizeDumpsterDoINeedPage({ params }: PageProps) {
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
          { name: "What Size Dumpster Do I Need", url: "https://www.dumpsterchamps.com/what-size-dumpster-do-i-need" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* HERO SECTION - Two Column with Quote Form */}
        <section className="relative bg-gradient-to-br from-secondary-900 to-secondary-800 py-16 md:py-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-secondary-400 mb-6">
              <Link href="/" className="hover:text-white">{isEs ? 'Inicio' : 'Home'}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{isEs ? '¿Qué Tamaño de Contenedor Necesito?' : 'What Size Dumpster Do I Need'}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Text & Glass Answer Box */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {isEs ? '¿Qué Tamaño de Contenedor Necesito?' : 'What Size Dumpster Do I Need?'}
                </h1>

                {/* GLASS MORPHISM Quick Answer Box */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-500 p-2 rounded-full mt-1 flex-shrink-0">
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white mb-2">{isEs ? 'Respuesta Rápida' : 'Quick Answer'}</h2>
                      <p className="text-secondary-200 leading-relaxed">
                        {isEs ? <>Para la mayoría de proyectos residenciales, el <span className="font-bold text-white">Contenedor de 20 Yardas</span> es el estándar universal. Cabe una limpieza de garaje de 2 autos, una remodelación mediana de cocina, o una demolición de terraza grande sin ocupar demasiado espacio.</> : <>For most residential projects, the <span className="font-bold text-white">20-Yard Dumpster</span> is the universal standard. It fits a 2-car garage cleanout, a medium kitchen remodel, or a large deck removal without taking up too much space.</>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculator"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-white text-secondary-900 font-bold rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    {isEs ? 'Usar Calculadora de Tamaños' : 'Use Size Calculator'}
                  </Link>
                  <a
                    href="tel:8888600710"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-400 font-bold rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {isEs ? 'Preguntar a un Experto' : 'Ask an Expert'}
                  </a>
                </div>
              </div>

              {/* Right Column: Quote Form */}
              <div className="bg-white p-6 rounded-2xl shadow-2xl border-t-4 border-primary-500">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">{isEs ? 'Verificar Disponibilidad' : 'Check Availability'}</h3>
                <p className="text-secondary-600 mb-6">{isEs ? 'Averigua qué tamaños hay disponibles cerca de ti.' : 'Find out which sizes are in stock near you.'}</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* SIZE COMPARISON GRID - Visual Cards */}
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">{isEs ? 'Tamaños de Contenedores de un Vistazo' : 'Dumpster Sizes at a Glance'}</h2>
            <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
              {isEs ? 'Compara tamaños lado a lado. El indicador de cargas de camioneta muestra cuánto cabe en cada uno.' : 'Compare sizes side-by-side. The pickup truck loads indicator shows how much each size holds.'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {sizeData.map((size) => (
                <div
                  key={size.size}
                  className={`relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all ${
                    size.popular
                      ? 'border-2 border-primary-500 ring-2 ring-primary-100 transform lg:-translate-y-2'
                      : 'border border-secondary-200'
                  }`}
                >
                  {/* BEST SELLER Badge */}
                  {size.popular && (
                    <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                      {isEs ? 'MÁS VENDIDO' : 'BEST SELLER'}
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-secondary-900 mb-1">{size.size}</h3>
                  <p className="text-primary-600 font-semibold text-sm mb-4">&quot;{isEs ? size.nicknameEs : size.nickname}&quot;</p>

                  {/* Visual Truck Loads Indicator */}
                  <div className="flex items-center gap-2 mb-4 text-secondary-600">
                    <Truck className="w-5 h-5" />
                    <span className="font-bold text-secondary-900">{isEs ? `~${size.truckLoads} Cargas de Camioneta` : `~${size.truckLoads} Pickup Loads`}</span>
                  </div>

                  <ul className="space-y-2 text-sm text-secondary-600 mb-6">
                    {(isEs ? size.projectsEs.slice(0, 3) : size.projects.slice(0, 3)).map((project, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {project}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#quote-form"
                    className={`block text-center py-2.5 px-4 rounded-lg font-bold transition-colors ${
                      size.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900'
                    }`}
                  >
                    {isEs ? `Seleccionar ${size.size}` : `Select ${size.size}`}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REST OF CONTENT */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Project Guide - Cards on Mobile, Table on Desktop */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Tamaño de Contenedor por Tipo de Proyecto' : 'Dumpster Size by Project Type'}
            </h2>

            {/* Mobile: Stacked Cards */}
            <div className="md:hidden space-y-3">
              {projectGuide.map((item) => (
                <div key={item.project} className="bg-white rounded-lg p-4 shadow-sm border border-secondary-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-secondary-900">{isEs ? item.projectEs : item.project}</h3>
                    <span className="bg-primary-100 text-primary-700 text-sm font-bold px-2 py-1 rounded">
                      {item.recommended}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-500">{isEs ? item.notesEs : item.notes}</p>
                </div>
              ))}
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Proyecto' : 'Project'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Tamaño Recomendado' : 'Recommended Size'}</th>
                    <th className="px-4 py-3 text-left font-semibold">{isEs ? 'Notas' : 'Notes'}</th>
                  </tr>
                </thead>
                <tbody>
                  {projectGuide.map((item, index) => (
                    <tr key={item.project} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-3 font-medium text-secondary-900">{isEs ? item.projectEs : item.project}</td>
                      <td className="px-4 py-3 text-primary-600 font-semibold">{item.recommended}</td>
                      <td className="px-4 py-3 text-secondary-600">{isEs ? item.notesEs : item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Weight Warning */}
          <section className="mb-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">
                {isEs ? 'El Peso Importa Más que el Tamaño para Materiales Pesados' : 'Weight Matters More Than Size for Heavy Materials'}
              </h2>
              <p className="text-yellow-700 mb-4">
                {isEs ? 'Los materiales pesados como concreto, ladrillo, tierra y tejas de techo pueden alcanzar los límites de peso antes de llenar el contenedor. Aquí está el peso de materiales comunes:' : 'Heavy materials like concrete, brick, dirt, and roofing shingles can hit weight limits before filling the dumpster. Here\'s how much common materials weigh:'}
              </p>
              <ul className="space-y-2 text-yellow-700">
                <li>{isEs ? <><strong>Concreto/Asfalto:</strong> 4,000 lbs por yarda cúbica</> : <><strong>Concrete/Asphalt:</strong> 4,000 lbs per cubic yard</>}</li>
                <li>{isEs ? <><strong>Ladrillo/Bloque:</strong> 3,000 lbs por yarda cúbica</> : <><strong>Brick/Block:</strong> 3,000 lbs per cubic yard</>}</li>
                <li>{isEs ? <><strong>Tierra/Arena:</strong> 2,200 lbs por yarda cúbica</> : <><strong>Dirt/Sand:</strong> 2,200 lbs per cubic yard</>}</li>
                <li>{isEs ? <><strong>Tejas de Techo:</strong> 250 lbs por cuadrado de techo (100 sq ft)</> : <><strong>Roofing Shingles:</strong> 250 lbs per roofing square (100 sq ft)</>}</li>
              </ul>
              <p className="text-yellow-700 mt-4">
                {isEs ? <><Link href="/calculator" className="font-semibold underline">Nuestra calculadora</Link>{" "}considera el peso para recomendar el tamaño correcto.</> : <><Link href="/calculator" className="font-semibold underline">Our calculator</Link>{" "}accounts for weight to recommend the right size.</>}
              </p>
            </div>
          </section>

          {/* Detailed Size Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Tamaños de Contenedores Explicados en Detalle' : 'Dumpster Sizes Explained in Detail'}
            </h2>

            <div className="space-y-6">
              {sizeData.map((size) => (
                <div
                  key={size.size}
                  className={`relative border rounded-xl p-6 ${size.popular ? 'border-primary-500 ring-2 ring-primary-100' : 'border-secondary-200'}`}
                >
                  {size.popular && (
                    <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                      {isEs ? 'MÁS POPULAR' : 'MOST POPULAR'}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${size.color}`}>
                      <size.icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{isEs ? `Contenedor de ${size.size}` : `${size.size} Dumpster`}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-secondary-600 mb-4">
                        <div><strong>{isEs ? 'Dimensiones:' : 'Dimensions:'}</strong> {size.dimensions}</div>
                        <div><strong>{isEs ? 'Capacidad:' : 'Capacity:'}</strong> {size.capacity}</div>
                        <div><strong>{isEs ? 'Límite de Peso:' : 'Weight Limit:'}</strong> {size.weight}</div>
                      </div>

                      <div>
                        <p className="font-semibold text-secondary-700 mb-2">{isEs ? 'Ideal Para:' : 'Best For:'}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {(isEs ? size.projectsEs : size.projects).map((project, idx) => (
                            <li key={idx} className="text-secondary-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                  {isEs ? <>El alquiler de contenedores cuesta $300-$500 por 7 días de alquiler. Ver nuestra <Link href="/dumpster-rental-prices" className="text-primary-600 hover:underline">guía completa de precios</Link>.</> : <>Dumpster rental costs $300-$500 for a 7-day rental. View our{" "}<Link href="/dumpster-rental-prices" className="text-primary-600 hover:underline">complete pricing guide</Link>.</>}
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
                <h3 className="font-semibold text-secondary-900 mb-2">{isEs ? '¿Puedo poner cualquier cosa en un contenedor?' : 'Can I put anything in a dumpster?'}</h3>
                <p className="text-secondary-600">
                  {isEs ? <>La mayoría de residuos domésticos están permitidos, pero los materiales peligrosos, neumáticos, baterías y electrodomésticos con refrigerantes están prohibidos. Consulta nuestra{" "}<Link href="/blog/what-can-go-in-dumpster" className="text-primary-600 hover:underline">guía completa de eliminación</Link>.</> : <>Most household waste is allowed, but hazardous materials, tires, batteries, and appliances with refrigerants are prohibited. See our{" "}<Link href="/blog/what-can-go-in-dumpster" className="text-primary-600 hover:underline">complete disposal guide</Link>.</>}
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
          <section id="quote-form" className="bg-primary-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isEs ? '¿Aún No Estás Seguro? Te Ayudamos a Elegir' : "Still Not Sure? We'll Help You Choose"}
            </h2>
            <p className="text-primary-100 mb-6">
              {isEs ? 'Llámanos y describe tu proyecto. Te recomendaremos el tamaño perfecto — sin ventas exageradas, garantizado.' : "Call us and describe your project. We'll recommend the perfect size—no upselling, guaranteed."}
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
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors border border-primary-500"
              >
                <Calculator className="w-5 h-5" />
                {isEs ? 'Usar Calculadora Gratis' : 'Use Free Calculator'}
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
