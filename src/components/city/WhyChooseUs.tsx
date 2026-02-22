import { Shield, Clock, Truck, DollarSign, Users, Award } from "lucide-react";

interface WhyChooseUsProps {
  cityName: string;
  stateName: string;
  whyChooseUs?: string | null;
  locale?: string;
}

const features = {
  en: [
    { icon: Clock, title: "Same-Day Delivery", description: "Need a dumpster fast? We offer same-day and next-day delivery in most areas." },
    { icon: DollarSign, title: "Transparent Pricing", description: "Flat-rate pricing with no hidden fees. What we quote is what you pay." },
    { icon: Shield, title: "Driveway Protection", description: "We use boards under wheels to protect your driveway from damage." },
    { icon: Truck, title: "Reliable Pickup", description: "On-time pickup when your project is complete. Just give us a call." },
    { icon: Users, title: "Local Expertise", description: "Our team knows local regulations, routes, and neighborhoods inside out." },
    { icon: Award, title: "Quality Service", description: "Professional drivers, clean containers, and responsive customer support." },
  ],
  es: [
    { icon: Clock, title: "Entrega el Mismo Día", description: "¿Necesita un contenedor rápido? Ofrecemos entrega el mismo día y al día siguiente en la mayoría de las áreas." },
    { icon: DollarSign, title: "Precios Transparentes", description: "Precios fijos sin cargos ocultos. Lo que cotizamos es lo que paga." },
    { icon: Shield, title: "Protección de Entrada", description: "Usamos tablones bajo las ruedas para proteger su entrada de daños." },
    { icon: Truck, title: "Recogida Confiable", description: "Recogida puntual cuando su proyecto esté completo. Solo llámenos." },
    { icon: Users, title: "Experiencia Local", description: "Nuestro equipo conoce las regulaciones locales, rutas y vecindarios al detalle." },
    { icon: Award, title: "Servicio de Calidad", description: "Conductores profesionales, contenedores limpios y atención al cliente receptiva." },
  ],
};

export function WhyChooseUs({ cityName, stateName, whyChooseUs, locale }: WhyChooseUsProps) {
  const isEs = locale === 'es';
  const featureList = isEs ? features.es : features.en;

  return (
    <section className="py-16 bg-secondary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {isEs ? `¿Por Qué Elegir Dumpster Champs en ${cityName}?` : `Why Choose Dumpster Champs in ${cityName}?`}
          </h2>
          {whyChooseUs ? (
            <p className="text-secondary-300 max-w-2xl mx-auto">{whyChooseUs}</p>
          ) : (
            <p className="text-secondary-300 max-w-2xl mx-auto">
              {isEs
                ? `Hemos servido a propietarios y contratistas de ${cityName} y ${stateName} con alquiler de contenedores confiable y asequible. Aquí está por qué nos eligen:`
                : `We've been serving ${cityName} and ${stateName} homeowners and contractors with reliable, affordable dumpster rentals. Here's why customers choose us:`}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="bg-primary-600 p-3 rounded-lg flex-shrink-0">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-secondary-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-secondary-700">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-400 mb-2">10K+</p>
            <p className="text-secondary-400">{isEs ? 'Clientes Satisfechos' : 'Happy Customers'}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-400 mb-2">45+</p>
            <p className="text-secondary-400">{isEs ? 'Estados Servidos' : 'States Served'}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-400 mb-2">24hr</p>
            <p className="text-secondary-400">{isEs ? 'Entrega Rápida' : 'Fast Delivery'}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-400 mb-2">5</p>
            <p className="text-secondary-400">{isEs ? 'Tamaños Disponibles' : 'Dumpster Sizes'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
