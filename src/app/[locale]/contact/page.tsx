import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, Clock } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Contact Us | Dumpster Champs",
  description:
    "Contact Dumpster Champs for a free quote. Call us at (888) 860-0710 or fill out our contact form for fast, affordable dumpster rental.",
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";
  const email = "contact@dumpsterchamps.com";

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
            <span className="text-white">{isEs ? 'Contacto' : 'Contact'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? 'Contáctenos' : 'Contact Us'}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? '¿Listo para alquilar un contenedor? Comuníquese con nuestro equipo para obtener una cotización gratuita y servicio rápido.'
              : 'Ready to rent a dumpster? Get in touch with our team for a free quote and fast service.'}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                {isEs ? 'Póngase en Contacto' : 'Get in Touch'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{isEs ? 'Teléfono' : 'Phone'}</h3>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-primary-600 hover:underline text-lg"
                    >
                      {phone}
                    </a>
                    <p className="text-sm text-secondary-500">
                      {isEs ? 'Llame para asistencia inmediata' : 'Call for immediate assistance'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{isEs ? 'Correo Electrónico' : 'Email'}</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-primary-600 hover:underline"
                    >
                      {email}
                    </a>
                    <p className="text-sm text-secondary-500">
                      {isEs ? 'Respondemos en 24 horas' : 'We respond within 24 hours'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{isEs ? 'Horario' : 'Hours'}</h3>
                    <p className="text-secondary-700">{isEs ? 'Lunes - Viernes: 7am - 6pm' : 'Monday - Friday: 7am - 6pm'}</p>
                    <p className="text-secondary-700">{isEs ? 'Sábado: 8am - 4pm' : 'Saturday: 8am - 4pm'}</p>
                    <p className="text-secondary-700">{isEs ? 'Domingo: Cerrado' : 'Sunday: Closed'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isEs ? '¿Necesita Asistencia Inmediata?' : 'Need Immediate Assistance?'}
                </h3>
                <p className="text-secondary-600 text-sm mb-4">
                  {isEs
                    ? 'Para solicitudes urgentes o consultas de entrega el mismo día, llámenos directamente.'
                    : 'For urgent requests or same-day delivery inquiries, please call us directly.'}
                </p>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  {isEs ? 'Llame Ahora' : 'Call Now'}
                </a>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                  {isEs ? 'Solicite una Cotización Gratis' : 'Request a Free Quote'}
                </h2>
                <p className="text-secondary-600 mb-6">
                  {isEs
                    ? 'Complete el formulario a continuación y le responderemos con una cotización para su alquiler de contenedor.'
                    : "Fill out the form below and we'll get back to you with a quote for your dumpster rental."}
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Contact Us", url: "https://www.dumpsterchamps.com/contact" },
        ]}
      />
    </>
  );
}
