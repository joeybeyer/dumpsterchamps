import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Users, Target, Award, Heart } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "About Us | Dumpster Champs",
  description:
    "Learn about Dumpster Champs - your trusted partner for affordable dumpster rentals. We serve residential and commercial customers nationwide.",
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const values = isEs ? [
    {
      icon: Users,
      title: "El Cliente Primero",
      description: "Ponemos a nuestros clientes en el centro de todo lo que hacemos. Su satisfacción es nuestra máxima prioridad.",
    },
    {
      icon: Target,
      title: "Confiabilidad",
      description: "Cuando decimos que estaremos ahí, lo cumplimos. Entrega y recogida a tiempo, siempre.",
    },
    {
      icon: Award,
      title: "Servicio de Calidad",
      description: "Conductores profesionales, contenedores limpios y soporte receptivo. Nos enorgullecemos de nuestro servicio.",
    },
    {
      icon: Heart,
      title: "Comunidad",
      description: "Estamos comprometidos con mantener nuestras comunidades limpias y apoyar a los negocios locales.",
    },
  ] : [
    {
      icon: Users,
      title: "Customer First",
      description: "We put our customers at the center of everything we do. Your satisfaction is our top priority.",
    },
    {
      icon: Target,
      title: "Reliability",
      description: "When we say we'll be there, we mean it. On-time delivery and pickup, every time.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Professional drivers, clean dumpsters, and responsive support. We take pride in our service.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "We're committed to keeping our communities clean and supporting local businesses.",
    },
  ];

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
            <span className="text-white">{isEs ? 'Nosotros' : 'About Us'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? 'Acerca de Dumpster Champs' : 'About Dumpster Champs'}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? 'Su socio de confianza para servicios de alquiler de contenedores asequibles y confiables en todo el país.'
              : 'Your trusted partner for affordable and reliable dumpster rental services nationwide.'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              {isEs ? 'Nuestra Historia' : 'Our Story'}
            </h2>
            <div className="prose prose-lg prose-secondary">
              {isEs ? (
                <>
                  <p>
                    Dumpster Champs fue fundado con una misión simple: hacer que el alquiler de contenedores sea fácil, asequible y sin complicaciones. Vimos una industria que a menudo dejaba a los clientes frustrados con cargos ocultos, servicio poco confiable y mala comunicación.
                  </p>
                  <p>
                    Nos propusimos cambiar eso. Hoy, Dumpster Champs sirve a clientes en todo el país, desde propietarios que abordan proyectos de fin de semana hasta contratistas que gestionan grandes obras de construcción. Nuestro compromiso con precios transparentes, servicio confiable y satisfacción del cliente nos ha convertido en un nombre de confianza en la gestión de residuos.
                  </p>
                  <p>
                    Ya sea que esté limpiando su garaje, renovando su hogar o gestionando un proyecto comercial, estamos aquí para ayudar. Nuestro equipo está dedicado a proporcionar el contenedor adecuado para sus necesidades, entregado a tiempo y recogido cuando haya terminado.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Dumpster Champs was founded with a simple mission: to make
                    dumpster rental easy, affordable, and hassle-free. We saw an
                    industry that often left customers frustrated with hidden fees,
                    unreliable service, and poor communication.
                  </p>
                  <p>
                    We set out to change that. Today, Dumpster Champs serves
                    customers across the nation, from homeowners tackling weekend
                    projects to contractors managing large construction sites. Our
                    commitment to transparent pricing, reliable service, and
                    customer satisfaction has made us a trusted name in waste
                    management.
                  </p>
                  <p>
                    Whether you&apos;re cleaning out your garage, renovating your home,
                    or managing a commercial project, we&apos;re here to help. Our team
                    is dedicated to providing the right dumpster for your needs,
                    delivered on time and picked up when you&apos;re done.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            {isEs ? 'Nuestros Valores' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary-600 mb-2">45+</p>
              <p className="text-secondary-600">{isEs ? 'Estados Servidos' : 'States Served'}</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-secondary-600">{isEs ? 'Clientes Satisfechos' : 'Happy Customers'}</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-600 mb-2">5</p>
              <p className="text-secondary-600">{isEs ? 'Tamaños de Contenedores' : 'Dumpster Sizes'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isEs ? '¿Listo para Comenzar?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {isEs
              ? '¡Experimente la diferencia de Dumpster Champs. Obtenga una cotización gratis hoy!'
              : 'Experience the Dumpster Champs difference. Get a free quote today!'}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            {isEs ? 'Obtener una Cotización Gratis' : 'Get a Free Quote'}
          </Link>
        </div>
      </section>
    </>
  );
}
