import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Rental Locations | Dumpster Champs",
  description:
    "Dumpster Champs provides affordable roll-off dumpster rentals nationwide. Find service in your state with same-day delivery. 10-40 yard containers available.",
};

export default async function LocationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEs = locale === 'es';

  const states = await prisma.state.findMany({
    include: {
      _count: {
        select: { cities: true },
      },
    },
    orderBy: { name: "asc" },
  });

  // Get key states for regional highlights
  const keyStates = states.filter(s => 
    ['florida', 'texas', 'california', 'georgia', 'north-carolina', 'arizona', 'ohio', 'illinois'].includes(s.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{isEs ? 'Ubicaciones' : 'Locations'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? 'Ubicaciones de Alquiler de Contenedores' : 'Dumpster Rental Locations'}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? 'Dumpster Champs ofrece alquiler de contenedores asequibles en todo el país. Encuentre servicio en su estado a continuación.'
              : 'Dumpster Champs provides affordable roll-off dumpster rentals nationwide. Find service in your state below.'}
          </p>
        </div>
      </section>

      {/* Nationwide Coverage Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Servicio Nacional de Alquiler de Contenedores' : 'Nationwide Dumpster Rental Service'}
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                {isEs
                  ? 'Dumpster Champs se enorgullece en ofrecer servicios de alquiler de contenedores de rodar en todo el territorio de los Estados Unidos. Ya sea que necesite un contenedor de 10 yardas para una limpieza pequeña o un contenedor de 40 yardas para un proyecto de construcción comercial, tenemos la solución perfecta para sus necesidades de eliminación de residuos.'
                  : 'Dumpster Champs proudly offers roll-off dumpster rental services across the entire United States. Whether you need a 10-yard dumpster for a small cleanup or a 40-yard dumpster for a major commercial construction project, we have the perfect solution for your waste removal needs.'}
              </p>
              <p>
                {isEs
                  ? 'Nuestra red de socios de entrega confiables nos permite proporcionar tiempos de entrega rápidos, incluso el mismo día, en la mayoría de las ubicaciones. Entendemos que cada proyecto es único, por lo que ofrecemos precios transparentes sin tarifas ocultas, períodos de alquiler flexibles de 7 a 14 días, y soporte al cliente disponible para ayudarle a elegir el tamaño correcto del contenedor.'
                  : 'Our network of reliable delivery partners allows us to provide fast delivery times, even same-day, in most locations. We understand that every project is unique, which is why we offer transparent pricing with no hidden fees, flexible rental periods of 7-14 days, and customer support to help you choose the right dumpster size.'}
              </p>
              <p>
                {isEs
                  ? 'Desde ciudades principales hasta comunidades rurales, nuestro objetivo es hacer que el alquiler de contenedores sea lo más sencillo posible. Simplemente seleccione su estado a continuación para ver las ciudades que servimos, obtenga precios específicos de su área, y reserve su contenedor en minutos.'
                  : 'From major cities to rural communities, we aim to make dumpster rental as easy as possible. Simply select your state below to see the cities we serve, get area-specific pricing, and book your dumpster in minutes.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Find Local Service */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Cómo Encontrar Servicio Local' : 'How to Find Local Service'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? 'Seleccione su Estado' : 'Select Your State'}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {isEs
                    ? 'Navegue a través de nuestra lista de estados abajo y haga clic en el estado donde necesita servicio de alquiler de contenedores.'
                    : 'Browse through our list of states below and click on the state where you need dumpster rental service.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? 'Elija su Ciudad' : 'Choose Your City'}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {isEs
                    ? 'Una vez en la página de estado, encuentre su ciudad o código postal para ver precios locales específicos y disponibilidad.'
                    : 'Once on the state page, find your city or zip code to see local-specific pricing and availability.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? 'Reserve su Contenedor' : 'Book Your Dumpster'}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {isEs
                    ? 'Complete nuestro formulario de cotización en línea o llámenos para reservar su contenedor. ¡Ofrecemos entrega el mismo día!'
                    : 'Complete our online quote form or call us to reserve your dumpster. We offer same-day delivery!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Regions Served */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Regiones Clave que Servimos' : 'Key Regions We Serve'}
            </h2>
            <p className="text-secondary-600 text-center mb-8">
              {isEs
                ? 'Tenemos una fuerte presencia en todo el país, con cobertura particularmente extensa en estos estados populares:'
                : 'We have strong presence across the country, with particularly extensive coverage in these popular states:'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyStates.map((state) => (
                <Link
                  key={state.id}
                  href={`/dumpster-rental-${state.slug}`}
                  className="bg-secondary-50 p-6 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600">
                    {state.name}
                  </h3>
                  <p className="text-sm text-secondary-500">
                    {state._count.cities} {isEs ? 'ciudades' : 'cities'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area FAQs */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Preguntas Frecuentes sobre Áreas de Servicio' : 'Service Area FAQs'}
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? '¿Sirven en áreas rurales?' : 'Do you serve rural areas?'}
                </h3>
                <p className="text-secondary-600">
                  {isEs
                    ? 'Sí, servimos tanto áreas urbanas como rurales. En algunas ubicaciones rurales, el tiempo de entrega puede ser de 1-2 días. Contáctenos para discutir su ubicación específica.'
                    : 'Yes, we serve both urban and rural areas. In some rural locations, delivery times may be 1-2 days. Contact us to discuss your specific location.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? '¿Puedo cambiar mi fecha de entrega?' : 'Can I change my delivery date?'}
                </h3>
                <p className="text-secondary-600">
                  {isEs
                    ? 'Absolutamente. entendemos que los proyectos pueden cambiar. Puede modificar su fecha de entrega hasta 24 horas antes de la fecha programada sin cargo adicional.'
                    : 'Absolutely. We understand projects can change. You can modify your delivery date up to 24 hours before the scheduled date at no additional charge.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? '¿Qué pasa si mi ciudad no está listada?' : 'What if my city is not listed?'}
                </h3>
                <p className="text-secondary-600">
                  {isEs
                    ? 'Si no ve su ciudad enumerada, todavía podemos ayudar. Contáctenos directamente y trabajaremos para encontrar una solución de entrega en su área.'
                    : 'If you don\'t see your city listed, we can still help. Contact us directly and we\'ll work to find a delivery solution in your area.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">
                  {isEs ? '¿Ofrecen servicio en todos los 50 estados?' : 'Do you offer service in all 50 states?'}
                </h3>
                <p className="text-secondary-600">
                  {isEs
                    ? 'Sí, tenemos cobertura en los 50 estados. La disponibilidad y precios específicos varían según la ubicación. Seleccione su estado para ver los detalles exactos.'
                    : 'Yes, we have coverage in all 50 states. Specific availability and pricing varies by location. Select your state for exact details.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            {isEs ? 'Todos los Estados que Servimos' : 'All States We Serve'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.map((state) => (
              <Link
                key={state.id}
                href={`/dumpster-rental-${state.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <span className="font-medium text-secondary-900 group-hover:text-primary-600">
                      {state.name}
                    </span>
                    <p className="text-sm text-secondary-500">
                      {state._count.cities} {isEs ? 'ciudades' : 'cities'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-secondary-400 group-hover:text-primary-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Choosing Dumpster Champs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Por Qué Elegir Dumpster Champs' : 'Why Choose Dumpster Champs'}
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                {isEs
                  ? 'Cuando busca servicios de alquiler de contenedores en su área, desea un proveedor en quien pueda confiar. Dumpster Champs se ha establecido como líder en la industria de alquiler de contenedores de rodar en todo el país, ofreciendo una combinación inigualable de precios competitivos, servicio al cliente excepcional y procesos de alquiler sin complicaciones. Nuestro compromiso con la transparencia significa que siempre conocerá el costo total de su alquiler desde el principio, sin cargos ocultos ni sorpresas inesperadas en el momento de la entrega o recogida.'
                  : 'When you are looking for dumpster rental services in your area, you want a provider you can trust. Dumpster Champs has established itself as a leader in the roll-off dumpster rental industry across the nation, offering an unmatched combination of competitive pricing, exceptional customer service, and hassle-free rental processes. Our commitment to transparency means you will always know the total cost of your rental upfront, with no hidden fees or unexpected surprises at delivery or pickup time.'}
              </p>
              <p>
                {isEs
                  ? 'Entendemos que cada proyecto de construcción, renovación o limpieza tiene requisitos únicos. Es por eso que ofrecemos una variedad de tamaños de contenedores, desde contenedores de 10 yardas para proyectos pequeños hasta contenedores de 40 yardas para proyectos comerciales de gran escala. Nuestro equipo knowledgeable está disponible para ayudarle a seleccionar el tamaño adecuado para su proyecto específico, asegurando que no pague por espacio excesivo ni se quede corto durante la limpieza.'
                  : 'We understand that every construction, renovation, or cleanup project has unique requirements. That is why we offer a variety of dumpster sizes, from 10-yard containers for small projects to 40-yard containers for large-scale commercial projects. Our knowledgeable team is available to help you select the right size for your specific project, ensuring you do not pay for excess space or run out of room during your cleanup.'}
              </p>
              <p>
                {isEs
                  ? 'Nuestra red de socios de entrega locales nos permite ofrecer tiempos de respuesta rápidos en la mayoría de las ubicaciones. Ya sea que necesite entrega el mismo día o planificación con semanas de anticipación, trabajamos con su horario para garantir que su contenedor arrive cuando lo necesite. El período de alquiler estándar de 7 días proporciona suficiente tiempo para completar la mayoría de los proyectos, con opciones de extensión disponibles para proyectos más grandes que requieren más tiempo.'
                  : 'Our network of local delivery partners allows us to offer quick turnaround times in most locations. Whether you need same-day delivery or are planning weeks in advance, we work with your schedule to ensure your dumpster arrives when you need it. The standard 7-day rental period provides ample time to complete most projects, with extension options available for larger projects that require more time.'}
              </p>
              <p>
                {isEs
                  ? 'La sostenibilidad es una prioridad clave para Dumpster Champs. Nos asociamos con instalaciones de reciclaje locales y centros de gestión de residuos para maximizar la cantidad de materiales que se desvi landfill. Muchos de los materiales que se desechan en nuestros contenedores se pueden reciclar, lo que ayuda a reducir el impacto ambiental de su proyecto mientras mantiene los costos de eliminación más bajos para usted. Our commitment to environmentally responsible waste management practices sets us apart from many competitors in the industry.'
                  : 'Sustainability is a key priority for Dumpster Champs. We partner with local recycling facilities and waste management centers to maximize the amount of material that gets diverted from landfills. Many of the materials disposed of in our dumpsters can be recycled, which helps reduce the environmental impact of your project while keeping your disposal costs lower. Our commitment to environmentally responsible waste management practices sets us apart from many competitors in the industry.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Projects Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              {isEs ? 'Proyectos Comunes para Alquiler de Contenedores' : 'Common Projects for Dumpster Rental'}
            </h2>
            <p className="text-secondary-600 text-center mb-8">
              {isEs
                ? 'Nuestros contenedores se utilizan para una amplia variedad de proyectos residenciales y comerciales:'
                : 'Our dumpsters are used for a wide variety of residential and commercial projects:'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-3">
                  {isEs ? 'Proyectos Residenciales' : 'Residential Projects'}
                </h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>• {isEs ? 'Limpiezas de vivienda' : 'Home cleanouts'}</li>
                  <li>• {isEs ? 'Renovaciones de cocina' : 'Kitchen renovations'}</li>
                  <li>• {isEs ? 'Renovaciones de baño' : 'Bathroom renovations'}</li>
                  <li>• {isEs ? 'Eliminación de cobertizos' : 'Shed removal'}</li>
                  <li>• {isEs ? 'Proyectos de landscaping' : 'Landscaping projects'}</li>
                  <li>• {isEs ? 'Eliminación de muebles' : 'Furniture disposal'}</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-3">
                  {isEs ? 'Proyectos Comerciales' : 'Commercial Projects'}
                </h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>• {isEs ? 'Construcción comercial' : 'Commercial construction'}</li>
                  <li>• {isEs ? 'Renovaciones de oficinas' : 'Office renovations'}</li>
                  <li>• {isEs ? 'Demoliciones' : 'Demolition work'}</li>
                  <li>• {isEs ? 'Construcción de viviendas' : 'Home building'}</li>
                  <li>• {isEs ? 'Mantenimiento de propiedades' : 'Property maintenance'}</li>
                  <li>• {isEs ? 'Eventos grandes' : 'Large events'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isEs ? '¿No ve su ciudad?' : "Don't See Your City?"}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {isEs
              ? 'Estamos expandiendo constantemente nuestras áreas de servicio. Contáctenos para verificar disponibilidad en su ubicación.'
              : "We're constantly expanding our service areas. Contact us to check availability in your location."}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            {isEs ? 'Contáctenos' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </>
  );
}
